"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

import { useFormStatus } from "react-dom"

import { signInWithCredentials } from "@/lib/actions/auth.actions"

import {
  // adminSignInDefaultValues,
  userSignInDefaultValues,
} from "@/constants"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={userSignInDefaultValues.email}
            // defaultValue={adminSignInDefaultValues.email}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={userSignInDefaultValues.password}
            // defaultValue={adminSignInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-destructive text-center">{data.message}</div>
        )}

        <div className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" target="_self" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm
