"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"

import { signIn } from "@/auth"

import { ActionReturn } from "@/types"

import { prisma } from "@/db/prisma"

import { formatError } from "@/lib/utils"

import { hash } from "@/features/auth/lib/encrypt"
import { signUpFormSchema } from "@/features/auth/schemas/sign-up.schema"

// Sign up user
export async function signUpUser(
  prevState: unknown,
  formData: FormData,
): ActionReturn {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    })

    const plainPassword = user.password

    user.password = await hash(user.password)

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    })

    return { success: true, message: "User registered successfully" }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: formatError(error) }
  }
}
