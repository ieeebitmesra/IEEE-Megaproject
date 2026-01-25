import dotenv from "dotenv";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import docItUpPlugin from "doc-it-up/fastify";
import path from "path";
dotenv.config();
import { env } from "./env.js";
import workflowRoutes from "@/routes/workflow.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contentRoutes from "@/routes/content.routes.js";

const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: env.CLIENT_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});

// ...
app.register(docItUpPlugin, {
  docsDir: path.join(process.cwd(), "docs"),
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

export const logger = app.log;

app.get("/health", () => {
  return { hello: "world" };
});

app.register(workflowRoutes, { prefix: "/api/v1/workflows" });
app.register(authRoutes, { prefix: "/api/auth" });
app.register(contentRoutes, { prefix: "/api/content" });

app.listen({ port: 4000 }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server listening at ${address}`);
});
