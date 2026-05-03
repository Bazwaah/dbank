import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  ArrowDownLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAccount, useWithdraw } from "../hooks/useAccount";

type FormState = "idle" | "success" | "error";

export default function WithdrawPage() {
  const { data: account, isLoading } = useAccount();
  const withdrawMutation = useWithdraw();
  const [amount, setAmount] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const parsed = Number.parseFloat(amount) || 0;
  const balance = account?.balance ?? 0;
  const insufficient = parsed > 0 && parsed > balance;
  const amountTooLow = amount !== "" && parsed <= 0;
  const hasInputError = insufficient || amountTooLow;
  const canSubmit = parsed > 0 && !insufficient && !withdrawMutation.isPending;

  const handleAmountChange = (val: string) => {
    setAmount(val);
    if (formState !== "idle") setFormState("idle");
  };

  const handleMax = () => {
    setAmount(balance.toString());
    if (formState !== "idle") setFormState("idle");
  };

  const handleWithdraw = async () => {
    if (!canSubmit) return;
    setFormState("idle");
    setErrorMessage("");
    try {
      await withdrawMutation.mutateAsync(parsed);
      setAmount("");
      setFormState("success");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Withdrawal failed. Please try again.";
      setErrorMessage(msg);
      setFormState("error");
    }
  };

  const updatedBalance =
    formState === "success" ? (account?.balance ?? 0) : balance;

  return (
    <div className="max-w-lg space-y-6" data-ocid="withdraw.page">
      {/* Page heading */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Withdraw Assets
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Withdraw your funds instantly. No lock-up periods.
        </p>
      </div>

      {/* Balance reference card */}
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Available balance</span>
        {isLoading ? (
          <Skeleton
            className="h-5 w-32"
            data-ocid="withdraw.balance.loading_state"
          />
        ) : (
          <span className="font-mono font-semibold text-foreground">
            {(formState === "success"
              ? updatedBalance
              : balance
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            DBANK Tokens
          </span>
        )}
      </div>

      {/* Main form card */}
      <Card className="border-border bg-card shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <ArrowDownLeft size={20} className="text-destructive" />
            </div>
            <div>
              <CardTitle className="text-base">Withdraw DBANK Tokens</CardTitle>
              <p className="text-xs text-muted-foreground">
                Funds arrive in your wallet immediately
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Amount input */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount" className="text-sm font-medium">
              Amount
            </Label>
            <div className="flex gap-2">
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`font-mono text-lg h-11 ${hasInputError ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                data-ocid="withdraw.amount.input"
                min="0"
                step="any"
                disabled={withdrawMutation.isPending}
              />
              <Button
                variant="outline"
                size="sm"
                className="h-11 shrink-0 border-primary/30 px-3 text-xs font-bold text-primary hover:bg-primary/5 transition-smooth"
                onClick={handleMax}
                disabled={
                  isLoading || withdrawMutation.isPending || balance <= 0
                }
                data-ocid="withdraw.max.button"
              >
                MAX
              </Button>
            </div>

            {/* Balance hint */}
            <p className="font-mono text-xs text-muted-foreground">
              Available:{" "}
              {isLoading ? (
                <Skeleton className="inline-block h-3 w-20 align-middle" />
              ) : (
                `${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens`
              )}
            </p>

            {/* Inline validation errors */}
            {amountTooLow && (
              <div
                className="flex items-center gap-1.5 text-xs text-destructive"
                data-ocid="withdraw.amount.field_error"
                role="alert"
              >
                <AlertTriangle size={12} aria-hidden="true" />
                Amount must be greater than 0
              </div>
            )}
            {insufficient && (
              <div
                className="flex items-center gap-1.5 text-xs text-destructive"
                data-ocid="withdraw.insufficient.field_error"
                role="alert"
              >
                <AlertTriangle size={12} aria-hidden="true" />
                Insufficient funds — you only have{" "}
                <span className="font-mono font-semibold">
                  {balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  DBANK Tokens
                </span>
              </div>
            )}
          </div>

          {/* Transaction summary */}
          {parsed > 0 && !hasInputError && formState !== "success" && (
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Summary
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You receive</span>
                <span className="font-mono font-semibold text-foreground">
                  {parsed.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                  DBANK Tokens
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining balance</span>
                <span className="font-mono text-muted-foreground">
                  {(balance - parsed).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  DBANK Tokens
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network fee</span>
                <span className="font-mono text-muted-foreground">Free</span>
              </div>
            </div>
          )}

          {/* Success state */}
          {formState === "success" && (
            <div
              className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4"
              data-ocid="withdraw.success_state"
              aria-live="polite"
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-green-500"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">
                  Withdrawal successful
                </p>
                <p className="text-xs text-muted-foreground">
                  Updated balance:{" "}
                  <span className="font-mono font-semibold">
                    {updatedBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    DBANK Tokens
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {formState === "error" && (
            <div
              className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4"
              data-ocid="withdraw.error_state"
              role="alert"
            >
              <XCircle
                size={18}
                className="mt-0.5 shrink-0 text-destructive"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-foreground">
                  Withdrawal failed
                </p>
                <p className="text-xs text-muted-foreground break-words">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Submit button */}
          <Button
            variant="destructive"
            className="w-full h-11 font-semibold transition-smooth"
            onClick={handleWithdraw}
            disabled={!canSubmit || isLoading}
            data-ocid="withdraw.submit.button"
            aria-busy={withdrawMutation.isPending}
          >
            {withdrawMutation.isPending ? (
              <span
                className="flex items-center gap-2"
                data-ocid="withdraw.loading_state"
              >
                <LoadingSpinner size="sm" />
                Processing...
              </span>
            ) : (
              "Withdraw"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
