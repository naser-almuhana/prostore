import { notFound } from "next/navigation"

import { getUserById } from "@/lib/actions/users.actions"
import { requireAdmin } from "@/lib/auth-guard"

import { UpdateUserForm } from "../_components/update-user-form"

interface AdminUserUpdatePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminUserUpdatePage(
  props: AdminUserUpdatePageProps,
) {
  await requireAdmin()

  const { id } = await props.params

  const user = await getUserById(id)

  if (!user) notFound()

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  )
}
