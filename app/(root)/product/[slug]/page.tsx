import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMyCart } from "@/lib/actions/cart.actions"
import { getProductBySlug } from "@/lib/actions/product.actions"

import { Rating } from "@/components/shared/rating"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { ProductCartAction } from "./_components/product-cart-action"
import { ProductImages } from "./_components/product-images"
import { ProductPrice } from "./_components/product-price"

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const cart = await getMyCart()

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} . {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <Rating value={Number(product.rating)} />
              <p>{product.numReviews} reviews</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 px-5 py-2 text-green-700"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className="flex-center">
                    <ProductCartAction
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="h2-bold mb-5">Customer Reviews</h2>
        review List
        {/* <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        /> */}
      </section>
    </>
  )
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  // read route params
  const { slug } = await params
  // fetch data
  const product = await getProductBySlug(slug)

  return {
    title: product?.name,
  }
}

// // Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const products = await getAllProducts()

//   return products.map((product) => ({
//     slug: product.slug,
//   }))
// }
