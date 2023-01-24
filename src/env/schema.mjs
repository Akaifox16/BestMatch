import { z } from "zod";

export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
}

export const clientSchema = z.object({

})

export const clientEnv = {

}