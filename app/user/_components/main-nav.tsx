"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { cn } from "@/lib/utils"

const links = [
  {
    title: "Profile",
    href: "/user/profile",
  },
  {
    title: "Orders",
    href: "/user/orders",
  },
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "hover:text-primary text-sm font-medium transition-colors",
            pathname.includes(item.href) ? "" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
