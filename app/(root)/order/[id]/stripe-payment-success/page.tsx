import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import Stripe from "stripe"

import { getOrderById } from "@/lib/actions/order.actions"

import { Button } from "@/components/ui/button"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

interface SuccessPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ payment_intent: string }>
}

export default async function SuccessPage(props: SuccessPageProps) {
  const { id } = await props.params
  const { payment_intent: paymentIntentId } = await props.searchParams

  // Fetch order
  const order = await getOrderById(id)
  if (!order) notFound()

  // Retrieve payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  // Check if payment intent is valid
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound()
  }

  // Check if payment is successful
  const isSuccess = paymentIntent.status === "succeeded"

  if (!isSuccess) return redirect(`/order/${id}`)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="h1-bold">Thanks for your purchase</h1>
        <div>We are processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  )
}
