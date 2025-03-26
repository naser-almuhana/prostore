import type { Metadata } from "next"
import { Suspense } from "react"

import { OrdersTable } from "./_components/orders-table"
import { OrdersTableSkeleton } from "./_components/orders-table-skeleton"

export const metadata: Metadata = {
  title: "My Orders",
}

export default function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <div className="space-y-8 overflow-x-auto">
        <Suspense fallback={<OrdersTableSkeleton />}>
          <OrdersTable searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
