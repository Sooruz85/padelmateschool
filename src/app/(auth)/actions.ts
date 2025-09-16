"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: error.message } as const;
  }
  redirect("/decouvrir");
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const username = String(formData.get("username") || email.split("@")[0]).trim();
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { ok: false, error: error.message } as const;
  }
  const userId = data.user?.id;
  if (userId) {
    const { error: upsertErr } = await supabase.from("profiles").upsert({
      id: userId,
      username,
    });
    if (upsertErr) {
      return { ok: false, error: upsertErr.message } as const;
    }
  }
  redirect("/decouvrir");
}

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/signin");
}
