import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const threadId = url.searchParams.get("thread");
  if (!threadId) return NextResponse.json({ messages: [] });
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("messages")
    .select("id, content, created_at")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  return NextResponse.json({ messages: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  const { data, error } = await supabase
    .from("messages")
    .insert({ thread_id: body.thread_id, content: body.content, author_id: userId })
    .select("id, content, created_at")
    .single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, message: data });
}


