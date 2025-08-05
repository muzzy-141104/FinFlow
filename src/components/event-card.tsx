
import Link from "next/link";
import Image from "next/image";
import { Event, currencies, Expense } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useCallback } from "react";
import { collection, onSnapshot, query, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { placeholderImages } from "@/lib/placeholders";

interface EventCardProps {
  event: Event;
  onDelete: (eventId: string) => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {
  const [expenseCount, setExpenseCount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // This useEffect hook will re-run whenever the event.id changes.
  useEffect(() => {
    // We define a query for the expenses subcollection of the specific event.
    const expensesQuery = query(collection(db, `events/${event.id}/expenses`));

    // onSnapshot listens for real-time updates to the query.
    // When the data changes (expense added/deleted), this function will re-run.
    const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
        const expensesData = snapshot.docs.map(doc => doc.data() as Omit<Expense, 'id'>);
        const total = expensesData.reduce((sum, expense) => sum + expense.amount, 0);
        
        setExpenseCount(snapshot.size);
        setTotalExpenses(total);
    }, (error) => {
        // It's better to log errors for debugging, even if they are handled.
        console.error(`Error fetching expenses for event ${event.id}:`, error);
    });

    // The cleanup function returned by useEffect.
    // It unsubscribes from the snapshot listener when the component unmounts
    // or when the event.id changes, preventing memory leaks.
    return () => unsubscribe();
  }, [event.id]);

  const currencySymbol = currencies[event.currency]?.symbol || '$';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden group relative">
         <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
         <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the event and all its expenses. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(event.id)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
      <Link href={`/events/${event.id}`} className="flex flex-col h-full">
        <div className="relative w-full h-56">
          <Image
            src={event.imageUrl || placeholderImages[0]}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="event cover photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="font-headline text-primary-foreground">{event.name}</CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2 text-gray-300">{event.description}</CardDescription>
          </div>
        </div>
        <CardFooter className="flex justify-between items-center p-4 mt-auto">
          <Badge variant="secondary">{expenseCount} expenses</Badge>
          <p className="text-lg font-semibold text-primary">
            {currencySymbol}{totalExpenses.toFixed(2)}
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}
