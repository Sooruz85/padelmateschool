import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseServerClient();
  const { data: session } = await supabase.auth.getUser();
  const userId = session.user?.id;
  if (!userId) return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });

  const { data, error } = await supabase
    .from("matches")
    .insert({ ...body, owner_id: userId })
    .select("id")
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

  await supabase.from("match_players").insert({ match_id: data.id, profile_id: userId });
  return NextResponse.json({ ok: true, id: data.id });
}


