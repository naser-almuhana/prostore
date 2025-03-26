"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { formUrlQuery } from "@/lib/form-url-query"
import { cn } from "@/lib/utils"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationProps = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

export function AppPagination({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const intPage = Number(page)

  const handleClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1

    console.log(pageValue)
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    })

    router.push(newUrl)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleClick("prev")}
            aria-disabled={intPage <= 1}
            tabIndex={intPage <= 1 ? -1 : undefined}
            className={cn(
              "cursor-pointer",
              intPage <= 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => handleClick("next")}
            aria-disabled={intPage >= totalPages}
            tabIndex={intPage >= totalPages ? -1 : undefined}
            className={cn(
              "cursor-pointer",
              intPage >= totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
