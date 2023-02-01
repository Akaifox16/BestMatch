import { publicProcedure } from "@server/trpc"
import { prisma } from '@server/db'
import { loginDto } from "@server/model/user"

const login = publicProcedure
  .input(loginDto)
  .mutation(async ({ input }) => {
    const user = await prisma.user.findFirst({
      where: {
        AND: {
          email: input.email,
          password: input.password,
        }
      }
    })
    
    if(!user) return null

    return {
    email: user.email,
    name: `${user.first_name} ${user.last_name}`,
    id: user.id,
    }
  })

export default login