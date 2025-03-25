import { Fragment } from "react"

import { cn } from "@/lib/utils"

interface CheckoutStepsProps {
  current?: number
}

export function CheckoutSteps({ current = 0 }: CheckoutStepsProps) {
  return (
    <div className="flex-between mb-10 flex-col space-y-2 space-x-2 md:flex-row">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <Fragment key={step}>
            <div
              className={cn(
                "w-56 rounded-full p-2 text-center text-sm",
                index === current ? "bg-secondary" : "",
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <hr className="border-border mx-2 w-16 border-t" />
            )}
          </Fragment>
        ),
      )}
    </div>
  )
}
