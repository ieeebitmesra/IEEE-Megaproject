import type { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "./auth.js";

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}
export const fromNodeHeaders = (nodeHeaders: FastifyRequest["headers"]) => {
  const headers = new Headers();
  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (typeof value === "string") {
      headers.append(key, value);
    }
  }
  return headers;
};

export const requireAuth = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });
  if (!session) {
    reply.status(401).send({ error: "Unauthorized" });
    return null;
  }
  return session.user;
};
