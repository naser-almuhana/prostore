import { PrismaClient } from "@prisma/client"

import { hash } from "@/lib/encrypt"

import sampleData from "./sample-data"

async function main(action: "seed" | "truncate") {
  console.log("Start deleting")

  const prisma = new PrismaClient()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  console.log("Database deleted successfully!")

  if (action === "seed") {
    console.log("Start seeding")

    await prisma.product.createMany({ data: sampleData.products })

    // user seeding
    const users = []
    for (let i = 0; i < sampleData.users.length; i++) {
      users.push({
        ...sampleData.users[i],
        password: await hash(sampleData.users[i].password),
      })
    }
    await prisma.user.createMany({ data: users })

    console.log("Database seeded successfully!")
  }
}

const action = process.argv[2] as "truncate" | "seed"

main(action)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    process.exit(0)
  })
