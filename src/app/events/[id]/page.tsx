import EventDetailClient from "@/components/event-detail-client";
import { db } from "@/lib/firebase";
import { Event } from "@/lib/types";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // This function runs on the server and does not have user authentication.
  // Therefore, we cannot fetch specific event data here due to security rules.
  // We will set a generic title and description, and the client component
  // will update the title dynamically after loading the event.
  return {
    title: "Event Details",
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
