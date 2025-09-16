"use client";

import { HOURS, formatSlot } from "@/lib/slots";
import { BookingSlot } from "@/components/booking-slot";
import { useState } from "react";
import { toast } from "sonner";

export function BookingView() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [clubId, setClubId] = useState<string>("");

  async function reserveAt(time: string) {
    const res = await fetch("/api/book", { method: "POST", body: JSON.stringify({ club_id: clubId, date, start_time: time, duration_minutes: 60 }) });
    const json = await res.json();
    if (json.ok) toast.success("Créneau réservé"); else toast.error(json.error || "Erreur");
  }

  return (
    <div className="space-y-3">
      <input className="border rounded px-2 py-1" value={clubId} onChange={(e) => setClubId(e.target.value)} placeholder="Club ID" />
      <input className="border rounded px-2 py-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <div className="grid gap-2 sm:grid-cols-2">
        {HOURS.map((h) => {
          const t = formatSlot(h);
          return <BookingSlot key={t} time={t} isFree={true} onSelect={() => reserveAt(t)} />;
        })}
      </div>
    </div>
  );
}


