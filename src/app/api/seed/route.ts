import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createSupabaseServerClient();
  try {
    const clubs = [
      { name: "Padel Bordeaux Chartrons", city: "BORDEAUX", indoor: true, courts: 8, price_per_hour: 24.0, rating: 4.6 },
      { name: "Arcachon Padel Club", city: "BORDEAUX", indoor: false, courts: 6, price_per_hour: 22.0, rating: 4.5 },
      { name: "Toulouse Padel Arena", city: "TOULOUSE", indoor: true, courts: 10, price_per_hour: 26.0, rating: 4.7 },
      { name: "Biarritz Padel Côte Basque", city: "BORDEAUX", indoor: false, courts: 5, price_per_hour: 25.0, rating: 4.6 },
      { name: "Montpellier Sud Padel", city: "MONTPELLIER", indoor: true, courts: 9, price_per_hour: 25.0, rating: 4.5 },
    ];

    const { error } = await supabase.from("clubs").upsert(clubs, { onConflict: "name" });
    if (error) throw error;
    return NextResponse.json({ ok: true, inserted: clubs.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
