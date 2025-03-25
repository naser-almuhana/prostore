"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import { cn } from "@/lib/utils"

const checkoutStepsData = [
  { label: "Shipping Address", href: "/shipping-address" },
  { label: "Payment Method", href: "/payment-method" },
  { label: "Place Order", href: "/place-order" },
]

export function CheckoutSteps() {
  const pathname = usePathname()

  // Find the index of the current active step based on the pathname
  const currentStep = checkoutStepsData.findIndex(
    ({ href }) => pathname === href,
  )

  return (
    <div className="flex-between mb-6 flex-col space-y-2 space-x-2 md:flex-row">
      {checkoutStepsData.map(({ href, label }, index) => {
        const isActive = index === currentStep

        return (
          <Fragment key={label}>
            <div
              className={cn(
                "w-56 rounded-full p-2 text-center text-sm transition-colors",
                isActive && "bg-secondary",
              )}
            >
              <Link href={href}>{label}</Link>
            </div>
            {index < checkoutStepsData.length - 1 && (
              <hr className="border-border mx-2 w-16 border-t" />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
