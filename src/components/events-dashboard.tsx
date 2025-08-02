"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { collection, addDoc, query, where, onSnapshot, DocumentData, collectionGroup, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";

import { type Event, type Currency, currencies } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEventForm } from "./add-event-form";
import { EventCard } from "./event-card";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const currencyKeys = Object.keys(currencies) as [Currency, ...Currency[]];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  currency: z.enum(currencyKeys),
});

export function EventsDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
        setEvents([]);
        setIsLoading(false);
        return;
    };

    setIsLoading(true);
    const q = query(collection(db, "events"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userEvents: Event[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
            userEvents.push({ id: doc.id, ...doc.data() } as Event);
        });
        setEvents(userEvents);
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching events: ", error);
        toast({ title: "Error", description: "Could not fetch events.", variant: "destructive" });
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user, toast]);


  const addEvent = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    try {
        const docRef = await addDoc(collection(db, "events"), {
            userId: user.uid,
            name: values.name,
            description: values.description || "",
            imageUrl: values.imageUrl,
            currency: values.currency,
        });
        toast({ title: "Event Created", description: `"${values.name}" has been created.` });
    } catch(e) {
        console.error("Error adding document: ", e);
        toast({ title: "Error", description: "Could not create event.", variant: "destructive" });
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      // Delete all expenses in the subcollection first
      const expensesQuery = query(collection(db, `events/${eventId}/expenses`));
      const expensesSnapshot = await getDocs(expensesQuery);
      const batch = expensesSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(batch);

      // Then delete the event itself
      await deleteDoc(doc(db, "events", eventId));

      toast({ title: "Event Deleted", description: "The event and all its expenses have been deleted." });
    } catch (error) {
      console.error("Error deleting event: ", error);
      toast({ title: "Error", description: "Could not delete event.", variant: "destructive" });
    }
  };


  if (isLoading) {
    return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">Loading Events...</h2>
          <p className="text-muted-foreground mb-4">
            Please wait while we load your events.
          </p>
        </div>
      );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">
            Your Events
          </h1>
          <p className="text-muted-foreground">
            Create and manage your expense events.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Event</DialogTitle>
            </DialogHeader>
            <AddEventForm
              onSave={addEvent}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 border-2 border-dashed rounded-lg">
          <Image
            src="https://placehold.co/400x300.png"
            alt="No events"
            width={400}
            height={300}
            className="mx-auto mb-6 rounded-lg"
            data-ai-hint="empty state illustration"
          />
          <h2 className="text-2xl font-semibold font-headline mb-2">No Events Yet</h2>
          <p className="text-muted-foreground mb-6">
            Click "New Event" to start tracking your expenses.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
              </DialogHeader>
              <AddEventForm
                onSave={addEvent}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
