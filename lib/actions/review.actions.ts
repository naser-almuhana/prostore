"use server"

import { revalidateTag, unstable_cache } from "next/cache"

import { auth } from "@/auth"

import { InsertReview } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"
import { insertReviewSchema } from "@/lib/validators"

import { getProductById } from "./product.actions"

// Cached function for fetching reviews
export const getReviews = unstable_cache(
  async ({ productId }: { productId: string }) => {
    const data = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { data }
  },
  ["getReviews"],
  { tags: ["getReviews"] },
)

// Create & Update Reviews
export async function createUpdateReview(data: InsertReview) {
  try {
    const session = await auth()
    if (!session) throw new Error("User is not authenticated")

    // Validate and store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    })

    // Get product that is being reviewed
    const product = await getProductById(review.productId)

    if (!product) throw new Error("Product not found")

    // Check if user already reviewed
    const reviewExists = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    })

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        // Update review
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        })
      } else {
        // Create review
        await tx.review.create({ data: review })
      }

      // Get avg rating
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      })

      // Get number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      })

      // Update the rating and numReviews in product table
      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      })
    })

    revalidateTag("getReviews")
    revalidateTag("getLatestProducts")
    revalidateTag("getAllProducts")

    return {
      success: true,
      message: "Review Updated Successfully",
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// Get a review written by the current user
export async function getReviewByProductId({
  productId,
}: {
  productId: string
}) {
  const session = await auth()

  if (!session) throw new Error("User is not authenticated")

  return await prisma.review.findFirst({
    where: {
      productId,
      userId: session?.user?.id,
    },
  })
}

// Delete a review
export async function deleteReview(reviewId: string) {
  try {
    const session = await auth()
    if (!session) throw new Error("User is not authenticated")

    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { userId: true, productId: true },
    })

    if (!review) throw new Error("Review not found")

    const isAdmin = session?.user?.role === "admin"
    if (review.userId !== session?.user?.id && !isAdmin) {
      throw new Error("Unauthorized action")
    }

    await prisma.$transaction(async (tx) => {
      await tx.review.delete({ where: { id: reviewId } })

      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      })

      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      })

      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      })
    })

    revalidateTag("getReviews")
    revalidateTag("getLatestProducts")
    revalidateTag("getAllProducts")

    return { success: true, message: "Review deleted successfully" }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
