
import { Prisma } from '@prisma/client'

let prismaLogConfig = [] as Array<Prisma.LogLevel | Prisma.LogDefinition>

try {
  prismaLogConfig = JSON.parse(process.env.PRISMA_LOG ?? '[]')
} catch (error) {
  prismaLogConfig = []
}

const prismaConfig: Prisma.PrismaClientOptions = Object.freeze({
  log: prismaLogConfig
})

export { prismaConfig }
