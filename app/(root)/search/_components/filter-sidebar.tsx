import { PRICES, RATINGS } from "@/constants"

import { FilterSection } from "./filter-section"

interface FilterSidebarProps {
  currentFilters: {
    category: string
    price: string
    rating: string
  }
  categories: { category: string }[]
  getFilterUrl: (params: { c?: string; p?: string; r?: string }) => string
}

export function FilterSidebar({
  currentFilters,
  categories,
  getFilterUrl,
}: FilterSidebarProps) {
  return (
    <div className="py-4">
      <FilterSection
        title="Categories"
        items={categories.map((c) => ({ name: c.category, value: c.category }))}
        currentValue={currentFilters.category}
        paramKey="c"
        getFilterUrl={getFilterUrl}
      />
      <FilterSection
        title="Price"
        items={PRICES}
        currentValue={currentFilters.price}
        paramKey="p"
        getFilterUrl={getFilterUrl}
      />
      <FilterSection
        title="Ratings"
        items={RATINGS.map((r) => ({
          name: `${r} stars & up`,
          value: r.toString(),
        }))}
        currentValue={currentFilters.rating}
        paramKey="r"
        getFilterUrl={getFilterUrl}
      />
    </div>
  )
}
