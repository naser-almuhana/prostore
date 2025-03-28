"use server"

import { revalidatePath } from "next/cache"
import { unstable_cache } from "next/cache"

import { Prisma } from "@prisma/client"

import type {
  ActionReturn,
  InsertProduct,
  Product,
  UpdateProduct,
} from "@/types"

import { prisma } from "@/db/prisma"

import { convertToPlainObject, formatError } from "@/lib/utils"
import { insertProductSchema, updateProductSchema } from "@/lib/validators"

import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/constants"

//  get the latest products
export const getLatestProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" },
    })

    return convertToPlainObject(data)
  },
  ["getLatestProducts"], // Cache key
  { revalidate: 60 * 60 }, // Cache expires every 60 seconds
)

// Get single product by it's id
export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) return null

  return convertToPlainObject(product)
}

// Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug },
  })
}

type GetAllProductsOptions = {
  query: string
  limit?: number
  page: number
  category?: string
  price?: string
  rating?: string
  sort?: string
}

// Get all products
export const getAllProducts = unstable_cache(
  async ({
    query,
    limit = PAGE_SIZE,
    page,
    category,
    price,
    rating,
    sort,
  }: GetAllProductsOptions) => {
    // Query filter
    const queryFilter: Prisma.ProductWhereInput =
      query && query !== "all"
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          }
        : {}

    // Category filter
    const categoryFilter = category && category !== "all" ? { category } : {}

    // Price filter
    const priceFilter: Prisma.ProductWhereInput =
      price && price !== "all"
        ? {
            price: {
              gte: Number(price.split("-")[0]),
              lte: Number(price.split("-")[1]),
            },
          }
        : {}

    // Rating filter
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              gte: Number(rating),
            },
          }
        : {}

    const data = await prisma.product.findMany({
      where: {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
      orderBy:
        sort === "lowest"
          ? { price: "asc" }
          : sort === "highest"
            ? { price: "desc" }
            : sort === "rating"
              ? { rating: "desc" }
              : { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    })

    const dataCount = await prisma.product.count({
      where: {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
    })

    return {
      data,
      totalPages: Math.ceil(dataCount / limit),
    }
  },
  ["getAllProducts"], // Cache key
  { revalidate: 60 * 60 }, // Cache expires every 60 seconds
)

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await getProductById(id)

    if (!productExists) throw new Error("Product not found")

    await prisma.product.delete({ where: { id } })

    revalidatePath("/admin/products")

    return {
      success: true,
      message: "Product deleted successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Create a product
export async function createProduct(data: InsertProduct): ActionReturn {
  try {
    const product = insertProductSchema.parse(data)
    await prisma.product.create({ data: product })

    revalidatePath("/admin/products")

    return {
      success: true,
      message: "Product created successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Update a product
export async function updateProduct(data: UpdateProduct): ActionReturn {
  try {
    const product = updateProductSchema.parse(data)
    const productExists = getProductById(product.id)

    if (!productExists) throw new Error("Product not found")

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    })

    revalidatePath("/admin/products")

    return {
      success: true,
      message: "Product updated successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
