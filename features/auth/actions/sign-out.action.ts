"use server"

import { signOut } from "@/auth"

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
