import Link from "next/link"

import { Button } from "@/components/ui/button"

export function ViewAllButton() {
  return (
    <div className="my-8 flex items-center justify-center">
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <Link href="/search">View All Products</Link>
      </Button>
    </div>
  )
}
