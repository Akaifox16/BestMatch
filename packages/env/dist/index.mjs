// src/schema.mts
import { z } from "zod";
var serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    (str) => {
      var _a;
      return (_a = process.env.VERCEL_URL) != null ? _a : str;
    },
    process.env.VERCEL ? z.string() : z.string().url()
  )
});
var serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL
};
var clientSchema = z.object({});
var clientEnv = {};

// src/server.mts
var env = serverSchema.parse(serverEnv);

// src/client.mts
var env2 = clientSchema.parse(clientEnv);
export {
  env2 as clientEnv,
  env
};
