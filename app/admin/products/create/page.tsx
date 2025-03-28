import type { Metadata } from "next"

import { requireAdmin } from "@/lib/auth-guard"

import { ProductForm } from "../_components/product-form"

export const metadata: Metadata = {
  title: "Create Product",
}

export default async function CreateProductPage() {
  await requireAdmin()
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  )
}
