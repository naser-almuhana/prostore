"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { getOrderById } from "@/features/order/actions/get-order-by-id.action"

// Update COD order to delivered
export async function deliverOrder(orderId: string) {
  try {
    const order = await getOrderById(orderId)

    if (!order) throw new Error("Order not found")
    if (!order.isPaid) throw new Error("Order is not paid")

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    })

    revalidatePath(`/order/${orderId}`)

    return {
      success: true,
      message: "Order has been marked delivered",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
