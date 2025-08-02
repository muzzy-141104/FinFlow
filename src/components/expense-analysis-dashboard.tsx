
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  format,
  parseISO,
  startOfWeek,
  startOfMonth,
  startOfYear,
  getWeek,
  getYear,
} from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";
import type { Expense } from "@/lib/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


const chartConfig = {
  total: {
    label: "Total Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Period = "weekly" | "monthly" | "yearly";

export function ExpenseAnalysisDashboard() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [period, setPeriod] = React.useState<Period>("monthly");
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    };

    const fetchAllExpenses = async () => {
        setIsLoading(true);
        const eventsQuery = query(collection(db, "events"), where("userId", "==", user.uid));
        const eventsSnapshot = await getDocs(eventsQuery);
        let allExpenses: Expense[] = [];

        for (const eventDoc of eventsSnapshot.docs) {
            const expensesQuery = collection(db, `events/${eventDoc.id}/expenses`);
            const expensesSnapshot = await getDocs(expensesQuery);
            const eventExpenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
            allExpenses = [...allExpenses, ...eventExpenses];
        }

        setExpenses(allExpenses);
        setIsLoading(false);
    }
    fetchAllExpenses();
  }, [user]);

  const chartData = React.useMemo(() => {
    if (expenses.length === 0) return [];

    const dataMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const date = parseISO(expense.date);
      let key = "";
      if (period === "weekly") {
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        key = format(weekStart, "yyyy-MM-dd");
      } else if (period === "monthly") {
        key = format(date, "MMM yyyy");
      } else if (period === "yearly") {
        key = format(date, "yyyy");
      }

      dataMap.set(key, (dataMap.get(key) || 0) + expense.amount);
    });
    
    return Array.from(dataMap.entries())
        .map(([date, total]) => ({ date, total }))
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  }, [expenses, period]);

  const totalSpent = React.useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  if (isLoading) {
    return <div className="text-center py-20">Loading expense data...</div>;
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
            <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
                Expense Analysis
            </h1>
            <p className="text-muted-foreground">
                An overview of all your spending across all events.
            </p>
            </div>
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">All-Time Total</CardTitle>
                <span className="text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                Total amount spent across all events
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <span className="text-muted-foreground">#</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{expenses.length}</div>
                <p className="text-xs text-muted-foreground">
                Total number of expenses recorded
                </p>
            </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Spending Over Time</CardTitle>
            <CardDescription>
              View your spending aggregated by {period}.
            </CardDescription>
          </div>
          <Select onValueChange={(value: Period) => setPeriod(value)} defaultValue={period}>
              <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
             <AreaChart
               accessibilityLayer
               data={chartData}
               margin={{
                 left: 12,
                 right: 12,
               }}
             >
               <CartesianGrid vertical={false} />
               <XAxis
                 dataKey="date"
                 tickLine={false}
                 axisLine={false}
                 tickMargin={8}
                 tickFormatter={(value) => {
                    if (period === 'weekly') {
                        return `Week of ${format(parseISO(value), "MMM d")}`;
                    }
                    return value;
                 }}
               />
               <YAxis
                 tickFormatter={(value) => `$${value}`}
                 tickCount={5}
               />
               <Tooltip
                 content={
                   <ChartTooltipContent
                     indicator="dot"
                     formatter={(value, name) => `$${(value as number).toFixed(2)}`}
                   />
                 }
               />
               <Area
                 dataKey="total"
                 type="natural"
                 fill="var(--color-total)"
                 fillOpacity={0.3}
                 stroke="var(--color-total)"
                 stackId="a"
               />
             </AreaChart>
           </ChartContainer>
          ) : (
            <div className="text-center py-20">
                <h3 className="text-xl font-semibold">No Expense Data</h3>
                <p className="text-muted-foreground mt-2">
                    Once you add expenses to your events, your spending chart will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

