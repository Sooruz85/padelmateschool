import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function ThreadList() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("threads")
    .select("id, is_dm, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <ul className="space-y-2">
      {data?.map((t) => (
        <li key={t.id} className="text-sm">
          <Link href={`/messages/${t.id}`} className="underline">Fil {t.is_dm ? "DM" : "Match"} – {new Date(t.created_at as any).toLocaleString()}</Link>
        </li>
      )) || <li className="text-sm text-muted-foreground">Aucun fil.</li>}
    </ul>
  );
}


