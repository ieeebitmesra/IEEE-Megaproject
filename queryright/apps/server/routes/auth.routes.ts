import type { FastifyPluginAsync } from "fastify";
import { auth } from "@/utils/auth.js";
import { logger } from "@/index.js";
import jwt from "jsonwebtoken";
import { env } from "@/env.js";
import { prisma } from "@/utils/db.js";
import z from "zod";
import { APIError } from "better-auth";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { client } from "@/utils/qstash-client.js";

import { EMAIL_BACKOFF_SCHEDULE } from "@/constants.js";
import { ChangeEmailSchema, type SendEmailProps } from "@repo/schema";
import { fromNodeHeaders, requireAuth } from "@/utils/functions.js";

const scryptAsync = promisify(scrypt);

export const hashSecurityAnswer = async (answer: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(
    answer.trim().toLowerCase(),
    salt,
    64,
  )) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifySecurityAnswer = async (
  storedFullHash: string,
  attempt: string,
) => {
  const [salt, hash] = storedFullHash.split(":");
  if (!salt || !hash) return false;

  const derivedKey = (await scryptAsync(
    attempt.trim().toLowerCase(),
    salt,
    64,
  )) as Buffer;
  const storedKeyBuffer = Buffer.from(hash, "hex");

  return timingSafeEqual(storedKeyBuffer, derivedKey);
};

const getPasswordVerificationUrl = async (userId: string) => {
  try {
    const token = jwt.sign({ userId: userId }, env.BETTER_AUTH_SECRET, {
      expiresIn: "15m",
    });
    await prisma.user.update({
      where: { id: userId },
      data: { passwordChangeAllowed: new Date(Date.now() + 15 * 60 * 1000) },
    });
    return `${env.CLIENT_ORIGIN}/change-password?token=${token}`;
  } catch (error) {
    logger.error(error, "unable to get verification url");
    throw new Error("unable to get verification url");
  }
};

const verifyPasswordChange = async (token: string) => {
  try {
    const decoded = jwt.verify(token, env.BETTER_AUTH_SECRET) as {
      userId: string;
    };
    if (!decoded || !decoded.userId) throw new Error("Invalid token payload");

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user || !user.passwordChangeAllowed)
      throw new Error("Password change not requested");
    if (new Date() > user.passwordChangeAllowed)
      throw new Error("Password change window has expired");

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordChangeAllowed: null },
    });
    return { success: true, userId: decoded.userId };
  } catch (error) {
    logger.error(error, "verifyPasswordChange");
    return { success: false, error: "Invalid or expired token" };
  }
};

const getEmailVerificationUrl = async (userId: string) => {
  try {
    const token = jwt.sign({ userId: userId }, env.BETTER_AUTH_SECRET, {
      expiresIn: "15m",
    });
    await prisma.user.update({
      where: { id: userId },
      data: { emailChangeAllowed: new Date(Date.now() + 15 * 60 * 1000) },
    });
    return `${env.CLIENT_ORIGIN}/change-email?token=${token}`;
  } catch (error) {
    logger.error(error, "unable to get verification url");
    throw new Error("unable to get verification url");
  }
};

const verifyEmailChange = async (token: string) => {
  try {
    const decoded = jwt.verify(token, env.BETTER_AUTH_SECRET) as {
      userId: string;
    };
    if (!decoded || !decoded.userId) throw new Error("Invalid token payload");

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user || !user.emailChangeAllowed)
      throw new Error("Email change not requested");
    if (new Date() > user.emailChangeAllowed)
      throw new Error("Email change window has expired");

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailChangeAllowed: null },
    });
    return { success: true, userId: decoded.userId };
  } catch (error) {
    logger.error(error, "verifyEmailChange");
    return { success: false, error: "Invalid or expired token" };
  }
};

