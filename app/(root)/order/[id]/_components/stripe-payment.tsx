"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useTheme } from "next-themes"

import { StripePaymentForm } from "./stripe-payment-form"

interface StripePaymentProps {
  priceInCents: number
  orderId: string
  clientSecret: string
}
export function StripePayment({
  priceInCents,
  clientSecret,
  orderId,
}: StripePaymentProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  )
  const { theme, systemTheme } = useTheme()

  const currentElementsTheme =
    theme === "dark"
      ? "night"
      : theme === "light"
        ? "stripe"
        : systemTheme === "light"
          ? "stripe"
          : "night"

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: currentElementsTheme,
        },
      }}
      stripe={stripePromise}
    >
      <StripePaymentForm orderId={orderId} priceInCents={priceInCents} />
    </Elements>
  )
}
