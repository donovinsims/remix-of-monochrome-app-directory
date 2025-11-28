"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/settings",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[var(--atomize-surface-elevated)] rounded-3xl shadow-xl border border-[var(--atomize-border-primary)] p-8 w-full overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--atomize-primary-500)] via-[var(--atomize-secondary-500)] to-[var(--atomize-accent-500)]" />
      
      <div className="flex flex-col space-y-2 text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[var(--atomize-primary-500)] to-[var(--atomize-primary-700)] rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--atomize-text-primary)]">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--atomize-text-secondary)]">
          Enter your credentials to sign in to your account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[var(--atomize-text-primary)]">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] rounded-xl h-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[var(--atomize-text-primary)]">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] rounded-xl h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] hover:from-[var(--atomize-primary-600)] hover:to-[var(--atomize-primary-700)] text-white font-semibold shadow-md hover:shadow-lg transition-all"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-[var(--atomize-text-secondary)]">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/register"
          className="font-semibold text-[var(--atomize-primary-600)] dark:text-[var(--atomize-primary-400)] hover:text-[var(--atomize-primary-700)] dark:hover:text-[var(--atomize-primary-300)] transition-colors"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}