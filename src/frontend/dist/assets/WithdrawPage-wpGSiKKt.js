import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, b as LoadingSpinner } from "./index-BBiQlMEL.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DHA2fYkV.js";
import { I as Input, C as CircleCheck } from "./input-CvV4_NcL.js";
import { L as Label } from "./label-Dy-buveb.js";
import { u as useAccount, c as useWithdraw, S as Skeleton } from "./useAccount-7GaYu0vw.js";
import { A as ArrowDownLeft } from "./arrow-down-left-DqXgKGep.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function WithdrawPage() {
  const { data: account, isLoading } = useAccount();
  const withdrawMutation = useWithdraw();
  const [amount, setAmount] = reactExports.useState("");
  const [formState, setFormState] = reactExports.useState("idle");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const parsed = Number.parseFloat(amount) || 0;
  const balance = (account == null ? void 0 : account.balance) ?? 0;
  const insufficient = parsed > 0 && parsed > balance;
  const amountTooLow = amount !== "" && parsed <= 0;
  const hasInputError = insufficient || amountTooLow;
  const canSubmit = parsed > 0 && !insufficient && !withdrawMutation.isPending;
  const handleAmountChange = (val) => {
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
      const msg = e instanceof Error ? e.message : "Withdrawal failed. Please try again.";
      setErrorMessage(msg);
      setFormState("error");
    }
  };
  const updatedBalance = formState === "success" ? (account == null ? void 0 : account.balance) ?? 0 : balance;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-6", "data-ocid": "withdraw.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Withdraw Assets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Withdraw your funds instantly. No lock-up periods." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Available balance" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "h-5 w-32",
          "data-ocid": "withdraw.balance.loading_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
        (formState === "success" ? updatedBalance : balance).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        " ",
        "DBANK Tokens"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 20, className: "text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Withdraw DBANK Tokens" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Funds arrive in your wallet immediately" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "withdraw-amount", className: "text-sm font-medium", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "withdraw-amount",
                type: "number",
                placeholder: "0.00",
                value: amount,
                onChange: (e) => handleAmountChange(e.target.value),
                className: `font-mono text-lg h-11 ${hasInputError ? "border-destructive focus-visible:ring-destructive/30" : ""}`,
                "data-ocid": "withdraw.amount.input",
                min: "0",
                step: "any",
                disabled: withdrawMutation.isPending
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "h-11 shrink-0 border-primary/30 px-3 text-xs font-bold text-primary hover:bg-primary/5 transition-smooth",
                onClick: handleMax,
                disabled: isLoading || withdrawMutation.isPending || balance <= 0,
                "data-ocid": "withdraw.max.button",
                children: "MAX"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
            "Available:",
            " ",
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "inline-block h-3 w-20 align-middle" }) : `${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens`
          ] }),
          amountTooLow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 text-xs text-destructive",
              "data-ocid": "withdraw.amount.field_error",
              role: "alert",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, "aria-hidden": "true" }),
                "Amount must be greater than 0"
              ]
            }
          ),
          insufficient && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 text-xs text-destructive",
              "data-ocid": "withdraw.insufficient.field_error",
              role: "alert",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, "aria-hidden": "true" }),
                "Insufficient funds — you only have",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold", children: [
                  balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2
                  }),
                  " ",
                  "DBANK Tokens"
                ] })
              ]
            }
          )
        ] }),
        parsed > 0 && !hasInputError && formState !== "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "You receive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
              parsed.toLocaleString("en-US", { minimumFractionDigits: 2 }),
              " ",
              "DBANK Tokens"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remaining balance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
              (balance - parsed).toLocaleString("en-US", {
                minimumFractionDigits: 2
              }),
              " ",
              "DBANK Tokens"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Network fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: "Free" })
          ] })
        ] }),
        formState === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4",
            "data-ocid": "withdraw.success_state",
            "aria-live": "polite",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheck,
                {
                  size: 18,
                  className: "mt-0.5 shrink-0 text-green-500",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Withdrawal successful" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Updated balance:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold", children: [
                    updatedBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2
                    }),
                    " ",
                    "DBANK Tokens"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        formState === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4",
            "data-ocid": "withdraw.error_state",
            role: "alert",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleX,
                {
                  size: 18,
                  className: "mt-0.5 shrink-0 text-destructive",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Withdrawal failed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground break-words", children: errorMessage })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "destructive",
            className: "w-full h-11 font-semibold transition-smooth",
            onClick: handleWithdraw,
            disabled: !canSubmit || isLoading,
            "data-ocid": "withdraw.submit.button",
            "aria-busy": withdrawMutation.isPending,
            children: withdrawMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "flex items-center gap-2",
                "data-ocid": "withdraw.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                  "Processing..."
                ]
              }
            ) : "Withdraw"
          }
        )
      ] })
    ] })
  ] });
}
export {
  WithdrawPage as default
};
