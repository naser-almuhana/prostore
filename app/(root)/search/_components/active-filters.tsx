import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ActiveFiltersProps {
  filters: {
    q: string
    category: string
    price: string
    rating: string
  }
}

export function ActiveFilters({ filters }: ActiveFiltersProps) {
  const { q, category, price, rating } = filters

  const hasFilters =
    (q !== "all" && q !== "") ||
    (category !== "all" && category !== "") ||
    rating !== "all" ||
    price !== "all"

  if (!hasFilters) return null

  return (
    <div className="flex items-center gap-0.5">
      {q !== "all" && q !== "" && <Badge>{"Query: " + q}</Badge>}
      {category !== "all" && category !== "" && (
        <Badge>{"Category: " + category}</Badge>
      )}
      {price !== "all" && <Badge>{"Price: " + price}</Badge>}
      {rating !== "all" && <Badge>{"Rating: " + rating + " stars & up"}</Badge>}
      &nbsp;
      <Button variant={"link"} asChild>
        <Link href="/search">Clear</Link>
      </Button>
    </div>
  )
}
