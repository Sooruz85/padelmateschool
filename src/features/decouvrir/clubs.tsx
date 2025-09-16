import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ClubCard } from "@/components/club-card";

export async function ClubsList() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("clubs")
    .select("id, name, city, indoor, courts, price_per_hour, rating")
    .order("rating", { ascending: false })
    .limit(20);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data?.map((c) => (
        <ClubCard
          key={c.id}
          name={c.name}
          city={c.city}
          courts={c.courts}
          indoor={c.indoor}
          price={Number(c.price_per_hour)}
          rating={Number(c.rating)}
        />
      )) || <div className="text-sm text-muted-foreground">Aucun club.</div>}
    </div>
  );
}


