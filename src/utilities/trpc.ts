import { AppRouter } from "@server/routers/_app"
import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"

function getBaseURL() {
  return process.env.VERCEL_URL ? `https:${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({url: `${getBaseURL()}/api/trpc`})
      ]
    }
  },
  ssr: true,
})