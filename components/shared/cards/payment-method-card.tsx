// components/checkout/payment-method-card.tsx
import { StatusCard } from "@/components/shared/cards/status-card"

interface PaymentMethodCardProps {
  paymentMethod: string
  // Optional status props
  status?: {
    isPaid: boolean
    paidAt: Date | null
  } | null
  // Optional edit props
  editHref?: string | null
}

export function PaymentMethodCard({
  paymentMethod,
  status = null,
  editHref = null,
}: PaymentMethodCardProps) {
  return (
    <StatusCard
      title="Payment Method"
      status={
        status
          ? {
              isComplete: status.isPaid,
              completedAt: status.paidAt,
              completeLabel: "Paid at",
              incompleteLabel: "Not paid",
            }
          : null
      }
      editHref={editHref}
    >
      <p>{paymentMethod}</p>
    </StatusCard>
  )
}
