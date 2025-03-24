import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found",
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader className="flex flex-col items-center p-6">
          <Image
            src="/images/logo.svg"
            width={48}
            height={48}
            alt="App Logo"
            priority={true}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold sm:text-3xl">Not Found</h1>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Could not find requested page</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/">Back To Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
