import Link from "next/link"

import { CalendarIcon, UserIcon } from "lucide-react"

import { deleteReview, getReviews } from "@/lib/actions/review.actions"
import { formatDateTime } from "@/lib/utils"

import { DeleteDialog } from "@/components/shared/delete-dialog"
import { Rating } from "@/components/shared/rating"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ReviewForm } from "./review-form"

interface ReviewListProps {
  userId: string
  userRole: string
  productId: string
  productSlug: string
}

export async function ReviewList({
  userId,
  userRole,
  productId,
  productSlug,
}: ReviewListProps) {
  const { data: reviews } = await getReviews({ productId })

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <ReviewForm userId={userId} productId={productId} />
      ) : (
        <div>
          Please
          <Link
            className="px-2 text-blue-700"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>
          to write a review
        </div>
      )}
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{review.title}</CardTitle>
                  <CardDescription>{review.description}</CardDescription>
                </div>
                {(review.userId === userId || userRole === "admin") && (
                  <DeleteDialog id={review.id} action={deleteReview} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex space-x-4 text-sm">
                <Rating value={review.rating} />
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-3 w-3" />
                  {review.user ? review.user.name : "User"}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {formatDateTime(review.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
