import { CheckoutSteps } from "./_components/checkout-steps"

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container mx-auto">
      <CheckoutSteps />
      {children}
    </div>
  )
}
