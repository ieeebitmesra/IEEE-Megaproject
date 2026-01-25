import { sendEmail } from "@/helpers/sendEmail.js";
import { logger } from "@/index.js";
import type { SendEmailProps } from "@repo/schema";
import type { FastifyRequest } from "fastify";

export const sendEmailWorkflow = async (request: FastifyRequest) => {
  const data = request.body as SendEmailProps;
  try {
    await sendEmail({
      to: data.to ?? "",
      reason: data.reason,
      username: data.username ?? "",
      url: data.url ?? "",
      toBeVerified: data.toBeVerified ?? false,
    });
    logger.info(
      `Sending verification email to ${data.to} with URL: ${data.url}`,
    );
  } catch (error) {
    logger.error(error, "Error in sendVerificationEmailWorkflow");
    throw new Error("Error in sendVerificationEmailWorkflow");
  }
};
