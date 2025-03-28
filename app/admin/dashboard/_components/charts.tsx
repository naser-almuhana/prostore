"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { SalesDataType } from "@/types"

interface ChartsProps {
  data: { salesData: SalesDataType }
}

export function Charts({ data: { salesData } }: ChartsProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <XAxis
          dataKey="month"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "currentColor" }} // ✅ Ensures Tailwind applies color
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          tick={{ fill: "currentColor" }} // ✅ Ensures Tailwind applies color
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-muted rounded-md border p-2">
                  <p className="label">{`${label}`}</p>
                  <p className="desc">Total sales: {`$${payload[0].value}`}</p>
                </div>
              )
            }

            return null
          }}
        />
        <Bar
          dataKey="totalSales"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-muted-foreground shadow"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
