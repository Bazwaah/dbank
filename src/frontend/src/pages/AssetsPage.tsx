import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, Percent, TrendingUp } from "lucide-react";
import { useAccount } from "../hooks/useAccount";

const APY = 5.21;

export default function AssetsPage() {
  const { data: account, isLoading } = useAccount();

  const assets = [
    {
      name: "USDT",
      fullName: "Tether USD",
      balance: account?.balance ?? 0,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="assets.page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Assets
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your deposited assets and yield positions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Total Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <p className="font-display text-3xl font-bold text-foreground">
                {(account?.balance ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                <span className="text-lg text-muted-foreground">USDT</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Percent size={14} className="text-accent" />
              <CardTitle className="text-sm text-muted-foreground font-normal">
                Current APY
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-bold text-accent">
              {APY}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-primary" />
              <CardTitle className="text-sm text-muted-foreground font-normal">
                Total Earned
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <p className="font-display text-3xl font-bold text-foreground">
                {(account?.earnedYield ?? 0).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                <span className="text-lg text-muted-foreground">USDT</span>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Asset list */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Token Holdings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {assets.map((asset) => (
              <div
                key={asset.name}
                className="flex items-center gap-4 px-6 py-4"
                data-ocid="assets.item.1"
              >
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    asset.bg,
                  ].join(" ")}
                >
                  <Coins size={18} className={asset.color} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {asset.fullName}
                  </p>
                </div>
                <div className="text-right">
                  {isLoading ? (
                    <Skeleton className="h-5 w-28 mb-1" />
                  ) : (
                    <p className="font-mono font-semibold text-foreground">
                      {asset.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      {asset.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground font-mono">
                    {APY}% APY
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
