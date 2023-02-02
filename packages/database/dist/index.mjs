// src/index.ts
import { PrismaClient } from "@prisma/client";
import { env } from "@bm/env";
var prisma = global.prisma || new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (env.NODE_ENV === "production")
  global.prisma = prisma;
export {
  prisma
};
//# sourceMappingURL=index.mjs.map