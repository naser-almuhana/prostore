// components/admin/stat-card.tsx
import * as Icons from "lucide-react"

import { IconType } from "@/types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  value: number | string
  icon: IconType
}

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  const IconComponent = Icons[icon.name] as Icons.LucideIcon

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
