import Link from "next/link";
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
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">{event.name}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant="secondary">{event.expenses.length} expenses</Badge>
          <p className="text-lg font-semibold text-primary">
            ${totalExpenses.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
