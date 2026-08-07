import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Github, Mail } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Clause" },
      { name: "description", content: "Sign in to your Clause MUN workspace." },
      { property: "og:title", content: "Sign in — Clause" },
      { property: "og:description", content: "Sign in to your Clause MUN workspace." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const notReady = () =>
    toast("Accounts arrive with cloud sync", {
      description: "Your workspace is saved on this device in the meantime.",
    });

  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="flex flex-col justify-between p-8">
        <Link to="/" className="w-fit">
          <Wordmark />
        </Link>
        <div className="mx-auto w-full max-w-sm py-12">
          <h1 className="display text-4xl">Welcome back.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Pick up exactly where your preparation left off.
          </p>

          <div className="mt-8 space-y-3">
            <Button variant="outline" className="w-full justify-center gap-2" onClick={notReady}>
              <GoogleIcon /> Continue with Google
            </Button>
            <Button variant="outline" className="w-full justify-center gap-2" onClick={notReady}>
              <Github className="h-4 w-4" /> Continue with GitHub
            </Button>
          </div>

          <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/onboarding" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="delegate@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Mail className="h-4 w-4" /> Continue with email
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            New here?{" "}
            <Link to="/onboarding" className="text-primary underline-offset-4 hover:underline">
              Create your workspace
            </Link>
          </p>
        </div>
        <Link
          to="/"
          className="flex w-fit items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
      </div>

      <aside className="hidden flex-col justify-center border-l border-border bg-surface p-14 md:flex">
        <blockquote className="display max-w-md text-3xl leading-tight">
          "Delegates should leave a conference having produced work they understand and can defend."
        </blockquote>
        <p className="mt-6 text-sm text-muted-foreground">Randhir Kotian, founder</p>
      </aside>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8z" />
    </svg>
  );
}
