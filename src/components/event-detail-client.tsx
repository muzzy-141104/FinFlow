"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { z } from "zod";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { type Event, type Expense } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddExpenseForm } from "./add-expense-form";
import { ExpensesTable } from "./expenses-table";
import { ExpenseChart } from "./expense-chart";
import { useToast } from "@/hooks/use-toast";
import { MonthlyExpenseChart } from "./monthly-expense-chart";

const formSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters."),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  category: z.enum([
    "Travel",
    "Food",
    "Housing",
    "Shopping",
    "Entertainment",
    "Other",
  ]),
  date: z.date(),
});

export default function EventDetailClient({ eventId }: { eventId: string }) {
  const [events, setEvents] = useLocalStorage<Event[]>("events", []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const event = useMemo(
    () => events.find((e) => e.id === eventId),
    [events, eventId]
  );

  const addExpense = (values: z.infer<typeof formSchema>) => {
    if (!event) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...values,
      date: values.date.toISOString(),
    };

    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, expenses: [...e.expenses, newExpense] } : e
    );
    setEvents(updatedEvents);
    toast({
      title: "Expense Added",
      description: `"${newExpense.description}" has been added to your event.`,
    });
  };

  const deleteExpense = (expenseId: string) => {
     if (!event) return;
     const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, expenses: e.expenses.filter(exp => exp.id !== expenseId) } : e
    );
    setEvents(updatedEvents);
    toast({
        title: "Expense Deleted",
        description: "The expense has been removed from your event.",
        variant: "destructive"
    })
  }

  const totalExpenses = useMemo(() => {
    return event?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  }, [event]);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Event not found</h2>
        <p className="text-muted-foreground mb-4">
          The event you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" asChild className="-ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
            {event.name}
          </h1>
          <p className="text-muted-foreground">{event.description}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add a New Expense</DialogTitle>
            </DialogHeader>
            <AddExpenseForm
              onSave={addExpense}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <span className="text-muted-foreground">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total amount spent for this event
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of Expenses
            </CardTitle>
            <span className="text-muted-foreground">#</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{event.expenses.length}</div>
            <p className="text-xs text-muted-foreground">
              Total transactions recorded
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ExpensesTable expenses={event.expenses} onDeleteExpense={deleteExpense} />
        </div>
        <div className="lg:col-span-2 space-y-6">
            <ExpenseChart expenses={event.expenses} />
            <MonthlyExpenseChart expenses={event.expenses} />
        </div>
      </div>
    </div>
  );
}
