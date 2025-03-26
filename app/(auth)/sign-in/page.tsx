import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { auth } from "@/auth"

import { APP_NAME } from "@/constants"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CredentialsSignInForm from "./_components/credentials-signin-form"

export const metadata: Metadata = {
  title: "Sign In",
}

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl: string
  }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams

  const session = await auth()

  if (session) {
    return redirect(callbackUrl || "/")
  }

  return (
    <div className="mx-auto w-full max-w-md px-3 sm:px-0">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
