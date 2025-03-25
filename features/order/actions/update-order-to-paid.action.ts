"use server"

import { prisma } from "@/db/prisma"

import { PaymentResult } from "@/features/place-order/types"

// Update order to paid
export async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string
  paymentResult?: PaymentResult
}) {
  // Get order from database
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
    },
  })

  if (!order) throw new Error("Order not found")

  if (order.isPaid) throw new Error("Order is already paid")

  // Transaction to update order and account for product stock
  await prisma.$transaction(async (tx) => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      })
    }

    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    })
  })

  // Get updated order after transaction
  const updatedOrder = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  })

  if (!updatedOrder) throw new Error("Order not found")

  //   sendPurchaseReceipt({
  //     order: {
  //       ...updatedOrder,
  //       shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
  //       paymentResult: updatedOrder.paymentResult as PaymentResult,
  //     },
  //   })
}
