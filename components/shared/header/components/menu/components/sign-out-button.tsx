"use client"

import { signOutUser } from "@/lib/actions/auth.actions"

import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const handleClick = async () => {
    await signOutUser()
  }
  return (
    <Button
      className="h-4 w-full justify-start px-2 py-4"
      variant="ghost"
      onClick={handleClick}
    >
      Sign Out
    </Button>
  )
}
