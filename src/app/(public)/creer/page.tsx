import { CreateMatchForm } from "@/features/creer/create-match-form";

export default function CreerPage() {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Créer une partie</h1>
      <CreateMatchForm />
    </div>
  );
}
