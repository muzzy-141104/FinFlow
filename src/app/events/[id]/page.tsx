import EventDetailClient from "@/components/event-detail-client";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // This function runs on the server and does not have user authentication.
  // Therefore, we cannot fetch specific event data here due to security rules.
  // We return a generic title, and the client component will update it dynamically
  // after securely loading the event data.
  return {
    title: "Event Details | FinFlow",
    description: "View and manage the expenses for your event.",
  };
}


export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <EventDetailClient eventId={params.id} />
    </div>
  );
}
