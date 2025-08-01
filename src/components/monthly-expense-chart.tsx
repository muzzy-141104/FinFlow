"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, getMonth, parseISO } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type Expense } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyExpenseChart({ expenses }: { expenses: Expense[] }) {
  const chartData = React.useMemo(() => {
    if (expenses.length === 0) return [];
    
    const monthlyTotals = expenses.reduce((acc, expense) => {
      const date = parseISO(expense.date);
      const monthName = format(date, "MMM");
      acc[monthName] = (acc[monthName] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Ensure we have data for all past months of the current year up to the last expense
    const currentYear = new Date().getFullYear();
    const lastExpenseDate = expenses.map(e => parseISO(e.date)).sort((a,b) => b.getTime() - a.getTime())[0] || new Date();
    const lastMonth = getMonth(lastExpenseDate);

    const allMonthsData = Array.from({ length: lastMonth + 1 }, (_, i) => {
        const monthName = format(new Date(currentYear, i), "MMM");
        return {
            month: monthName,
            total: monthlyTotals[monthName] || 0,
        }
    })

    return allMonthsData;

  }, [expenses]);


  if (expenses.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expense Comparison</CardTitle>
        <CardDescription>Total expenses per month for the current year.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
             <YAxis
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
