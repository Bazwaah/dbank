import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronDown,
  Clock,
  LayoutDashboard,
  Settings,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={18} />,
    ocid: "sidebar.dashboard.link",
  },
  {
    label: "Deposit",
    href: "/deposit",
    icon: <TrendingDown size={18} />,
    ocid: "sidebar.deposit.link",
  },
  {
    label: "Withdraw",
    href: "/withdraw",
    icon: <TrendingUp size={18} />,
    ocid: "sidebar.withdraw.link",
  },
  {
    label: "History",
    href: "/history",
    icon: <Clock size={18} />,
    ocid: "sidebar.history.link",
  },
  {
    label: "Assets",
    href: "/assets",
    icon: <Wallet size={18} />,
    ocid: "sidebar.assets.link",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={18} />,
    ocid: "sidebar.settings.link",
  },
];

export function Sidebar() {
  const matchRoute = useMatchRoute();

  return (
    <aside className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <BarChart3 size={18} className="text-primary-foreground" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          DBANK
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        <p className="text-label text-muted-foreground px-3 py-2 mt-1">
          Main Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = matchRoute({
            to: item.href,
            fuzzy: item.href !== "/",
          });
          return (
            <Link
              key={item.href}
              to={item.href}
              data-ocid={item.ocid}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2.5">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">
            Internet Computer
          </span>
          <ChevronDown size={12} className="ml-auto text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
}
