"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signUpUser } from "@/features/auth/actions/sign-up.action"

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const SignUpButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            // defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            // defaultValue={signUpDefaultValues.email}
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
            // defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            // defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-destructive text-center">{data.message}</div>
        )}

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self" className="link">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUpForm
