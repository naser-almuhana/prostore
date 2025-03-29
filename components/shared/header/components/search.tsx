"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Search({ categories }: { categories: { category: string }[] }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (category && category !== "all") params.set("category", category)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[300px]"
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  )
}
