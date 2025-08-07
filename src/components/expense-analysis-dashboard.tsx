
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  format,
  parseISO,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";
import type { Expense, Event } from "@/lib/types";
import { AlertTriangle, TrendingUp, Wallet } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "./loading-spinner";
import { useToast } from "@/hooks/use-toast";


const chartConfig = {
  total: {
    label: "Total Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Period = "daily" | "weekly" | "monthly" | "yearly";

export function ExpenseAnalysisDashboard() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [period, setPeriod] = React.useState<Period>("monthly");
  const { user } = useAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setEvents([]);
      setExpenses([]);
      return;
    };

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const eventsQuery = query(collection(db, "events"), where("userId", "==", user.uid));
            const eventsSnapshot = await getDocs(eventsQuery);
            const userEvents = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
            setEvents(userEvents);

            if (userEvents.length === 0) {
              setExpenses([]);
              setIsLoading(false);
              return;
            }
            
            let allExpensesData: Expense[] = [];
            // This is safer than a collection group query if indexes aren't guaranteed.
            // It makes N+1 queries (1 for events, N for each event's expenses).
            // For a large number of events, this could be slow, but it is reliable.
            for (const event of userEvents) {
              const expensesCol = collection(db, "events", event.id, "expenses");
              const expensesSnap = await getDocs(expensesCol);
              expensesSnap.forEach(doc => {
                allExpensesData.push({ id: doc.id, ...doc.data() } as Expense);
              });
            }
            setExpenses(allExpensesData);

        } catch (error: any) {
            // Ignore permission errors that can happen during logout.
            if (error.code !== 'permission-denied') {
              console.error("Error fetching analytics data:", error);
              toast({
                  title: "Error",
                  description: "Failed to load analytics data.",
                  variant: "destructive"
              });
            }
        } finally {
            setIsLoading(false);
        }
    }
    fetchAllData();
  }, [user, toast]);

  const chartData = React.useMemo(() => {
    if (expenses.length === 0) return [];

    const dataMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const date = parseISO(expense.date);
      let key = "";
      if (period === "daily") {
        key = format(date, "yyyy-MM-dd");
      } else if (period === "weekly") {
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        key = format(weekStart, "yyyy-MM-dd");
      } else if (period === "monthly") {
        key = format(date, "MMM yyyy");
      } else if (period === "yearly") {
        key = format(date, "yyyy");
      }
      dataMap.set(key, (dataMap.get(key) || 0) + expense.amount);
    });
    
    const sortedData = Array.from(dataMap.entries())
        .map(([date, total]) => ({ date, total }))
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (period === 'daily') {
        return sortedData.map(d => ({ ...d, date: format(parseISO(d.date), "MMM d, yyyy")}));
    }
    if (period === 'weekly') {
        return sortedData.map(d => ({ ...d, date: `Week of ${format(parseISO(d.date), "MMM d")}`}));
    }
    return sortedData;

  }, [expenses, period]);


  if (isLoading) {
    return (
        <div className="text-center py-20 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
            <LoadingSpinner size="lg" />
            <h2 className="text-2xl font-semibold mb-2 mt-4">Loading Analytics...</h2>
            <p className="text-muted-foreground mb-4">
                Crunching the numbers, please wait.
            </p>
        </div>
    );
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

      <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200 [&>svg]:text-amber-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Mixed Currency Warning</AlertTitle>
        <AlertDescription>
            This chart sums expense amounts directly without currency conversion. Totals may be misleading if your events use different currencies.
        </AlertDescription>
      </Alert>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className="text-xs text-muted-foreground">
                Number of events you've created
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{expenses.length}</div>
                <p className="text-xs text-muted-foreground">
                Expenses recorded across all events
                </p>
            </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Spending Over Time</CardTitle>
            <CardDescription>
              View your spending aggregated by {period}.
            </CardDescription>
          </div>
          <Select onValueChange={(value: Period) => setPeriod(value)} defaultValue={period}>
              <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
             <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                    top: 10
                }}
                >
                <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value, index) => {
                      if (period === 'daily' && chartData.length > 10) {
                        return index % Math.ceil(chartData.length / 10) === 0 ? value : '';
                      }
                      return value;
                    }}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) =>
                        typeof value === 'number' ? value.toLocaleString() : value
                    }
                    width={80}
                />
                <Tooltip
                    content={
                    <ChartTooltipContent
                        indicator="dot"
                        formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value }
                    />
                    }
                />
                <Area
                    dataKey="total"
                    type="monotone"
                    fill="url(#colorTotal)"
                    stroke="var(--color-total)"
                    strokeWidth={2}
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
