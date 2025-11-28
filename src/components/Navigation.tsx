"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Menu, User, LogOut, Settings, Bookmark, ChevronDown, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession, authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    localStorage.removeItem("bearer_token");
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/workflows", label: "Workflows" },
    { href: "/repos", label: "Repos" },
    { href: "/mcps", label: "MCPs" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-[var(--atomize-surface-elevated)]/90 backdrop-blur-xl border-[var(--atomize-border-primary)] shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-xl tracking-tight group">
          <div className="w-9 h-9 bg-gradient-to-br from-[var(--atomize-primary-500)] to-[var(--atomize-primary-700)] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-[var(--atomize-primary-500)]/20 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline-block bg-gradient-to-r from-[var(--atomize-text-primary)] to-[var(--atomize-text-secondary)] bg-clip-text text-transparent">AppDirectory</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-lg text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all">
              Apps <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-xl border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-elevated)] shadow-xl">
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/">All Apps</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/?pricing=free">Free Apps</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/?pricing=paid">Paid Apps</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg">
                <Link href="/?tag=New">New & Innovative</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg transition-all",
                pathname === link.href 
                  ? "text-[var(--atomize-primary-600)] dark:text-[var(--atomize-primary-400)] bg-[var(--atomize-primary-50)] dark:bg-[var(--atomize-primary-900)]/20"
                  : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {session && (
            <>
              <Link
                href="/bookmarks"
                className={cn(
                  "px-3 py-2 rounded-lg transition-all flex items-center gap-1.5",
                  pathname === "/bookmarks" 
                    ? "text-[var(--atomize-accent-600)] dark:text-[var(--atomize-accent-400)] bg-[var(--atomize-accent-50)] dark:bg-[var(--atomize-accent-900)]/20"
                    : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
                )}
              >
                <Bookmark className="h-4 w-4" />
                Bookmarks
              </Link>
              <Link
                href="/settings"
                className={cn(
                  "px-3 py-2 rounded-lg transition-all",
                  pathname === "/settings" 
                    ? "text-[var(--atomize-secondary-600)] dark:text-[var(--atomize-secondary-400)] bg-[var(--atomize-secondary-50)] dark:bg-[var(--atomize-secondary-900)]/20"
                    : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
                )}
              >
                Settings
              </Link>
            </>
          )}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="absolute left-3.5 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
          <Input
            type="search"
            placeholder="Search apps..."
            className="pl-10 h-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] focus:border-[var(--atomize-primary-400)] focus:ring-2 focus:ring-[var(--atomize-primary-100)] rounded-xl transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--atomize-primary-400)] to-[var(--atomize-secondary-500)] flex items-center justify-center shadow-md">
                    <span className="font-semibold text-sm text-white">
                      {session.user.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl border-[var(--atomize-border-primary)] bg-[var(--atomize-surface-elevated)] shadow-xl">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-[var(--atomize-text-primary)]">{session.user.name}</p>
                    <p className="text-xs leading-none text-[var(--atomize-text-tertiary)]">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[var(--atomize-border-primary)]" />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/bookmarks" className="cursor-pointer">
                    <Bookmark className="mr-2 h-4 w-4 text-[var(--atomize-accent-500)]" />
                    <span>Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4 text-[var(--atomize-secondary-500)]" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[var(--atomize-border-primary)]" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-[var(--atomize-error-500)] focus:text-[var(--atomize-error-600)] focus:bg-[var(--atomize-error-50)] dark:focus:bg-[var(--atomize-error-900)]/20 rounded-lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="rounded-lg text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-lg bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] hover:from-[var(--atomize-primary-600)] hover:to-[var(--atomize-primary-700)] text-white shadow-md hover:shadow-lg transition-all">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-lg hover:bg-[var(--atomize-surface-tertiary)]">
                <Menu className="h-5 w-5 text-[var(--atomize-text-primary)]" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0 bg-[var(--atomize-surface-elevated)] border-l-[var(--atomize-border-primary)]">
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-semibold text-lg text-[var(--atomize-text-primary)]">Menu</span>
                </div>
                
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--atomize-text-tertiary)]" />
                  <Input
                    type="search"
                    placeholder="Search apps..."
                    className="pl-10 bg-[var(--atomize-surface-secondary)] border-[var(--atomize-border-primary)] rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="text-base font-medium px-4 py-3 rounded-xl text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all"
                  >
                    Apps
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-base font-medium px-4 py-3 rounded-xl transition-all",
                        pathname === link.href
                          ? "text-[var(--atomize-primary-600)] bg-[var(--atomize-primary-50)] dark:text-[var(--atomize-primary-400)] dark:bg-[var(--atomize-primary-900)]/20"
                          : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {session && (
                    <>
                      <Link
                        href="/bookmarks"
                        className={cn(
                          "text-base font-medium px-4 py-3 rounded-xl transition-all flex items-center gap-2",
                          pathname === "/bookmarks"
                            ? "text-[var(--atomize-accent-600)] bg-[var(--atomize-accent-50)] dark:text-[var(--atomize-accent-400)] dark:bg-[var(--atomize-accent-900)]/20"
                            : "text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)]"
                        )}
                      >
                        <Bookmark className="h-5 w-5" />
                        Bookmarks
                      </Link>
                      <Link
                        href="/settings"
                        className="text-base font-medium px-4 py-3 rounded-xl text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all"
                      >
                        Settings
                      </Link>
                    </>
                  )}
                  
                  {!session && (
                    <>
                      <div className="h-px bg-[var(--atomize-border-primary)] my-3" />
                      <Link
                        href="/login"
                        className="text-base font-medium px-4 py-3 rounded-xl text-[var(--atomize-text-secondary)] hover:text-[var(--atomize-text-primary)] hover:bg-[var(--atomize-surface-tertiary)] transition-all"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="text-base font-medium px-4 py-3 rounded-xl text-white bg-gradient-to-r from-[var(--atomize-primary-500)] to-[var(--atomize-primary-600)] transition-all text-center"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                  
                  {session && (
                    <>
                      <div className="h-px bg-[var(--atomize-border-primary)] my-3" />
                      <button
                        onClick={handleSignOut}
                        className="text-base font-medium px-4 py-3 rounded-xl text-left text-[var(--atomize-error-500)] hover:bg-[var(--atomize-error-50)] dark:hover:bg-[var(--atomize-error-900)]/20 transition-all"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}