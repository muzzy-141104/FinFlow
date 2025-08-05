
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Download } from "lucide-react";
import { z } from "zod";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { doc, onSnapshot, addDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { type Event, type Expense, currencies, expenseCategories, EventWithSubcollections } from "@/lib/types";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddExpenseForm } from "./add-expense-form";
import { ExpensesTable } from "./expenses-table";
import { ExpenseChart } from "./expense-chart";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./loading-spinner";

const formSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters."),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0."),
  category: z.enum(expenseCategories),
  date: z.date(),
});

declare module "jspdf" {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }

export default function EventDetailClient({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<EventWithSubcollections | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoading(true);
    const eventRef = doc(db, "events", eventId);
    
    const unSubEvent = onSnapshot(eventRef, (doc) => {
        if (doc.exists()) {
            const eventData = { id: doc.id, ...doc.data() } as Event;
            const expensesQuery = collection(db, `events/${eventId}/expenses`);
            
            const unSubExpenses = onSnapshot(expensesQuery, (snapshot) => {
                const expensesData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
                setEvent({ ...eventData, expenses: expensesData });
                setIsLoading(false);
            });

            return () => unSubExpenses();
        } else {
            setEvent(null);
            setIsLoading(false);
        }
    }, (error) => {
        console.error("Error fetching event: ", error);
        setIsLoading(false);
        toast({ title: "Error", description: "Failed to fetch event data.", variant: "destructive" });
    });

    return () => unSubEvent();
  }, [eventId, toast]);

  const currencySymbol = useMemo(() => {
    if (!event) return '$';
    return currencies[event.currency]?.symbol || '$';
  }, [event]);


  const addExpense = async (values: z.infer<typeof formSchema>) => {
    if (!event) return;

    try {
        const expensesCollectionRef = collection(db, "events", eventId, "expenses");
        await addDoc(expensesCollectionRef, {
            ...values,
            date: values.date.toISOString(),
        });
        toast({
          title: "Expense Added",
          description: `"${values.description}" has been added to your event.`,
        });
    } catch (e) {
        console.error("Error adding expense: ", e);
        toast({
            title: "Error",
            description: "Could not add expense. Please try again.",
            variant: "destructive"
        })
    }
  };

  const deleteExpense = async (expenseId: string) => {
     if (!event) return;
     
     try {
        const expenseDocRef = doc(db, "events", eventId, "expenses", expenseId);
        await deleteDoc(expenseDocRef);
        toast({
            title: "Expense Deleted",
            description: "The expense has been removed from your event.",
            variant: "destructive"
        })
     } catch (e) {
        console.error("Error deleting expense: ", e);
        toast({
            title: "Error",
            description: "Could not delete expense. Please try again.",
            variant: "destructive"
        })
     }
  }

  const downloadPdf = () => {
    if(!event) return;
    const doc = new jsPDF();
    doc.text(`Expense Report for ${event.name}`, 14, 16);
    doc.autoTable({
        startY: 22,
        head: [['Date', 'Description', 'Category', 'Amount']],
        body: event.expenses
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(e => [
                format(new Date(e.date), 'PPP'),
                e.description,
                e.category,
                `${currencySymbol}${e.amount.toFixed(2)}`
            ]),
        foot: [['', 'Total', '', `${currencySymbol}${totalExpenses.toFixed(2)}`]],
        showFoot: 'last_page',
        headStyles: { fillColor: [41, 128, 185] },
        footStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });
    doc.save(`${event.name.toLowerCase().replace(/\s/g, '-')}-expenses.pdf`);
  };

  const totalExpenses = useMemo(() => {
    return event?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  }, [event]);

  if (isLoading) {
    return (
        <div className="text-center py-20 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
            <LoadingSpinner size="lg" />
            <h2 className="text-2xl font-semibold mb-2 mt-4">Loading Event...</h2>
            <p className="text-muted-foreground mb-4">
                Please wait while we load your event details.
            </p>
        </div>
      );
  }

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
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={downloadPdf}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <span className="text-muted-foreground">{currencySymbol}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencySymbol}{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Total amount spent for this event
            </p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:shadow-lg hover:-translate-y-1">
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
          <ExpensesTable expenses={event.expenses} onDeleteExpense={deleteExpense} currencySymbol={currencySymbol} />
        </div>
        <div className="lg:col-span-2 space-y-6">
            <ExpenseChart expenses={event.expenses} />
        </div>
      </div>
    </div>
  );
}
