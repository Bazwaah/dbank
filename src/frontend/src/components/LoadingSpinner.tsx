import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-transparent border-t-primary",
        sizeMap[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function FullPageLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      data-ocid="app.loading_state"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-[3px] border-primary/20" />
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-[3px] border-transparent border-t-primary" />
        </div>
        <p className="font-mono text-sm text-muted-foreground tracking-wider">
          CONNECTING...
        </p>
      </div>
    </div>
  );
}
