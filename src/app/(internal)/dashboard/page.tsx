import { KPIGrid } from "@/components/kpis";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard (interne)</h1>
      <KPIGrid items={[
        { title: "Matches à venir", value: 3 },
        { title: "Matches créés", value: 7 },
        { title: "Réservations", value: 12 },
        { title: "Messages non lus", value: 5 },
      ]} />
      <div className="rounded border p-6 text-sm text-muted-foreground">Graphique activité 30 jours (stub)</div>
    </div>
  );
}
