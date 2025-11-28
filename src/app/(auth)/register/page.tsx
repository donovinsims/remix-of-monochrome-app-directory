"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully");
      router.push("/login?registered=true");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[var(--atomize-surface-elevated)] rounded-3xl shadow-xl border border-[var(--atomize-border-primary)] p-8 w-full overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--atomize-secondary-500)] via-[var(--atomize-primary-500)] to-[var(--atomize-accent-500)]" />
      
      <div className="flex flex-col space-y-2 text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[var(--atomize-secondary-500)] to-[var(--atomize-primary-600)] rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--atomize-text-primary)]">
          Create an account
        </h1>
        <p className="text-sm text-[var(--atomize-text-secondary)]">
          Enter your information to get started
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[var(--atomize-text-primary)]">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
            <Input
              id="name"
              placeholder="John Doe"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] rounded-xl h-12"
            />
          </div>
        </div>
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
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] rounded-xl h-12"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[var(--atomize-text-primary)]">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
            <Input
              id="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] rounded-xl h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[var(--atomize-secondary-500)] to-[var(--atomize-primary-600)] hover:from-[var(--atomize-secondary-600)] hover:to-[var(--atomize-primary-700)] text-white font-semibold shadow-md hover:shadow-lg transition-all mt-2"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-[var(--atomize-text-secondary)]">
          Already have an account?{" "}
        </span>
        <Link
          href="/login"
          className="font-semibold text-[var(--atomize-primary-600)] dark:text-[var(--atomize-primary-400)] hover:text-[var(--atomize-primary-700)] dark:hover:text-[var(--atomize-primary-300)] transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}