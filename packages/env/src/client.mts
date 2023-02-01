import { clientSchema, clientEnv } from "./schema.mjs";

export const env = clientSchema.parse(clientEnv)