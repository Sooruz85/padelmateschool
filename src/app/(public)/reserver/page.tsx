import { BookingView } from "@/features/reserver/booking-view";

export default function ReserverPage() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Réserver</h1>
      <BookingView />
    </div>
  );
}
