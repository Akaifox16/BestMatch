"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.mts
var env_exports = {};
__export(env_exports, {
  clientEnv: () => env2,
  env: () => env
});
module.exports = __toCommonJS(env_exports);

// src/schema.mts
var import_zod = require("zod");
var serverSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string().url(),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: process.env.NODE_ENV === "production" ? import_zod.z.string().min(1) : import_zod.z.string().min(1).optional(),
  NEXTAUTH_URL: import_zod.z.preprocess(
    (str) => {
      var _a;
      return (_a = process.env.VERCEL_URL) != null ? _a : str;
    },
    process.env.VERCEL ? import_zod.z.string() : import_zod.z.string().url()
  )
});
var serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL
};
var clientSchema = import_zod.z.object({});
var clientEnv = {};

// src/server.mts
var env = serverSchema.parse(serverEnv);

// src/client.mts
var env2 = clientSchema.parse(clientEnv);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientEnv,
  env
});
//# sourceMappingURL=index.js.map