import Image from "next/image"
import Link from "next/link"

import { ADMIN_LINKS, APP_NAME } from "@/constants"

import { Menu } from "@/components/shared/header/components/menu"
import { MainNav } from "@/components/shared/nav-main"

import AdminSearch from "./_components/admin-search"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="flex flex-col">
        <div className="container mx-auto border-b">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="w-22">
              <Image
                src="/images/logo.svg"
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            <MainNav links={ADMIN_LINKS} className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <AdminSearch />
              <Menu />
            </div>
          </div>
        </div>

        <div className="container mx-auto flex-1 space-y-4 px-6 pt-6 pb-8">
          {children}
        </div>
      </div>
    </>
  )
}
