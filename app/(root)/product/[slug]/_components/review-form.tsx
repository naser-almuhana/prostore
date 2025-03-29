"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { StarIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { InsertReview } from "@/types"

import {
  createUpdateReview,
  getReviewByProductId,
} from "@/lib/actions/review.actions"
import { insertReviewSchema } from "@/lib/validators"

import { reviewFormDefaultValues } from "@/constants"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ReviewFormProps {
  userId: string
  productId: string
}

export function ReviewForm({ userId, productId }: ReviewFormProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<InsertReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  })

  // Open Form Handler
  const handleOpenForm = async () => {
    form.setValue("productId", productId)
    form.setValue("userId", userId)

    const review = await getReviewByProductId({ productId })

    if (review) {
      form.setValue("title", review.title)
      form.setValue("description", review.description)
      form.setValue("rating", review.rating)
    }

    setOpen(true)
  }

  // Submit Form Handler
  const onSubmit: SubmitHandler<InsertReview> = async (values) => {
    const res = await createUpdateReview({ ...values, productId })

    if (!res.success) {
      return toast.error(res.message)
    }

    setOpen(false)
    toast.success(res.message)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm} variant="default">
        Write a Review
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts with other customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Star Rating Input */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const starValue = index + 1
                          return (
                            <StarIcon
                              key={starValue}
                              className={`h-6 w-6 cursor-pointer ${
                                field.value >= starValue
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-400"
                              }`}
                              onClick={() => field.onChange(starValue)}
                            />
                          )
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
