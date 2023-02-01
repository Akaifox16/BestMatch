import { serverEnv, serverSchema } from "./schema.mjs";

export const env = serverSchema.parse(serverEnv)
