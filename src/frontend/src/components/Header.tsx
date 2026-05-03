import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { isAuthenticated, shortPrincipal, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="flex h-14 items-center justify-end gap-3 border-b border-border bg-card px-6">
      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle theme"
        data-ocid="header.theme.toggle"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </Button>

      <Separator orientation="vertical" className="h-5" />

      {/* Principal display */}
      {isAuthenticated && shortPrincipal && (
        <div
          className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5"
          data-ocid="header.principal.display"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
            <User size={12} className="text-primary" />
          </div>
          <span className="font-mono text-xs text-foreground">
            {shortPrincipal}
          </span>
        </div>
      )}

      {/* Logout */}
      {isAuthenticated && (
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          data-ocid="header.logout.button"
          className="gap-2 border-border text-muted-foreground hover:text-foreground h-8 text-xs"
        >
          <LogOut size={13} />
          Logout
        </Button>
      )}
    </header>
  );
}
