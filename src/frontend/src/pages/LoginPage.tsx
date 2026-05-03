import { Button } from "@/components/ui/button";
import { BarChart3, Lock, Shield, TrendingUp, Zap } from "lucide-react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: <TrendingUp size={20} />,
    title: "Earn Yield",
    desc: "Earn up to 5.21% APY on your deposits automatically.",
  },
  {
    icon: <Shield size={20} />,
    title: "Non-Custodial",
    desc: "Your keys, your coins. Full control on the Internet Computer.",
  },
  {
    icon: <Zap size={20} />,
    title: "Instant Transactions",
    desc: "Deposit and withdraw in seconds with zero gas fees.",
  },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-card border-r border-border p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <BarChart3 size={20} className="text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold text-foreground">
            DBANK
          </span>
        </div>

        <div className="space-y-10">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground leading-tight mb-4">
              Decentralized Finance
              <br />
              <span className="text-primary">On the Internet Computer</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              A fully on-chain DeFi protocol with no central servers, no
              middlemen, and no trust required.
            </p>
          </div>

          <div className="grid gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {f.title}
                  </p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-muted/40 border border-border p-4">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground font-mono">
            Network: Internet Computer Mainnet
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BarChart3 size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              DBANK
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm">
              Connect your Internet Identity to access your account.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <Lock size={28} className="text-primary" />
              </div>

              <div className="text-center">
                <p className="font-semibold text-foreground mb-1">
                  Internet Identity
                </p>
                <p className="text-xs text-muted-foreground">
                  Cryptographically secure, no passwords required
                </p>
              </div>

              <Button
                onClick={() => login()}
                disabled={isLoading}
                className="w-full h-11 font-semibold text-sm"
                data-ocid="login.connect.button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Connecting...
                  </span>
                ) : (
                  "Connect with Internet Identity"
                )}
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            New to Internet Computer?{" "}
            <a
              href="https://internetcomputer.org/docs/current/tokenomics/identity-auth/what-is-ic-identity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Learn more →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
