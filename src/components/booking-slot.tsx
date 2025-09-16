import { Button } from "@/components/ui/button";

export function BookingSlot({ time, isFree, onSelect }: { time: string; isFree: boolean; onSelect: () => void }) {
  return (
    <Button variant={isFree ? "default" : "secondary"} disabled={!isFree} onClick={onSelect} className="w-full justify-between">
      <span>{time}</span>
      <span className="text-xs opacity-80">{isFree ? "Libre" : "Occupé"}</span>
    </Button>
  );
}
