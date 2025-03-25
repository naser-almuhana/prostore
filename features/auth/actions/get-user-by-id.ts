"use server"

import { prisma } from "@/db/prisma"

// Get user by the ID
export async function getUserById(userId?: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user) throw new Error("User not found")
  return user
}
