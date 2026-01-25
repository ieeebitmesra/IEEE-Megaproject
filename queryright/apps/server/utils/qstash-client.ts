import { env } from "@/env.js";
import { Client } from "@upstash/qstash";

export const client = new Client({
  baseUrl: env.QSTASH_URL,
  token: env.QSTASH_TOKEN,
});
