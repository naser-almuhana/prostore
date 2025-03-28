"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { XIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import slugify from "slugify"
import { toast } from "sonner"

import type { InsertProduct, Product, UpdateProduct } from "@/types"

import { createProduct, updateProduct } from "@/lib/actions/product.actions"
import { UploadButton } from "@/lib/uploadthing"
import { insertProductSchema, updateProductSchema } from "@/lib/validators"

import { productDefaultValues } from "@/constants"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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

interface ProductFormProps {
  type: "Create" | "Update"
  product?: Product
  productId?: string
}

export function ProductForm({ type, product, productId }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<InsertProduct | UpdateProduct>({
    resolver: zodResolver(
      type === "Update" ? updateProductSchema : insertProductSchema,
    ),
    defaultValues: type === "Update" ? product : productDefaultValues,
  })

  const onSubmit: SubmitHandler<InsertProduct> = async (values) => {
    // On Create
    if (type === "Create") {
      const res = await createProduct(values)

      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        router.push("/admin/products")
      }
    }

    // On Update
    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products")
        return
      }

      const res = await updateProduct({ ...values, id: productId })

      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        router.push("/admin/products")
      }
    }
  }

  const images = form.watch("images")
  const isFeatured = form.watch("isFeatured")
  const banner = form.watch("banner")

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative flex items-center justify-center gap-2">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true }),
                        )
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="Enter stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field flex flex-col gap-5 md:flex-row">
          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <Card>
                  <CardContent className="mt-2 min-h-48 space-y-2">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <div
                          key={image}
                          className="relative h-40 w-40 rounded-sm border object-cover object-center"
                        >
                          <Button
                            type="button"
                            disabled={isPending}
                            variant="destructive"
                            className="absolute top-0 left-0 size-7 cursor-pointer"
                            onClick={() => {
                              startTransition(async () => {
                                try {
                                  await axios.delete("/api/uploadthing", {
                                    data: { url: image }, // Send image URL to delete from storage
                                  })
                                  // Remove image from form state
                                  form.setValue(
                                    "images",
                                    images.filter((img) => img !== image),
                                  )
                                  toast.success("Image removed successfully")
                                } catch (error) {
                                  console.log(error)
                                  toast.error("Failed to remove image")
                                }
                              })
                            }}
                          >
                            <XIcon />
                          </Button>
                          <Image
                            src={image}
                            alt="product image"
                            width={200}
                            height={200}
                          />
                        </div>
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue("images", [...images, res[0].url])
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`)
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="upload-field">
          {/* isFeatured */}
          Featured Product
          <Card>
            <CardContent className="mt-2 space-y-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />

              {isFeatured && banner && (
                <div className="relative w-full rounded-sm">
                  <Button
                    type="button"
                    disabled={isPending}
                    variant="destructive"
                    className="absolute top-0 left-0 size-7 cursor-pointer"
                    onClick={() => {
                      startTransition(async () => {
                        try {
                          await axios.delete("/api/uploadthing", {
                            data: { url: banner }, // Send image URL to delete from storage
                          })
                          // Remove image from form state
                          form.setValue("banner", "")
                          toast.success("Image removed successfully")
                        } catch (error) {
                          console.log(error)
                          toast.error("Failed to remove image")
                        }
                      })
                    }}
                  >
                    <XIcon />
                  </Button>
                  <Image
                    src={banner}
                    alt="banner image"
                    className="w-full rounded-sm object-cover object-center"
                    width={1920}
                    height={680}
                  />
                </div>
              )}

              {isFeatured && !banner && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue("banner", res[0].url)
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`)
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
}
