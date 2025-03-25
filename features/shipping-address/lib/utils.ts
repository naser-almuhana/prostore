import { round2 } from "@/lib/utils"

import {
  DEFAULT_SHIPPING_PRICE,
  DEFAULT_TAX_PERCENTAGE,
} from "@/features/cart/constants"
import { CartItem } from "@/features/cart/types"

// Calculate cart prices
export const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : DEFAULT_SHIPPING_PRICE),
    taxPrice = round2(DEFAULT_TAX_PERCENTAGE * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice)

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}
