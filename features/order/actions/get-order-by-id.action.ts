"use server"

import { prisma } from "@/db/prisma"

import { convertToPlainObject } from "@/lib/utils"

// Get order by id
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  })

  return convertToPlainObject(data)
}
