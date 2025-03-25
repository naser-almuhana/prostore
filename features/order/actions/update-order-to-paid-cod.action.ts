"use server"

import { revalidatePath } from "next/cache"

import { formatError } from "@/lib/utils"

import { updateOrderToPaid } from "@/features/order/actions/update-order-to-paid.action"

// Update COD order to paid
export async function updateOrderToPaidCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId })

    revalidatePath(`/order/${orderId}`)

    return { success: true, message: "Order marked as paid" }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
