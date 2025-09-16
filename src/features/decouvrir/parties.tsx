import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PartyCard } from "@/components/party-card";

export async function PartiesList({
  searchParams,
}: {
  searchParams?: { date?: string; slot?: string; level?: string; city?: string };
}) {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("matches")
    .select("id, date, start_time, duration_minutes, level_min, level_max, clubs(name) : club_id")
    .order("date", { ascending: true });

  if (searchParams?.level) {
    // simple client-side filter will be applied after fetch for brevity
  }

  const { data } = await query.limit(20);

  return (
    <div className="grid gap-4">
      {data?.map((m) => (
        <PartyCard
          key={m.id}
          club={(m as any).clubs?.name ?? "Club"}
          time={`${m.date} ${String(m.start_time).slice(0, 5)}`}
          remaining={4}
          level={`${(m as any).level_min}–${(m as any).level_max}`}
        />
      )) || <div className="text-sm text-muted-foreground">Aucune partie.</div>}
    </div>
  );
}


