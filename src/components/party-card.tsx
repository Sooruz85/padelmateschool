import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PartyCardProps = {
  club: string;
  time: string;
  remaining: number;
  level: string;
};

export function PartyCard({ club, time, remaining, level }: PartyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{club}</span>
          <span className="text-sm text-muted-foreground">{time}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Places: {remaining}/4 · Niveau: {level}</div>
        <Button size="sm">Rejoindre</Button>
      </CardContent>
    </Card>
  );
}
