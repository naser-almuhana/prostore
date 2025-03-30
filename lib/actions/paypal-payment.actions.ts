"use server"

import { auth } from "@/auth"

import type { PaymentResult } from "@/types"

import { prisma } from "@/db/prisma"

import { getOrderById, updateOrderToPaid } from "@/lib/actions/order.actions"
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

// Approve paypal order and update order to paid
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }, // paymentResult id
) {
  try {
    const session = await auth()
    if (!session) throw new Error("User is not authorized")

    // Get order from database
    const order = await getOrderById(orderId)
    if (!order) throw new Error("Order not found")

    const captureData = await paypal.capturePayment(data.orderID)

    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in PayPal payment")
    }

    // Update order to paid
    await updateOrderToPaid({
      orderId,
      paymentResult: {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
        pricePaid:
          captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
      },
    })

    return {
      success: true,
      message: "Your order has been paid",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
