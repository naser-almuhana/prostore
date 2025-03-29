import Image from "next/image"
import Link from "next/link"

import { getAllCategories } from "@/lib/actions/product.actions"

import { APP_NAME } from "@/constants"

import { CategoryDrawer, Menu, Search } from "./components"

export async function Header() {
  const categories = await getAllCategories()
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="ml-3 hidden text-2xl font-bold lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search categories={categories} />
        </div>
        <Menu />
      </div>
    </header>
  )
}
