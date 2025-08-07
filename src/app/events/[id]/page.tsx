
import EventDetailClient from "@/components/event-detail-client";
import { getAdminDb } from "@/lib/firebase-admin";
import { type Event } from "@/lib/types";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const adminDb = getAdminDb();
    const eventRef = adminDb.collection("events").doc(params.id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return {
        title: "Event Not Found",
        description: "The event you are looking for does not exist.",
      };
    }

    const event = eventDoc.data() as Event;
    return {
      title: `${event.name} | FinFlow`,
      description: `View and manage expenses for ${event.name}. ${event.description}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Return a generic title if there's an error (e.g., config issue)
    return {
      title: "Event Details | FinFlow",
      description: "View and manage the expenses for your event.",
    };
  }
}


export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <EventDetailClient eventId={params.id} />
    </div>
  );
}
