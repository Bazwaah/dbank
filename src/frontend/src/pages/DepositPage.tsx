import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Info, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAccount, useDeposit } from "../hooks/useAccount";
import type { AccountInfo } from "../types";

const APY = 5.21;

function BalanceLine({
  account,
  isLoading,
}: {
  account: AccountInfo | undefined;
  isLoading: boolean;
}) {
  return (
    <p className="text-xs text-muted-foreground font-mono">
      Available:{" "}
      {isLoading ? (
        <Skeleton
          className="inline-block h-3 w-20"
          data-ocid="deposit.loading_state"
        />
      ) : (
        `${(account?.balance ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens`
      )}
    </p>
  );
}

export default function DepositPage() {
  const { data: account, isLoading } = useAccount();
  const depositMutation = useDeposit();
  const [amountStr, setAmountStr] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [lastDeposit, setLastDeposit] = useState<{
    amount: number;
    newBalance: number;
  } | null>(null);

  const parsed = Number.parseFloat(amountStr) || 0;
  const estimatedYield = (parsed * APY) / 100;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountStr(e.target.value);
    setValidationError(null);
    setLastDeposit(null);
  };

  const handleBlur = () => {
    if (amountStr && (Number.isNaN(parsed) || parsed <= 0)) {
      setValidationError("Amount must be greater than 0.");
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number.parseFloat(amountStr);

    if (!amountStr || Number.isNaN(amount) || amount <= 0) {
      setValidationError("Please enter a valid amount greater than 0.");
      return;
    }

    setValidationError(null);
    try {
      const updated = await depositMutation.mutateAsync(amount);
      setLastDeposit({ amount, newBalance: updated.balance });
      setAmountStr("");
    } catch {
      // error rendered from depositMutation.error
    }
  };

  const quickAmounts = [10, 50, 100, 500];

  return (
    <div className="max-w-lg space-y-6" data-ocid="deposit.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          Deposit Assets
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Earn {APY}% APY on your deposits, compounded automatically.
        </p>
      </motion.div>

      {/* Deposit form card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">
                  Deposit DBANK Tokens
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Funds are available instantly
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeposit} className="space-y-5" noValidate>
              {/* Amount input */}
              <div className="space-y-2">
                <Label htmlFor="deposit-amount" className="text-sm">
                  Amount
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    value={amountStr}
                    onChange={handleAmountChange}
                    onBlur={handleBlur}
                    className="font-mono text-lg"
                    data-ocid="deposit.input"
                    min="0"
                    step="any"
                    disabled={depositMutation.isPending}
                    aria-invalid={!!validationError}
                    aria-describedby={
                      validationError ? "deposit-amount-error" : undefined
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 text-xs text-primary border-primary/30"
                    onClick={() => setAmountStr(String(account?.balance ?? 0))}
                    disabled={depositMutation.isPending}
                    data-ocid="deposit.max_button"
                  >
                    MAX
                  </Button>
                </div>

                <BalanceLine account={account} isLoading={isLoading} />

                {/* Validation error */}
                <AnimatePresence>
                  {validationError && (
                    <motion.p
                      id="deposit-amount-error"
                      data-ocid="deposit.field_error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-destructive"
                    >
                      {validationError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick-select amounts */}
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    data-ocid={`deposit.quick_amount.${amt}`}
                    disabled={depositMutation.isPending}
                    onClick={() => {
                      setAmountStr(String(amt));
                      setValidationError(null);
                      setLastDeposit(null);
                    }}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-smooth hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {amt} DBANK
                  </button>
                ))}
              </div>

              {/* Yield estimate */}
              {parsed > 0 && (
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Info size={13} className="text-accent" />
                    <span className="text-xs text-accent font-semibold">
                      Yield Estimate
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly</p>
                      <p className="font-mono font-semibold text-accent">
                        +{(estimatedYield / 12).toFixed(4)} DBANK
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Yearly</p>
                      <p className="font-mono font-semibold text-accent">
                        +{estimatedYield.toFixed(4)} DBANK
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mutation error */}
              <AnimatePresence>
                {depositMutation.error && (
                  <motion.div
                    data-ocid="deposit.error_state"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {depositMutation.error instanceof Error
                      ? depositMutation.error.message
                      : "Deposit failed. Please try again."}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success banner */}
              <AnimatePresence>
                {lastDeposit && (
                  <motion.div
                    data-ocid="deposit.success_state"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Deposit successful!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono font-medium">
                          {lastDeposit.amount.toFixed(2)} DBANK Tokens
                        </span>{" "}
                        deposited. New balance:{" "}
                        <span className="font-mono font-medium">
                          {lastDeposit.newBalance.toFixed(2)} DBANK Tokens
                        </span>
                        .
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 font-semibold"
                disabled={depositMutation.isPending || !amountStr}
                data-ocid="deposit.submit_button"
              >
                {depositMutation.isPending ? (
                  <span
                    className="flex items-center gap-2"
                    data-ocid="deposit.loading_state"
                  >
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing…
                  </span>
                ) : (
                  `Deposit${parsed > 0 ? ` ${parsed.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens` : ""}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-xl border border-border bg-card/60 p-5 space-y-3"
      >
        <p className="text-sm font-semibold text-foreground">How it works</p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-mono">01</span>
            Enter the amount you want to deposit
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono">02</span>
            Confirm the transaction with Internet Identity
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-mono">03</span>
            Your balance updates instantly and starts earning yield
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
