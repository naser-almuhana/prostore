import Image from "next/image"
import Link from "next/link"

import { APP_NAME } from "@/constants"

import { Menu } from "@/components/shared/header/components/menu"

import { MainNav } from "./_components/main-nav"

export default function UserLayout({
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
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Menu />
            </div>
          </div>
        </div>

        <div className="container mx-auto flex-1 space-y-4 p-8 pt-6">
          {children}
        </div>
      </div>
    </>
  )
}
