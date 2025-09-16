"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const schema = z.object({
  club_id: z.string().min(1),
  date: z.string().min(1),
  start_time: z.string().min(1),
  duration_minutes: z.enum(["60", "90"]).transform((v) => Number(v)),
  level_min: z.enum(["DEBUTANT", "INTERMEDIAIRE", "AVANCE"]),
  level_max: z.enum(["DEBUTANT", "INTERMEDIAIRE", "AVANCE"]),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  note: z.string().optional(),
});

export function CreateMatchForm() {
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch("/api/create-match", { method: "POST", body: JSON.stringify(values) });
    const json = await res.json();
    if (json.ok) toast.success("Partie créée");
    else toast.error(json.error || "Erreur");
  }

  return (
    <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
      <Input placeholder="Club ID" {...form.register("club_id")} />
      <Input type="date" {...form.register("date")} />
      <Input type="time" {...form.register("start_time")} />
      <Input placeholder="60 ou 90" {...form.register("duration_minutes")} />
      <Input placeholder="level min" {...form.register("level_min")} />
      <Input placeholder="level max" {...form.register("level_max")} />
      <Input placeholder="PUBLIC ou PRIVATE" {...form.register("visibility")} />
      <Input placeholder="Note" {...form.register("note")} />
      <Button type="submit">Créer</Button>
    </form>
  );
}


