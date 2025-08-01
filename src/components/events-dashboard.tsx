"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { z } from "zod";

import { useLocalStorage } from "@/hooks/use-local-storage";
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

const currencyKeys = Object.keys(currencies) as [Currency, ...Currency[]];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  currency: z.enum(currencyKeys),
});

export function EventsDashboard() {
  const [events, setEvents] = useLocalStorage<Event[]>("events", []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  const addEvent = (values: z.infer<typeof formSchema>) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description || "",
      imageUrl: values.imageUrl,
      currency: values.currency,
      expenses: [],
    };
    setEvents([...events, newEvent]);
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
            <EventCard key={event.id} event={event} />
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
