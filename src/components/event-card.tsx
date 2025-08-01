import Link from "next/link";
import Image from "next/image";
import { Event } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const totalExpenses = event.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={event.imageUrl || "https://placehold.co/600x400.png"}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="event cover photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <CardTitle className="font-headline text-primary-foreground">{event.name}</CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2 text-gray-300">{event.description}</CardDescription>
          </div>
        </div>
        <CardFooter className="flex justify-between items-center p-4 bg-card">
          <Badge variant="secondary">{event.expenses.length} expenses</Badge>
          <p className="text-lg font-semibold text-primary">
            ${totalExpenses.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
