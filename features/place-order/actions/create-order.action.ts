"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"

import { auth } from "@/auth"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { getUserById } from "@/features/auth/actions/get-user-by-id"
import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { insertOrderSchema } from "@/features/place-order/schemas/insert-order.schema"

type CreateOrderReturn = Promise<{
  success: boolean
  message: string
  redirectTo?: string
}>

// Create order and create the order items
export async function createOrder(): CreateOrderReturn {
  try {
    const session = await auth()
    if (!session) throw new Error("User is not authenticated")

    const userId = session?.user?.id
    if (!userId) throw new Error("User not found")

    const cart = await getMyCart()

    const user = await getUserById(userId)

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      }
    }

    if (!user.address) {
      return {
        success: false,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      }
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      }
    }

    // Create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    })

    // Create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // Create order
      const insertedOrder = await tx.order.create({ data: order })
      // Create order items from the cart items
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        })
      }
      // Clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      })

      return insertedOrder.id
    })

    if (!insertedOrderId) throw new Error("Order not created")

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    return { success: false, message: formatError(error) }
  }
}
