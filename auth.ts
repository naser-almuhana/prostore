import { cookies } from "next/headers"

import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/db/prisma"

import { compare } from "@/features/auth/lib/encrypt"

import { authConfig } from "./auth.config"

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        })

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = await compare(
            credentials.password as string,
            user.password,
          )

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        // If user does not exist or password does not match return null
        return null
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }) {
      // Set the user ID from the token
      session.user.id = token.sub ?? ""
      session.user.role = token.role as string
      session.user.name = token.name

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name
      }

      return session
    },
    async jwt({ token, user, trigger, session }) {
      // Assign user fields to token
      if (user) {
        token.id = user.id
        if ("role" in user) {
          token.role = user.role
        }

        // If user has no name then use the email
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0]

          // Update database to reflect the token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          })
        }

        if (trigger === "signIn" || trigger === "signUp") {
          const cookiesObject = await cookies()
          const sessionCartId = cookiesObject.get("sessionCartId")?.value
          console.log({ sessionCartId })
          if (sessionCartId) {
            try {
              // Use transaction to ensure atomic operations
              await prisma.$transaction(async (tx) => {
                // 1. Find the session cart
                const sessionCart = await tx.cart.findFirst({
                  where: { sessionCartId },
                })

                if (!sessionCart) return

                // 2. Delete any existing user cart
                await tx.cart.deleteMany({
                  where: { userId: user.id },
                })

                // 3. Update the session cart to belong to the user
                await tx.cart.update({
                  where: { id: sessionCart.id },
                  data: {
                    userId: user.id,
                    sessionCartId,
                  },
                })
              })
            } catch (error) {
              console.error("Failed to migrate cart:", error)
              // Fail silently - the user can still proceed
            }
          }
        }
      }

      // Handle session updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name
      }

      return token
    },
  },
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(config)
