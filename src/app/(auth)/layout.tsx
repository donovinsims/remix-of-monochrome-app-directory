import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-[var(--atomize-surface-primary)]">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--atomize-primary-200)] rounded-full blur-[150px] opacity-30 dark:opacity-15" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--atomize-secondary-200)] rounded-full blur-[120px] opacity-30 dark:opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--atomize-accent-200)] rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-11 h-11 bg-gradient-to-br from-[var(--atomize-primary-500)] to-[var(--atomize-primary-700)] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--atomize-primary-500)]/20 transition-all duration-300">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-semibold bg-gradient-to-r from-[var(--atomize-text-primary)] to-[var(--atomize-text-secondary)] bg-clip-text text-transparent">AppDirectory</span>
      </Link>

      <div className="w-full max-w-md space-y-8 px-4 sm:px-0">{children}</div>
    </div>
  );
}