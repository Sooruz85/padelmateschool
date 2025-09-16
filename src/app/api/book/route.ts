import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseServerClient();
  const { data: session } = await supabase.auth.getUser();
  const userId = session.user?.id;
  if (!userId) return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });

  const { error } = await supabase.from("bookings").insert({ ...body, profile_id: userId });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}


