import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

console.log(
  `Prisma will try to connect to this DB_URL on first request: ${process.env.DB_URL}`
);

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  const globalWithPrisma = global as typeof global & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
