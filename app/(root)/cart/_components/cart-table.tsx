import Image from "next/image"
import Link from "next/link"

import type { Cart } from "@/types"

import { CartActionButton } from "@/components/shared/cart-action-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { SubtotalCard } from "./subtotal-card"

interface CartTable {
  cart?: Cart
}

export function CartTable({ cart }: CartTable) {
  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
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
                    <TableCell className="flex-center gap-3">
                      <CartActionButton item={item} actionType="remove" />
                      <span>{item.qty}</span>
                      <CartActionButton item={item} actionType="add" />
                    </TableCell>
                    <TableCell className="text-right">${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <SubtotalCard cart={cart} />
        </div>
      )}
    </>
  )
}
