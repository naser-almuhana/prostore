import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()
  await prisma.product.deleteMany()

  console.log("Database deleted successfully!")
}

main()
