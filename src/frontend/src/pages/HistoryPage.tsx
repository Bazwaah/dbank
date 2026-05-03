import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownLeft, ArrowUpRight, History, Inbox } from "lucide-react";
import { useState } from "react";
import { useTransactions } from "../hooks/useAccount";
import type { Transaction } from "../types";
import { TransactionType } from "../types";

type FilterTab = "all" | "deposits" | "withdrawals";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface TransactionRowProps {
  tx: Transaction;
  index: number;
}

function TransactionRow({ tx, index }: TransactionRowProps) {
  const isDeposit = tx.txType === TransactionType.deposit;

  return (
    <div
      data-ocid={`history.item.${index}`}
      className="flex items-center gap-4 px-5 py-4 hover:bg-muted/25 transition-colors duration-150 border-b border-border last:border-b-0"
    >
      {/* Type icon */}
      <div
        className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full ${
          isDeposit
            ? "bg-primary/10 text-primary"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {isDeposit ? (
          <ArrowDownLeft className="w-4 h-4" />
        ) : (
          <ArrowUpRight className="w-4 h-4" />
        )}
      </div>

      {/* Description + date */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground text-sm capitalize">
            {tx.txType}
          </span>
          <Badge
            variant="outline"
            className={`text-xs ${
              isDeposit
                ? "border-primary/30 text-primary"
                : "border-destructive/30 text-destructive"
            }`}
          >
            {isDeposit ? "Credit" : "Debit"}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 font-mono">
          {formatDate(tx.timestamp)}&nbsp;·&nbsp;{formatTime(tx.timestamp)}
        </div>
      </div>

      {/* Amount + balance */}
      <div className="text-right flex-shrink-0">
        <div
          className={`font-bold font-mono text-sm ${
            isDeposit ? "text-primary" : "text-destructive"
          }`}
        >
          {isDeposit ? "+" : "−"}
          {tx.amount.toFixed(2)} ICP
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 font-mono">
          Balance:&nbsp;{tx.balanceAfter.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-b-0">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-44" />
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-3.5 w-20 ml-auto" />
        <Skeleton className="h-3 w-24 ml-auto" />
      </div>
    </div>
  );
}

function EmptyState({ filter }: { filter: FilterTab }) {
  const label =
    filter === "deposits"
      ? "deposits"
      : filter === "withdrawals"
        ? "withdrawals"
        : "transactions";

  return (
    <div
      data-ocid="history.empty_state"
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="text-foreground font-semibold mb-1">No {label} yet</p>
      <p className="text-muted-foreground text-sm max-w-xs">
        Your {label} will appear here once you start using DBANK.
      </p>
    </div>
  );
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const { data: transactions, isLoading, isError } = useTransactions();

  const filtered: Transaction[] = (transactions ?? [])
    .slice()
    .sort((a, b) => Number(b.timestamp - a.timestamp))
    .filter((tx) => {
      if (filter === "deposits") return tx.txType === TransactionType.deposit;
      if (filter === "withdrawals")
        return tx.txType === TransactionType.withdrawal;
      return true;
    });

  return (
    <div className="min-h-screen bg-background" data-ocid="history.page">
      {/* Page header */}
      <div className="bg-card border-b border-border shadow-card px-5 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-0.5">
            <History className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold font-display text-foreground">
              Transaction History
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            A complete record of all your deposits and withdrawals
          </p>
        </div>
      </div>

      {/* Filter tabs — sticky */}
      <div className="bg-card border-b border-border px-5 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
            <TabsList className="bg-muted/50" data-ocid="history.filter.tab">
              <TabsTrigger
                value="all"
                data-ocid="history.filter.tab.all"
                className="text-sm"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="deposits"
                data-ocid="history.filter.tab.deposits"
                className="text-sm"
              >
                Deposits
              </TabsTrigger>
              <TabsTrigger
                value="withdrawals"
                data-ocid="history.filter.tab.withdrawals"
                className="text-sm"
              >
                Withdrawals
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-0 sm:px-5 py-6">
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {/* Loading state */}
          {isLoading && (
            <div data-ocid="history.loading_state">
              {Array.from({ length: 7 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list has no stable ids
                <TransactionSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && !isLoading && (
            <div
              data-ocid="history.error_state"
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              <p className="text-destructive font-semibold mb-1">
                Failed to load transactions
              </p>
              <p className="text-muted-foreground text-sm">
                Please try refreshing the page.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && filtered.length === 0 && (
            <EmptyState filter={filter} />
          )}

          {/* Transaction rows */}
          {!isLoading && !isError && filtered.length > 0 && (
            <div>
              {/* Column labels */}
              <div className="flex items-center gap-4 px-5 py-2 bg-muted/40 border-b border-border">
                <div className="w-9 flex-shrink-0" />
                <div className="flex-1 text-label text-muted-foreground">
                  Transaction
                </div>
                <div className="text-label text-muted-foreground text-right">
                  Amount / Balance
                </div>
              </div>

              {filtered.map((tx, i) => (
                <TransactionRow key={String(tx.id)} tx={tx} index={i + 1} />
              ))}
            </div>
          )}
        </div>

        {/* Summary count */}
        {!isLoading && !isError && (transactions ?? []).length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Showing {filtered.length} of {transactions?.length ?? 0} total
            transaction{transactions?.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
