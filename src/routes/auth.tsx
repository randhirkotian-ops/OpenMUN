import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Wordmark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — OpenMUN" },
      {
        name: "description",
        content: "Sign in to OpenMUN to keep your research, papers and speeches in one place.",
      },
      { property: "og:title", content: "Sign in — OpenMUN" },
      {
        property: "og:description",
        content: "Sign in to OpenMUN to keep your research, papers and speeches in one place.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/app" });
    });
  }, [navigate]);

  async function withGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed", { description: result.error.message });
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/app" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: name },
        },
      });
      setBusy(false);
      if (error) {
        toast.error("Could not create your account", { description: error.message });
        return;
      }
      setSent(true);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error("Could not sign you in", { description: error.message });
      return;
    }
    void navigate({ to: "/app" });
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_minmax(0,520px)]">
      <aside className="hidden flex-col justify-between border-r border-border bg-surface p-14 lg:flex">
        <Link to="/" className="w-fit">
          <Wordmark />
        </Link>
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Our position</p>
          <blockquote className="display mt-5 max-w-lg text-3xl leading-[1.25]">
            OpenMUN will never write your speech for you. It reads what you wrote, tells you where
            it is weak, and shows you the source you forgot to cite.
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">Randhir Kotian, founder</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Open source · Evidence-first · Built by delegates
        </p>
      </aside>

      <div className="flex flex-col justify-between p-8 sm:p-12">
        <Link to="/" className="w-fit lg:hidden">
          <Wordmark />
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">
          <h1 className="display text-4xl">
            {mode === "signin" ? "Welcome back." : "Start preparing."}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Your workspace syncs across every device you use."
              : "One account. Every conference you ever prepare for."}
          </p>

          {sent ? (
            <div className="mt-8 rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Check your email</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a confirmation link to {email}. Open it to activate your workspace.
              </p>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                disabled={busy}
                className="mt-8 w-full justify-center gap-2"
                onClick={() => void withGoogle()}
              >
                <GoogleIcon /> Continue with Google
              </Button>

              <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or
                <span className="h-px flex-1 bg-border" />
              </div>

              <form className="space-y-4" onSubmit={(e) => void onSubmit(e)}>
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Delegate name"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="delegate@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full gap-2">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>

              <p className="mt-6 text-xs text-muted-foreground">
                {mode === "signin" ? "New to OpenMUN? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>

        <Link
          to="/"
          className="flex w-fit items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>
      </div>
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
