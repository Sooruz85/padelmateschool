"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env manquantes (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)");
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
