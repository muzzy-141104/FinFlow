import EventDetailClient from "@/components/event-detail-client";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <EventDetailClient eventId={params.id} />
    </div>
  );
}
