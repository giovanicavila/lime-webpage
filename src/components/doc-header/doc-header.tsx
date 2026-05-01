import { /* Github, */ Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { DocNavList } from "@/components/doc-nav-list/doc-nav-list";
import { LimeLogo } from "@/components/lime-logo/lime-logo";
import { SearchDialog } from "@/components/search-dialog/search-dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/lime-db/lime-db";

export function DocHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 border-b bg-background/95 backdrop-blur-sm transition-shadow",
          scrolled ? "shadow-sm" : "border-border"
        )}
      >
        <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-4 px-4 sm:px-6">
          {/* Mobile hamburger */}
          <Button
            aria-label="Open navigation menu"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            size="icon"
            variant="ghost"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link
            aria-label="Lime DB home"
            className="flex shrink-0 items-center gap-2"
            to="/"
          >
            <LimeLogo size={26} />
            <span className="font-semibold text-base tracking-tight">
              lime <span className="font-bold text-primary">db</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Main navigation" className="hidden gap-1 md:flex">
            <NavLink
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
              to="/docs/introduction"
            >
              Docs
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
              to="/docs/api-reference"
            >
              API
            </NavLink>
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search button */}
            <button
              aria-label="Search documentation (Ctrl+K)"
              className="hidden h-9 items-center gap-2 rounded-md border border-border bg-muted/50 px-3 text-muted-foreground text-sm transition-colors hover:bg-muted md:flex"
              onClick={() => setSearchOpen(true)}
              type="button"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="ml-2 hidden rounded border border-border bg-background px-1.5 py-0.5 text-xs lg:block">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search */}
            <Button
              aria-label="Search documentation"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
              size="icon"
              variant="ghost"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* GitHub */}
            <Button
              aria-label="View on GitHub"
              asChild
              size="icon"
              variant="ghost"
            >
              <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                {/* <Github className="h-4 w-4" /> */}
              </a>
            </Button>

            {/* Theme toggle */}
            <ThemeTogglerButton size="sm" variant="ghost" />
          </div>
        </div>
      </header>

      {/* Mobile sidebar sheet */}
      <Sheet onOpenChange={setMobileOpen} open={mobileOpen}>
        <SheetContent className="w-72 px-4 py-6" side="left">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <div className="mb-6 flex items-center justify-between">
            <Link
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
              to="/"
            >
              <LimeLogo size={22} />
              <span className="font-semibold">
                lime <span className="text-primary">db</span>
              </span>
            </Link>
            <Button
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
              size="icon"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DocNavList />
        </SheetContent>
      </Sheet>

      {/* Search dialog */}
      <SearchDialog onOpenChange={setSearchOpen} open={searchOpen} />
    </>
  );
}
