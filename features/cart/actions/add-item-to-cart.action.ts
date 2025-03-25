"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import { auth } from "@/auth"

import { ActionReturn } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { getMyCart } from "@/features/cart/actions/get-my-cart.action"
import { calcPrice } from "@/features/cart/lib/utils"
import { cartItemSchema } from "@/features/cart/schemas/cart-item.schema"
import { insertCartSchema } from "@/features/cart/schemas/insert-cart.schema"
import { CartItem } from "@/features/cart/types"
import { getProductById } from "@/features/product/actions/get-product-by-id"

export async function addItemToCart(data: CartItem): ActionReturn {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value
    if (!sessionCartId) throw new Error("Cart session not found")

    // Get session and user ID
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    // Get cart
    const cart = await getMyCart()

    // Parse and validate item
    const item = cartItemSchema.parse(data)

    // Find product in database
    const product = await getProductById(item.productId)
    if (!product) throw new Error("Product not found")

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      })

      // Add to database
      await prisma.cart.create({
        data: newCart,
      })

      // Revalidate product page
      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: `${product.name} added to cart`,
      }
    } else {
      // Check if item is already in cart
      const existItem = cart.items.find((x) => x.productId === item.productId)

      if (existItem) {
        // Check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock")
        }

        // Increase the quantity
        cart.items.find((x) => x.productId === item.productId)!.qty =
          existItem.qty + 1
      } else {
        // If item does not exist in cart
        // Check stock
        if (product.stock < 1) throw new Error("Not enough stock")

        // Add item to the cart.items
        cart.items.push(item)
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calcPrice(cart.items),
        },
      })

      revalidatePath(`/product/${product.slug}`)

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      }
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
