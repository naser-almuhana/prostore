import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { auth } from "@/auth"
import Stripe from "stripe"

import type { ShippingAddress } from "@/types"

import { getOrderById } from "@/lib/actions/order.actions"
import { formatId } from "@/lib/utils"

import { OrderItemCard } from "@/components/shared/cards/order-item-card"
import { PaymentMethodCard } from "@/components/shared/cards/payment-method-card"
import { ShippingAddressCard } from "@/components/shared/cards/shipping-address-card"

import { PaypalStripeCard } from "./_components/paypal-stripe-card"

export const metadata: Metadata = {
  title: "Order Details",
}

interface OrderDetailsPageProps {
  params: Promise<{
    id: string
  }>
}
export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { id } = await params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  // Redirect the user if they don't own the order
  if (order.userId !== session?.user.id && session?.user.role !== "admin") {
    return redirect("/unauthorized")
  }

  const {
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order

  let stripe_client_secret = null

  // Check if is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // Init stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    })
    stripe_client_secret = paymentIntent.client_secret
  }

  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <ShippingAddressCard
            address={shippingAddress as ShippingAddress}
            status={{
              isDelivered,
              deliveredAt,
            }}
            editHref={null} // Explicitly hide edit
          />

          <PaymentMethodCard
            paymentMethod={paymentMethod}
            status={{ isPaid, paidAt }}
            editHref={null} // Explicitly hide edit
          />

          <OrderItemCard items={orderitems} />
        </div>
        <div>
          <PaypalStripeCard
            orderId={id}
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
            taxPrice={taxPrice}
            totalPrice={totalPrice}
            isPaid={isPaid}
            paymentMethod={paymentMethod}
            isAdmin={session?.user?.role === "admin" || false}
            stripeClientSecret={stripe_client_secret}
            isDelivered={isDelivered}
          />
        </div>
      </div>
    </>
  )
}

// sb-aw4ak39157091@personal.example.com
// {z0%k?qO
