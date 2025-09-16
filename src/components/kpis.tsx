import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KPI({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  );
}

export function KPIGrid({ items }: { items: Array<{ title: string; value: string | number }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k, i) => (
        <KPI key={i} title={k.title} value={k.value} />
      ))}
    </div>
  );
}
