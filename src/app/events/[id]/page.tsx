import EventDetailClient from "@/components/event-detail-client";
import { db } from "@/lib/firebase";
import { Event } from "@/lib/types";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventId = params.id;
  try {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      return {
        title: "Event Not Found",
        description: "The requested event does not exist.",
      };
    }

    const event = eventSnap.data() as Event;
    return {
      title: event.name,
      description: `Track and manage expenses for ${event.name}. ${event.description}`,
      openGraph: {
        title: event.name,
        description: `Track and manage expenses for ${event.name}.`,
        images: [
          {
            url: event.imageUrl || '/placeholders/event-1.jpg',
            width: 1200,
            height: 630,
            alt: event.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching event for metadata:", error);
    return {
      title: "Error",
      description: "There was an error loading event details.",
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
