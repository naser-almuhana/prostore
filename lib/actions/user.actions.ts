"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"

import { signIn, signOut } from "@/auth"

import { prisma } from "@/db/prisma"

import { hash } from "@/lib/encrypt"
import { formatError } from "@/lib/utils"
import { signInFormSchema, signUpFormSchema } from "@/lib/validators"

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
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

// Sign user out
export async function signOutUser() {
  // get current users cart and delete it so it does not persist to next user
  //   const currentCart = await getMyCart()

  //   if (currentCart?.id) {
  //     await prisma.cart.delete({ where: { id: currentCart.id } })
  //   } else {
  //     console.warn("No cart found for deletion.")
  //   }
  await signOut()
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
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
