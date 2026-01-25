import type { FastifyPluginAsync } from "fastify";
import { sendEmailWorkflow } from "@/workflows/email.workflow.js";

import { SendEmailSchema } from "@repo/schema";
const workflowRoutes: FastifyPluginAsync = async (app) => {
  app.post("/sendEmail", { schema: SendEmailSchema }, sendEmailWorkflow);
};

export default workflowRoutes;
