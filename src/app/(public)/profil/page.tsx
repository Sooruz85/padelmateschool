import { ProfileView } from "@/features/profil/profile-view";

export default function ProfilPage() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      <ProfileView />
    </div>
  );
}
