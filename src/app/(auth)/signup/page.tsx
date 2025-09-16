import { signUp } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un compte</h1>
      <form action={signUp} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm" htmlFor="username">Nom d’utilisateur</label>
          <Input id="username" name="username" placeholder="padel_lover" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" required placeholder="vous@exemple.com" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="password">Mot de passe</label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full">Créer mon compte</Button>
      </form>
    </div>
  )
}
