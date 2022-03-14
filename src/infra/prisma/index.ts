/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-mutable-exports */
import { prismaConfig } from '@config/prisma'
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top
  var prisma: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaConfig)
} else {
  global.prisma = new PrismaClient(prismaConfig)
  prisma = global.prisma
}

export { prisma }
