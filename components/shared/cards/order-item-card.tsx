import Image from "next/image"
import Link from "next/link"

import type { CartItem } from "@/types"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface OrderItemCardProps {
  items: CartItem[]
  isEditable?: boolean
}

export function OrderItemCard({
  items,
  isEditable = false,
}: OrderItemCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Order Items</CardTitle>

        {isEditable && (
          <Link href="/cart">
            <Button variant="outline">Edit</Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <span className="px-2">{item.name}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="px-2">{item.qty}</span>
                </TableCell>
                <TableCell className="text-right">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
