import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { User, Mail, Shield, Smartphone, Moon, Sun, Settings, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Settings - AppDirectory",
};

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-[var(--atomize-surface-primary)] pt-32 pb-20 px-4">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-[var(--atomize-primary-200)] rounded-full blur-[120px] opacity-20 dark:opacity-10" />
        <div className="absolute bottom-40 right-1/4 w-[300px] h-[300px] bg-[var(--atomize-secondary-200)] rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      </div>

      <div className="container mx-auto max-w-3xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--atomize-primary-500)] to-[var(--atomize-secondary-600)] flex items-center justify-center shadow-lg">
            <Settings className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[var(--atomize-text-primary)]">
              Settings
            </h1>
            <p className="text-[var(--atomize-text-secondary)] text-lg mt-1">
              Manage your account preferences and profile.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="atomize-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[var(--atomize-primary-100)] dark:bg-[var(--atomize-primary-900)]/30 rounded-xl">
                <User className="h-6 w-6 text-[var(--atomize-primary-600)] dark:text-[var(--atomize-primary-400)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--atomize-text-primary)]">
                Profile Information
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--atomize-text-tertiary)]">
                    Display Name
                  </label>
                  <div className="p-4 bg-[var(--atomize-surface-secondary)] rounded-xl border border-[var(--atomize-border-primary)] text-[var(--atomize-text-primary)] font-medium">
                    {user.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--atomize-text-tertiary)]">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-[var(--atomize-surface-secondary)] rounded-xl border border-[var(--atomize-border-primary)] text-[var(--atomize-text-primary)]">
                    <Mail className="h-4 w-4 text-[var(--atomize-primary-500)]" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-[var(--atomize-text-secondary)] pt-2 px-1">
                <Shield className="h-4 w-4 text-[var(--atomize-success-500)]" />
                <span>Your account is secured with email authentication.</span>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="atomize-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[var(--atomize-secondary-100)] dark:bg-[var(--atomize-secondary-900)]/30 rounded-xl">
                <Sun className="h-6 w-6 text-[var(--atomize-secondary-600)] dark:text-[var(--atomize-secondary-400)] hidden dark:block" />
                <Moon className="h-6 w-6 text-[var(--atomize-secondary-600)] dark:text-[var(--atomize-secondary-400)] block dark:hidden" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--atomize-text-primary)]">
                Appearance
              </h2>
            </div>

            <div className="flex items-center justify-between p-4 bg-[var(--atomize-surface-secondary)] rounded-xl border border-[var(--atomize-border-primary)]">
              <div className="space-y-1">
                <h3 className="font-semibold text-[var(--atomize-text-primary)]">Theme</h3>
                <p className="text-sm text-[var(--atomize-text-secondary)]">
                  Toggle between light and dark mode
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Device Section */}
          <div className="atomize-card p-8">
             <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[var(--atomize-success-100)] dark:bg-[var(--atomize-success-900)]/30 rounded-xl">
                <Smartphone className="h-6 w-6 text-[var(--atomize-success-600)] dark:text-[var(--atomize-success-400)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--atomize-text-primary)]">
                Session
              </h2>
            </div>
            <div className="p-4 bg-[var(--atomize-surface-secondary)] rounded-xl border border-[var(--atomize-border-primary)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--atomize-text-primary)]">Current Session</p>
                  <p className="text-sm text-[var(--atomize-text-secondary)]">
                    Active now
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 bg-[var(--atomize-success-500)] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[var(--atomize-success-600)] dark:text-[var(--atomize-success-400)]">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}