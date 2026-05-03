import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAccount, useTransactions } from "../hooks/useAccount";
import { TransactionType } from "../types";

const APY = 5.21;
const POLL_INTERVAL = 10_000;

/** Animated counter from previous value to next */
function AnimatedBalance({
  value,
  loading,
}: { value: number; loading: boolean }) {
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (loading) return;
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    let start: number | null = null;
    const duration = 600;
    const frame = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = pct < 0.5 ? 2 * pct * pct : -1 + (4 - 2 * pct) * pct;
      setDisplayed(from + (to - from) * ease);
      if (pct < 1) requestAnimationFrame(frame);
      else {
        setDisplayed(to);
        prevRef.current = to;
      }
    };
    requestAnimationFrame(frame);
  }, [value, loading]);

  if (loading) return <Skeleton className="h-14 w-64" />;
  return (
    <span className="font-display text-6xl font-bold tracking-tight tabular-nums">
      {displayed.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  variant?: "default" | "yield" | "deposit" | "withdrawal";
  loading?: boolean;
  ocid: string;
}

function MetricCard({
  label,
  value,
  sub,
  icon,
  variant = "default",
  loading,
  ocid,
}: MetricCardProps) {
  const colorMap = {
    default: "bg-primary/10 text-primary",
    yield: "bg-accent/15 text-accent",
    deposit: "bg-primary/10 text-primary",
    withdrawal: "bg-destructive/10 text-destructive",
  };
  const textMap = {
    default: "text-foreground",
    yield: "text-accent",
    deposit: "text-foreground",
    withdrawal: "text-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <p className="text-label text-muted-foreground">{label}</p>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[variant]}`}
        >
          {icon}
        </div>
      </div>
      {loading ? (
        <Skeleton className="h-7 w-36" />
      ) : (
        <p className={`font-display text-2xl font-bold ${textMap[variant]}`}>
          {value}
        </p>
      )}
      {sub && <p className="text-xs text-muted-foreground font-mono">{sub}</p>}
    </motion.div>
  );
}

function TransactionRow({
  txType,
  amount,
  balanceAfter,
  idx,
}: {
  txType: TransactionType;
  amount: number;
  balanceAfter: number;
  idx: number;
}) {
  const isDeposit = txType === TransactionType.deposit;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"
      data-ocid={`dashboard.recent_tx.item.${idx + 1}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isDeposit
            ? "bg-primary/10 text-primary"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {isDeposit ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground capitalize">
          {txType}
        </p>
        <p className="text-xs text-muted-foreground truncate font-mono">
          After:{" "}
          {balanceAfter.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
          DBANK
        </p>
      </div>
      <span
        className={`text-sm font-bold font-mono shrink-0 ${
          isDeposit ? "text-primary" : "text-destructive"
        }`}
      >
        {isDeposit ? "+" : "−"}
        {Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
    </motion.div>
  );
}

export default function Dashboard() {
  const {
    data: account,
    isLoading: accountLoading,
    dataUpdatedAt,
    refetch,
  } = useAccount();
  const { data: transactions, isLoading: txLoading } = useTransactions();

  // Real-time polling every 10s
  useEffect(() => {
    const id = setInterval(() => {
      refetch();
    }, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [refetch]);

  const recentTx = (transactions ?? []).slice(0, 5);
  const netPosition =
    (account?.totalDeposits ?? 0) - (account?.totalWithdrawals ?? 0);
  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div className="space-y-6 pb-8" data-ocid="dashboard.page">
      {/* Hero Balance */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden"
        data-ocid="dashboard.balance.panel"
      >
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-accent" />
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-label text-muted-foreground mb-3 flex items-center gap-2">
                <Wallet size={12} />
                Account Balance
              </p>
              <div className="flex items-end gap-3">
                <AnimatedBalance
                  value={account?.balance ?? 0}
                  loading={accountLoading}
                />
                {!accountLoading && (
                  <span className="font-display text-2xl text-muted-foreground mb-1 font-semibold">
                    DBANK
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono mt-2">
                ≡ {((account?.balance ?? 0) / 2200).toFixed(4)} ICP
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              {/* APY badge */}
              <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
                <Sparkles size={14} className="text-accent" />
                <span className="font-mono text-sm font-bold text-accent">
                  {APY}% APY
                </span>
                <Badge
                  variant="outline"
                  className="text-xs font-mono border-accent/30 text-accent/80"
                >
                  Variable
                </Badge>
              </div>

              {/* Quick actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="font-semibold"
                  asChild
                  data-ocid="dashboard.deposit_link.button"
                >
                  <Link to="/deposit">
                    <ArrowDownLeft size={14} className="mr-1.5" />
                    Deposit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold"
                  asChild
                  data-ocid="dashboard.withdraw_link.button"
                >
                  <Link to="/withdraw">
                    <ArrowUpRight size={14} className="mr-1.5" />
                    Withdraw
                  </Link>
                </Button>
              </div>

              {/* Last updated indicator */}
              {lastUpdated && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                  <RefreshCw size={10} className="animate-spin-slow" />
                  Updated {lastUpdated}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Deposits"
          value={`${(account?.totalDeposits ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`}
          icon={<TrendingUp size={16} />}
          variant="deposit"
          loading={accountLoading}
          ocid="dashboard.total_deposits.card"
        />
        <MetricCard
          label="Total Withdrawals"
          value={`${(account?.totalWithdrawals ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`}
          icon={<TrendingDown size={16} />}
          variant="withdrawal"
          loading={accountLoading}
          ocid="dashboard.total_withdrawals.card"
        />
        <MetricCard
          label="Earned Yield"
          value={`${(account?.earnedYield ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} DBANK`}
          sub={`At ${APY}% APY`}
          icon={<Sparkles size={16} />}
          variant="yield"
          loading={accountLoading}
          ocid="dashboard.earned_yield.card"
        />
        <MetricCard
          label="Net Position"
          value={`${netPosition.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`}
          sub="Deposits − Withdrawals"
          icon={<Wallet size={16} />}
          loading={accountLoading}
          ocid="dashboard.net_position.card"
        />
      </div>

      {/* Recent Transactions */}
      <Card
        className="border-border bg-card"
        data-ocid="dashboard.recent_tx.card"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Transactions
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Last 5 transactions
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary font-medium"
              asChild
              data-ocid="dashboard.view_history.button"
            >
              <Link to="/history">View All →</Link>
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          {txLoading ? (
            <div
              className="space-y-1 p-4"
              data-ocid="dashboard.recent_tx.loading_state"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
              ))}
            </div>
          ) : recentTx.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-14 text-center"
              data-ocid="dashboard.recent_tx.empty_state"
            >
              <Coins size={36} className="text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-muted-foreground">
                No transactions yet
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                Make your first deposit to get started earning yield
              </p>
              <Button
                size="sm"
                className="mt-4 font-semibold"
                asChild
                data-ocid="dashboard.recent_tx.deposit_cta_button"
              >
                <Link to="/deposit">
                  <ArrowDownLeft size={14} className="mr-1.5" />
                  Make First Deposit
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentTx.map((tx, idx) => (
                <TransactionRow
                  key={tx.id.toString()}
                  txType={tx.txType}
                  amount={tx.amount}
                  balanceAfter={tx.balanceAfter}
                  idx={idx}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Polling indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        {accountLoading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>Syncing...</span>
          </>
        ) : (
          <>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>Live · refreshes every 10s</span>
          </>
        )}
      </div>
    </div>
  );
}
