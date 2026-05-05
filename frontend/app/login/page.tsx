"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, fetchMe } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import type { ApiResponse } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const mutation = useMutation({
    mutationFn: async (form: FormData) => {
      const { data } = await api.post<ApiResponse<{ access_token: string; refresh_token: string }>>("/auth/login", {
        email: form.get("email"),
        password: form.get("password")
      });
      setSession(data.data.access_token, data.data.refresh_token);
      await fetchMe();
    },
    onSuccess: () => router.replace("/dashboard"),
    onError: () => toast.error("Login failed")
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(new FormData(event.currentTarget));
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[1.05fr_0.95fr]">
      <section className="flex flex-col justify-between bg-[url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-8 text-white">
        <div className="text-lg font-semibold">Political Situation Tracker</div>
        <div className="max-w-2xl pb-8">
          <h1 className="text-5xl font-semibold leading-tight">Election intelligence operations</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">Track parties, candidates, alliances, results, and analytics from one secure command surface.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="text-sm text-muted-foreground">Use the seeded admin account from the backend environment.</p>
          </div>
          <Input name="email" type="email" placeholder="admin@example.com" required />
          <Input name="password" type="password" placeholder="Password" minLength={8} required />
          <Button className="w-full" disabled={mutation.isPending}>{mutation.isPending ? "Signing in" : "Sign in"}</Button>
        </form>
      </section>
    </main>
  );
}
