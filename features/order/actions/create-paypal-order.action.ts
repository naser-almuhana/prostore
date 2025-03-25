"use server"

import { prisma } from "@/db/prisma"

import { paypal } from "@/lib/paypal"
import { formatError } from "@/lib/utils"

// Create new paypal order
export async function createPayPalOrder(orderId: string) {
  try {
    // Get order from database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })

    if (order) {
      // Create paypal order
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice))

      // Update order with paypal order id
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: "",
            status: "",
            pricePaid: 0,
          },
        },
      })

      return {
        success: true,
        message: "Item order created successfully",
        data: paypalOrder.id,
      }
    } else {
      throw new Error("Order not found")
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
