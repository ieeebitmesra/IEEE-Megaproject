import { Resend } from "resend";
import { APPNAME } from "@/constants.js";
import { generateEmailTemplates } from "./generateEmailTemplates.js";
import { generatePlainTextEmailTemplates } from "./generateEmailTextTemplates.js";
import { checkEmail } from "../services/checkMail.service.js";
import { logger } from "@/index.js";
import { env } from "@/env.js";
import { type SendEmailProps, type EmailReason } from "@repo/schema";

const resend = new Resend(env.RESEND_API_KEY);

const subjectMap: Record<EmailReason, string> = {
  verify: `Welcome to ${APPNAME}! Please verify your email`,
  forgotPassword: `${APPNAME}: Password reset request`,
  emailChange: `${APPNAME}: Your email address has been changed`,
  emailChangeVerification: `${APPNAME}: Verify your new email address`,
  updatePassword: `${APPNAME}: Your password has been updated`,
};

export const sendEmail = async ({
  to,
  reason,
  username,
  url,
  email,
  html,
  toBeVerified = true,
}: SendEmailProps) => {
  if (toBeVerified) {
    const isSafe = await checkEmail(to);
    if (!isSafe) {
      logger.warn(`Email ${to} is not deliverable or is disposable.`);
      throw new Error(`Email ${to} is not deliverable or is disposable`);
    }
  }

  const emailForBody = email || to;

  const htmlTemplate = generateEmailTemplates(
    username,
    url,
    emailForBody,
    reason,
  );
  const textTemplate = generatePlainTextEmailTemplates(
    username,
    url,
    emailForBody,
    reason,
  );

  const finalHtml = htmlTemplate ?? html ?? "";
  const finalText = textTemplate ?? "";

  if (!finalHtml && !finalText) {
    logger.warn(`No content generated for reason: ${reason}`);
    throw new Error(`No content generated for reason: ${reason}`);
  }

  const options = {
    from: "onboarding@letshost.dpdns.org",
    to: to,
    subject: subjectMap[reason] || `Notification from ${APPNAME}`,
    html: finalHtml,
    text: finalText,
  };

  try {
    await resend.emails.send(options);
  } catch (error) {
    logger.error(error);
    throw new Error("Failed to send email");
  }
};
