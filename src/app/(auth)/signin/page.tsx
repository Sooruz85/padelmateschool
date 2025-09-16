import { signIn } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Se connecter</h1>
      <form action={signIn} className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" required placeholder="vous@exemple.com" />
        </div>
        <div className="space-y-1">
          <label className="text-sm" htmlFor="password">Mot de passe</label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full">Continuer</Button>
      </form>
    </div>
  )
}
