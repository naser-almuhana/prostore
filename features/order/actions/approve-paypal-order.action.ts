"use server"

import { revalidatePath } from "next/cache"

import { paypal } from "@/lib/paypal"
import { formatError } from "@/lib/utils"

import { PaymentResult } from "@/features/place-order/types"

import { getOrderById } from "./get-order-by-id.action"
import { updateOrderToPaid } from "./update-order-to-paid.action"

// Approve paypal order and update order to paid
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }, // paymentResult id
) {
  try {
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

    revalidatePath(`/order/${orderId}`)

    return {
      success: true,
      message: "Your order has been paid",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
