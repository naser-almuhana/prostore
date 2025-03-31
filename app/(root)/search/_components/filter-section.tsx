import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FilterSectionProps {
  title: string
  items: { name: string; value: string }[]
  currentValue: string
  paramKey: "c" | "p" | "r"
  getFilterUrl: (params: { c?: string; p?: string; r?: string }) => string
}

export function FilterSection({
  title,
  items,
  currentValue,
  paramKey,
  getFilterUrl,
}: FilterSectionProps) {
  return (
    <Accordion type="multiple" defaultValue={[paramKey]}>
      <AccordionItem value={paramKey}>
        <AccordionTrigger defaultValue={"open"} className="cursor-pointer">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1">
            <li>
              <Link
                className={`hover:bg-muted text-muted-foreground block rounded p-1 transition ${
                  currentValue === "all" && "text-primary font-bold"
                }`}
                href={getFilterUrl({ [paramKey]: "all" })}
              >
                All
              </Link>
            </li>
            {items.map((item) => (
              <li key={item.value}>
                <Link
                  className={`hover:bg-muted text-muted-foreground block rounded p-1 transition ${
                    currentValue === item.value && "text-primary font-bold"
                  }`}
                  href={getFilterUrl({ [paramKey]: item.value })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
