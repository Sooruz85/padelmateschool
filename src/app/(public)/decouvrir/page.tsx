import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PartiesList } from "@/features/decouvrir/parties";
import { ClubsList } from "@/features/decouvrir/clubs";
import { MapStub } from "@/components/map-stub";

export default async function DecouvrirPage({ searchParams }: { searchParams: any }) {
  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Découvrir</h1>
      <Tabs defaultValue="parties">
        <TabsList>
          <TabsTrigger value="parties">Parties</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>
        <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
          <TabsContent value="parties" className="space-y-4">
            {/* Filtres stub */}
            <div className="text-sm text-muted-foreground">Filtres à venir: date, créneau, niveau, distance.</div>
            {/* Liste parties */}
            <PartiesList searchParams={searchParams} />
          </TabsContent>
          <TabsContent value="clubs" className="space-y-4">
            <div className="text-sm text-muted-foreground">Filtres à venir: ville, indoor/outdoor, prix.</div>
            <ClubsList />
          </TabsContent>
          <aside>
            <MapStub />
          </aside>
        </div>
      </Tabs>
    </div>
  );
}

