"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="inline-flex items-center">
        <Logo variant="dark" className="h-6" />
      </Link>
      <div className="hidden md:flex items-center gap-4 text-sm">
        <Link href="/decouvrir" className="hover:underline">Découvrir</Link>
        <Link href="/creer" className="hover:underline">Créer une partie</Link>
        <Link href="/reserver" className="hover:underline">Réserver</Link>
        <Link href="/messages" className="hover:underline">Messages</Link>
        <Link href="/profil" className="hover:underline">Profil</Link>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="space-y-4">
            <nav className="flex flex-col text-base">
              <Link href="/decouvrir" className="py-2">Découvrir</Link>
              <Link href="/creer" className="py-2">Créer une partie</Link>
              <Link href="/reserver" className="py-2">Réserver</Link>
              <Link href="/messages" className="py-2">Messages</Link>
              <Link href="/profil" className="py-2">Profil</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default MainNav;
