import { randomInt } from "node:crypto";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  bearer,
  haveIBeenPwned,
  jwt,
  lastLoginMethod,
  oneTap,
  twoFactor,
  username,
} from "better-auth/plugins";
import { env } from "@/env.js";
import { prisma } from "@/utils/db.js";
import { checkEmail } from "@/services/checkMail.service.js";
import { APPNAME, EMAIL_BACKOFF_SCHEDULE } from "@/constants.js";

import { formatDuration } from "./functions.js";
import { client } from "./qstash-client.js";
import type { SendEmailProps } from "@repo/schema";
import { logger } from "@/index.js";
export const auth = betterAuth({
  appName: APPNAME,
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      description: {
        type: "string",
        required: false,
      },
      age: {
        type: "number",
        required: false,
      },
      gender: {
        type: ["male", "female", "other"],
        required: false,
      },
      location: {
        type: "string",
        required: false,
        defaultValue: "unknown",
      },
      institution: {
        type: "string",
        required: false,
        defaultValue: "unknown",
      },
    },
  },
  trustedOrigins: [env.CLIENT_ORIGIN ?? "http://localhost:3000"],
  experimental: {
    joins: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    jwt(),
    bearer(),
    twoFactor({
      issuer: APPNAME,
    }),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 50,
      usernameValidator: (username) => {
        logger.info(`Validating username: ${username}`);
        if (username === "admin") {
          return false;
        }
        return true;
      },
    }),
    oneTap(),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "Please choose a more secure password. This password has been found in a data breach.",
    }),
    lastLoginMethod({
      customResolveMethod: (ctx) => {
        if (ctx.path.includes("/passkey")) {
          return "passkey";
        }
        return null;
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          lastResetEmailSentAt: true,
          _count: {
            select: { securityAnswers: true },
          },
        },
      });
      if (!dbUser || dbUser._count.securityAnswers === 0) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Account cannot be reset because no security questions are set up.",
        });
      }
      if (dbUser.lastResetEmailSentAt) {
        const lastSent = dbUser.lastResetEmailSentAt.getTime();
        const now = Date.now();
        const cooldown = 6 * 60 * 60 * 1000;

        if (now - lastSent < cooldown) {
          const remainingMinutes = Math.ceil(
            (cooldown - (now - lastSent)) / 60000,
          );
          const hours = Math.floor(remainingMinutes / 60);
          const mins = remainingMinutes % 60;

          throw new APIError("TOO_MANY_REQUESTS", {
            message: `Please wait ${hours}h ${mins}m before requesting another reset link.`,
          });
        }
      }
      await prisma.user.update({
        where: { id: user.id },
        data: { lastResetEmailSentAt: new Date() },
      });

      await client.publishJSON({
        url: `${env.BACKEND_URL}/workflows/sendEmail`,
        body: {
          to: user.email,
          reason: "forgotPassword",
          url: `${env.CLIENT_ORIGIN}/auth/reset-password?token=${token}`,
          username: user.name,
        },
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          emailVerificationRetryCount: true,
          lastVerificationEmailSentAt: true,
        },
      });

      if (dbUser?.lastVerificationEmailSentAt) {
        const lastSent = dbUser.lastVerificationEmailSentAt.getTime();
        const now = Date.now();
        const retryCount = dbUser.emailVerificationRetryCount;
        if (now - lastSent > 24 * 60 * 60 * 1000) {
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerificationRetryCount: 0 },
          });
        } else {
          const waitTimeSeconds =
            EMAIL_BACKOFF_SCHEDULE[
              Math.min(retryCount, EMAIL_BACKOFF_SCHEDULE.length - 1)
            ] || 0;
          const timeElapsedSeconds = (now - lastSent) / 1000;

          if (timeElapsedSeconds < waitTimeSeconds) {
            const remaining = Math.ceil(waitTimeSeconds - timeElapsedSeconds);

            throw new APIError("TOO_MANY_REQUESTS", {
              message: `Please wait ${formatDuration(remaining)} before resending.`,
            });
          }
        }
      }

      // 2. If we pass checks, Update DB first (Optimistic)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerificationRetryCount: { increment: 1 },
          lastVerificationEmailSentAt: new Date(),
        },
      });

      // 3. Send Email via QStash
      // await client.publishJSON<SendEmailProps>({
      //   url: `${env.BACKEND_URL}/workflows/sendEmail`,
      //   body: {
      //     to: user.email,
      //     reason: "verify",
      //     url: `${env.CLIENT_ORIGIN}/auth/verify?token=${token}`,
      //     username: user.name,
      //   },
      // });
    },
  },
  rateLimit: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwe",
      refreshCache: true,
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
    additionalFields: {
      providerName: {
        type: "string",
        required: true,
        defaultValue: "user",
      },
    },
    encryptOAuthTokens: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (data) => {
          if (data.email) {
            const emailstatus = await checkEmail(data.email);
            if (!emailstatus) {
              throw new APIError("BAD_REQUEST", {
                message: "The email address is disposable or invalid.",
                code: "400",
                cause: "DISPOSABLE_EMAIL",
              });
            }
          }
        },
      },
    },
    account: {
      create: {
        after: async (account) => {
          if (account.providerId === "github") {
            logger.info(account, `New GitHub OAuth account linked:`);
            const randomUserNameSlug = generateRandomUsernameSlug(3);
            const response = await fetch("https://api.github.com/user", {
              headers: {
                Authorization: `Bearer ${account.accessToken}`,
                "User-Agent": "QueryRight",
              },
            });
            const data = await response.json();
            if (data.login) {
              Promise.all([
                await prisma.account.update({
                  where: {
                    id: account.id,
                  },
                  data: {
                    providerName: data.login,
                  },
                }),
                await prisma.user.update({
                  where: {
                    id: account.userId,
                  },
                  data: {
                    image: data.avatar_url,
                    displayUsername: `${data.login}_${randomUserNameSlug}`,
                    username: `${data.login}_${randomUserNameSlug}`,
                  },
                }),
              ]);
            }
          }
          if (account.providerId === "google") {
            const randomUserNameSlug = generateRandomUsernameSlug(3);
            const userData = await fetch(
              `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${account.accessToken}`,
            );
            const userInfo = await userData.json();
            if (userInfo.name) {
              Promise.all([
                await prisma.account.update({
                  where: {
                    id: account.id,
                  },
                  data: {
                    providerName: userInfo.name,
                  },
                }),
                await prisma.user.update({
                  where: {
                    id: account.userId,
                  },
                  data: {
                    image: userInfo.picture,
                    displayUsername: `${userInfo.name}_${randomUserNameSlug}`,
                    username: `${userInfo.name}_${randomUserNameSlug}`,
                  },
                }),
              ]);
            }
          }
        },
      },
    },
  },
  advanced: {
    useSecureCookies: true,
  },
  onAPIError: {
    throw: true,
    errorURL: `${env.CLIENT_ORIGIN}/auth/error`,
  },
});

export function generateRandomUsernameSlug(length: number = 3): string {
  if (length <= 0) {
    throw new Error("Length must be a positive integer");
  }
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, chars.length);
    result += chars[randomIndex];
  }

  return result;
}
