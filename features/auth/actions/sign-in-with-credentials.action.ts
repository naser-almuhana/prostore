"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"

import { signIn } from "@/auth"

import { ActionReturn } from "@/types"

import { signInFormSchema } from "@/features/auth/schemas/sign-in.schema"

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
): ActionReturn {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    await signIn("credentials", user)

    return { success: true, message: "Signed in successfully" }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: "Invalid email or password" }
  }
}
