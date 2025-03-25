import { ReactNode } from "react"

import { CheckoutSteps } from "@/components/shared/checkout-steps"

interface CheckoutLayoutProps {
  children: ReactNode
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <div className="container mx-auto">
      <CheckoutSteps />
      {children}
    </div>
  )
}
