import type { Metadata } from "next"

import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

import { ProfileForm } from "./_components/profile-form"

export const metadata: Metadata = {
  title: "My Profile",
}

export default async function ProfilePage() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className="mx-auto max-w-md space-y-4">
        <h2 className="h2-bold">Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  )
}
