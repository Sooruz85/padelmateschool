import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClubCardProps = {
  name: string;
  city: string;
  courts: number;
  indoor: boolean;
  price: number;
  rating: number;
};

export function ClubCard({ name, city, courts, indoor, price, rating }: ClubCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-muted-foreground">{city}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex items-center gap-4">
        <span>{courts} terrains</span>
        <span>{indoor ? "Indoor" : "Outdoor"}</span>
        <span>{price.toFixed(2)} €/h</span>
        <span>⭐ {rating.toFixed(1)}</span>
      </CardContent>
    </Card>
  );
}
