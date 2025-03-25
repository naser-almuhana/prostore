"use client"

import { useRouter } from "next/navigation"

import { Check, Loader } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

import { createOrder } from "@/features/place-order/actions/create-order.action"

export function PlaceOrderForm() {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await createOrder()

    if (res.redirectTo) {
      router.push(res.redirectTo)
    }
  }

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}{" "}
        Place Order
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  )
}