const authRoutes: FastifyPluginAsync = async (app) => {
  app.get("/user/email-cooldown", async (request, reply) => {
    const { email } = request.query as { email: string };

    if (!email) return reply.send({ remainingSeconds: 0, nextRetryCount: 0 });

    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        emailVerificationRetryCount: true,
        lastVerificationEmailSentAt: true,
      },
    });

    if (!user || !user.lastVerificationEmailSentAt) {
      return { remainingSeconds: 0, nextRetryCount: 0 };
    }

    const now = Date.now();
    const lastSent = user.lastVerificationEmailSentAt.getTime();

    if (now - lastSent > 24 * 60 * 60 * 1000) {
      return { remainingSeconds: 0, nextRetryCount: 0 };
    }

    const retryCount = user.emailVerificationRetryCount;

    const waitTimeSeconds =
      EMAIL_BACKOFF_SCHEDULE[
        Math.min(retryCount, EMAIL_BACKOFF_SCHEDULE.length - 1)
      ] || 0;

    const elapsedSeconds = (now - lastSent) / 1000;
    const remainingSeconds = Math.max(
      0,
      Math.ceil(waitTimeSeconds - elapsedSeconds),
    );

    return {
      remainingSeconds,
      nextRetryCount: retryCount + 1,
    };
  });

  app.get("/user/password-reset-cooldown", async (request) => {
    const { email } = request.query as { email: string };
    if (!email) return { remainingSeconds: 0 };

    const user = await prisma.user.findFirst({
      where: { email },
      select: { lastResetEmailSentAt: true },
    });
    if (!user || !user.lastResetEmailSentAt) {
      return { remainingSeconds: 0 };
    }
    const now = Date.now();
    const lastSent = user.lastResetEmailSentAt.getTime();
    const COOLDOWN_MS = 6 * 60 * 60 * 1000;
    if (now - lastSent > COOLDOWN_MS) {
      return { remainingSeconds: 0 };
    }
    const elapsedMs = now - lastSent;
    const remainingSeconds = Math.max(
      0,
      Math.ceil((COOLDOWN_MS - elapsedMs) / 1000),
    );

    return { remainingSeconds };
  });
  app.get("/user/security-questions", async () => {
    try {
      const questions = await prisma.securityQuestion.findMany({
        select: { id: true, text: true },
      });
      return questions;
    } catch (error) {
      logger.error(error, "Failed to fetch security questions");
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to fetch security questions",
      );
    }
  });

  app.post("/change-password/request", async (request, reply) => {
    const user = await requireAuth(request, reply);
    if (!user) return;
    const url = await getPasswordVerificationUrl(user.id);
    await client.publishJSON<SendEmailProps>({
      url: `${env.BACKEND_URL}/workflows/sendEmail`,
      body: {
        to: user.email,
        reason: "updatePassword",
        url: url,
        username: user.name,
      },
    });
    return {
      success: true,
    };
  });

  app.post("/change-email/request", async (request, reply) => {
    const user = await requireAuth(request, reply);
    if (!user) return;
    const url = await getEmailVerificationUrl(user.id);
    await client.publishJSON<SendEmailProps>({
      url: `${env.BACKEND_URL}/workflows/sendEmail`,
      body: {
        to: user.email,
        reason: "emailChangeVerification",
        url: url,
        username: user.name,
      },
    });
    return {
      success: true,
    };
  });

  app.post(
    "/change-email",
    { schema: { body: ChangeEmailSchema } },
    async (request, reply) => {
      const user = await requireAuth(request, reply);
      if (!user) return;

      const { newEmail, token } = request.body as z.infer<
        typeof ChangeEmailSchema
      >;
      const verification = await verifyEmailChange(token);

      if (!verification.success || !verification.userId) {
        return reply
          .status(403)
          .send({ error: verification.error || "Invalid token" });
      }

      if (user.id !== verification.userId) {
        return reply.status(403).send({ error: "Forbidden: Token mismatch" });
      }

      try {
        const updatedUser = await prisma.user.update({
          where: { id: verification.userId },
          data: { email: newEmail, emailVerified: false },
        });
        await client.publishJSON<SendEmailProps>({
          url: `${env.BACKEND_URL}/workflows/sendEmail`,
          body: {
            to: newEmail,
            reason: "emailChange",
            url: "",
            email: newEmail,
            username: user.name,
          },
        });
        return reply.send({
          success: true,
          message: "Email updated successfully",
          user: { email: updatedUser.email },
        });
      } catch (error: any) {
        if (error.code === "P2002")
          return reply.status(409).send({ error: "Email already in use" });
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.route({
    method: ["GET", "POST"],
    url: "/*",
    async handler(request, reply) {
      try {
        const url = new URL(request.url, `http://${request.headers.host}`);
        const body = request.body as any;

        if (
          url.pathname.endsWith("/reset-password") &&
          request.method === "POST"
        ) {
          if (body && body.newPassword) {
            const passwordStr = body.newPassword as string;
            const token = body.token as string;

            const match = passwordStr.match(
              /^(.*?)\?question="([^"]+)"\?ans="([^"]+)"$/,
            );

            if (match) {
              const [_, realPassword, questionId, providedAnswer] = match;

              if (!token) {
                throw new APIError("BAD_REQUEST", {
                  message: "Missing reset token",
                });
              }

              const verificationRecord = await prisma.verification.findFirst({
                where: {
                  identifier: `reset-password:${token}`,
                  expiresAt: { gt: new Date() },
                },
              });

              if (!verificationRecord) {
                throw new APIError("BAD_REQUEST", {
                  message: "Invalid or expired reset link",
                });
              }

              const userId = verificationRecord.value;

              const securityRecord = await prisma.userSecurityAnswer.findUnique(
                {
                  where: {
                    userId_questionId: {
                      userId: userId,
                      questionId: questionId as string,
                    },
                  },
                },
              );

              if (!securityRecord) {
                throw new APIError("BAD_REQUEST", {
                  message: "Security question not set for this user",
                });
              }

              const isValid = await verifySecurityAnswer(
                securityRecord.answer,
                providedAnswer as string,
              );

              if (!isValid) {
                throw new APIError("BAD_REQUEST", {
                  message: "Incorrect security answer",
                  code: "SECURITY_QUESTION_FAILED",
                });
              }

              body.newPassword = realPassword;
            }
          }
        }

        if (url.pathname.endsWith("/change-password")) {
          if (
            body &&
            body.newPassword &&
            body.newPassword.includes("?token=")
          ) {
            const token = body.newPassword.split("?token=")[1];
            const verification = await verifyPasswordChange(token);

            if (!verification.success) {
              throw new APIError("BAD_REQUEST", {
                message: "Invalid or expired token",
                code: "400",
              });
            }

            body.newPassword = body.newPassword.split("?token=")[0];
          }
        }

        const req = new Request(url.toString(), {
          method: request.method,
          headers: fromNodeHeaders(request.headers),
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        const response = await auth.handler(req);
        reply.status(response.status);
        response.headers.forEach((value, key) => reply.header(key, value));
        reply.send(response.body ? await response.text() : null);
      } catch (error) {
        if (error instanceof APIError) {
          reply
            .status(400)
            .send({ error: error.message, code: error.body?.code });
          return;
        }
        logger.error(error, "Authentication Error");
        reply
          .status(500)
          .send({
            error: "Internal authentication error",
            code: "AUTH_FAILURE",
          });
      }
    },
  });
};

export default authRoutes;
