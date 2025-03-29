import { getAllCategories, getAllProducts } from "@/lib/actions/product.actions"

import { AppPagination } from "@/components/shared/app-pagination"

import { ProductCard } from "../product/[slug]/_components/product-card"
import { ActiveFilters } from "./_components/active-filters"
import { FilterSidebar } from "./_components/filter-sidebar"
import { SortSelect } from "./_components/sort-select"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await searchParams

  // Construct filter url
  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string
    p?: string
    s?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, category, price, rating, sort, page }

    if (c) params.category = c
    if (p) params.price = p
    if (s) params.sort = s
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const products = await getAllProducts({
    query: q,
    category,
    page: Number(page),
    price,
    rating,
    sort,
  })
  const categories = await getAllCategories()

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <FilterSidebar
        currentFilters={{ category, price, rating }}
        categories={categories}
        getFilterUrl={getFilterUrl}
      />

      <div className="space-y-4 md:col-span-4">
        <div className="flex-between my-4 flex-col md:flex-row">
          <ActiveFilters filters={{ q, category, price, rating }} />
          <div className="ml-auto">
            <SortSelect
              currentSort={sort}
              searchParams={{ q, category, price, rating, page }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 ? (
            <div>No products found</div>
          ) : (
            products.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {products.totalPages > 1 && (
          <AppPagination
            page={Number(page) || 1}
            totalPages={products?.totalPages}
          />
        )}
      </div>
    </div>
  )
}

// Keep your generateMetadata function the same
export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    price: string
    rating: string
  }>
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams

  const isQuerySet = q && q !== "all" && q.trim() !== ""
  const isCategorySet = category && category !== "all" && category.trim() !== ""
  const isPriceSet = price && price !== "all" && price.trim() !== ""
  const isRatingSet = rating && rating !== "all" && rating.trim() !== ""

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `
        Search ${isQuerySet ? q : ""} 
        ${isCategorySet ? `& Category ${category}` : ""}
        ${isPriceSet ? `& Price ${price}` : ""}
        ${isRatingSet ? `& Rating ${rating}` : ""}`,
    }
  } else {
    return {
      title: "Search Products",
    }
  }
}
