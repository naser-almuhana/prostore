"use client"

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js"
import { toast } from "sonner"

import {
  approvePayPalOrder,
  createPayPalOrder,
} from "@/lib/actions/paypal-payment.actions"
import { formatCurrency } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"

import { MarkAsDeliveredButton } from "./mark-as-delivered-button"
import { MarkAsPaidButton } from "./mark-as-paid-button"
import { StripePayment } from "./stripe-payment"

interface PaypalStripeCardProps {
  orderId: string
  itemsPrice: string
  shippingPrice: string
  taxPrice: string
  totalPrice: string
  isPaid: boolean
  paymentMethod: string
  isAdmin: boolean
  isDelivered: boolean
  stripeClientSecret: string | null
}

export function PaypalStripeCard({
  orderId,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  isPaid,
  paymentMethod,
  isAdmin,
  isDelivered,
  stripeClientSecret,
}: PaypalStripeCardProps) {
  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status = ""

    if (isPending) {
      status = "Loading PayPal..."
    } else if (isRejected) {
      status = "Error Loading PayPal"
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(orderId)

    if (!res.success) {
      toast.error(res.message)
    }

    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(orderId, data)
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Card>
      <CardContent className="gap-4 space-y-4 p-4">
        <div className="flex justify-between">
          <div>Items</div>
          <div>{formatCurrency(itemsPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div>{formatCurrency(taxPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping</div>
          <div>{formatCurrency(shippingPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Total</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>

        {/* PayPal Payment */}
        {!isPaid && paymentMethod === "PayPal" && (
          <div>
            <PayPalScriptProvider
              options={{ clientId: process.env.PAYPAL_CLIENT_ID || "sb" }}
            >
              <PrintLoadingState />
              <PayPalButtons
                createOrder={handleCreatePayPalOrder}
                onApprove={handleApprovePayPalOrder}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {/* Stripe Payment */}
        {!isPaid && paymentMethod === "Stripe" && stripeClientSecret && (
          <StripePayment
            priceInCents={Number(totalPrice) * 100}
            orderId={orderId}
            clientSecret={stripeClientSecret}
          />
        )}

        {/* Cash On Delivery */}
        {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
          <MarkAsPaidButton orderId={orderId} />
        )}
        {isAdmin && isPaid && !isDelivered && (
          <MarkAsDeliveredButton orderId={orderId} />
        )}
      </CardContent>
    </Card>
  )
}
