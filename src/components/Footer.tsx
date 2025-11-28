import Link from "next/link";
import { Sparkles, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-primary)] py-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-[var(--atomize-primary-200)] rounded-full blur-[100px] opacity-20 dark:opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-[var(--atomize-secondary-200)] rounded-full blur-[80px] opacity-20 dark:opacity-10" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[var(--atomize-primary-500)] to-[var(--atomize-primary-700)] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-[var(--atomize-primary-500)]/20 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-[var(--atomize-text-primary)] to-[var(--atomize-text-secondary)] bg-clip-text text-transparent">AppDirectory</span>
            </Link>
            <p className="text-sm text-[var(--atomize-text-secondary)] leading-relaxed mb-4">
              Discover the best apps for macOS and iOS, curated for quality and verified by our team.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-[var(--atomize-surface-secondary)] flex items-center justify-center text-[var(--atomize-text-tertiary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-[var(--atomize-surface-secondary)] flex items-center justify-center text-[var(--atomize-text-tertiary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="font-semibold text-sm text-[var(--atomize-text-primary)] mb-4 uppercase tracking-wider">Discover</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-primary-500)] transition-colors">
                  All Apps
                </Link>
              </li>
              <li>
                <Link href="/?pricing=free" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-success-500)] transition-colors">
                  Free Apps
                </Link>
              </li>
              <li>
                <Link href="/?pricing=paid" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-accent-500)] transition-colors">
                  Premium Apps
                </Link>
              </li>
              <li>
                <Link href="/?tag=New" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-secondary-500)] transition-colors">
                  New & Innovative
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms Column */}
          <div>
            <h4 className="font-semibold text-sm text-[var(--atomize-text-primary)] mb-4 uppercase tracking-wider">Platforms</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/?platform=macOS" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-primary-500)] transition-colors">
                  macOS Apps
                </Link>
              </li>
              <li>
                <Link href="/?platform=iOS" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-primary-500)] transition-colors">
                  iOS Apps
                </Link>
              </li>
              <li>
                <Link href="/workflows" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-secondary-500)] transition-colors">
                  Workflows
                </Link>
              </li>
              <li>
                <Link href="/repos" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-secondary-500)] transition-colors">
                  Repositories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-semibold text-sm text-[var(--atomize-text-primary)] mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/?category=Productivity" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-primary-500)] transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/?category=Design" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-accent-500)] transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/?category=Development" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-secondary-500)] transition-colors">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/?category=Utilities" className="text-sm text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-success-500)] transition-colors">
                  Utilities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--atomize-border-secondary)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--atomize-text-tertiary)]">
            © {new Date().getFullYear()} AppDirectory. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--atomize-text-tertiary)]">
            <Link href="#" className="hover:text-[var(--atomize-text-secondary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--atomize-text-secondary)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}