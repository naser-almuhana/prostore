import { cn } from "@/lib/utils"

interface ProductPriceProps extends React.ComponentProps<"p"> {
  value: number
}

export function ProductPrice({ value, className }: ProductPriceProps) {
  // Ensure two decimal places
  const stringValue = value.toFixed(2)
  // Get the int/float
  const [intValue, floatValue] = stringValue.split(".")

  return (
    <p className={cn("text-2xl", className)}>
      <span className="align-super text-xs">$</span>
      {intValue}
      <span className="align-super text-xs">.{floatValue}</span>
    </p>
  )
}
