import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function ProfileView() {
  const supabase = createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return <div className="text-sm text-muted-foreground">Connectez-vous.</div>;
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, level, city, is_premium")
    .eq("id", userId)
    .single();

  return (
    <div className="space-y-2 text-sm">
      <div><span className="font-medium">Utilisateur:</span> {profile?.username}</div>
      <div><span className="font-medium">Niveau:</span> {profile?.level}</div>
      <div><span className="font-medium">Ville:</span> {profile?.city}</div>
      <div><span className="font-medium">Offre:</span> {profile?.is_premium ? "Premium" : "Standard"}</div>
    </div>
  );
}


