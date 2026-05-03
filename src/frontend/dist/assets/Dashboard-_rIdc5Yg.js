import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, W as Wallet, B as Button, L as Link, T as TrendingUp, a as TrendingDown, S as Separator, b as LoadingSpinner } from "./index-BBiQlMEL.js";
import { B as Badge, A as ArrowUpRight, T as TransactionType } from "./types-D8mtHZE6.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DHA2fYkV.js";
import { u as useAccount, a as useTransactions, S as Skeleton } from "./useAccount-7GaYu0vw.js";
import { m as motion } from "./proxy-_tgli1kS.js";
import { A as ArrowDownLeft } from "./arrow-down-left-DqXgKGep.js";
import { C as Coins } from "./coins-CFYSXNR3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const APY = 5.21;
const POLL_INTERVAL = 1e4;
function AnimatedBalance({
  value,
  loading
}) {
  const [displayed, setDisplayed] = reactExports.useState(value);
  const prevRef = reactExports.useRef(value);
  reactExports.useEffect(() => {
    if (loading) return;
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    let start = null;
    const duration = 600;
    const frame = (ts) => {
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
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-64" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl font-bold tracking-tight tabular-nums", children: displayed.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) });
}
function MetricCard({
  label,
  value,
  sub,
  icon,
  variant = "default",
  loading,
  ocid
}) {
  const colorMap = {
    default: "bg-primary/10 text-primary",
    yield: "bg-accent/15 text-accent",
    deposit: "bg-primary/10 text-primary",
    withdrawal: "bg-destructive/10 text-destructive"
  };
  const textMap = {
    default: "text-foreground",
    yield: "text-accent",
    deposit: "text-foreground",
    withdrawal: "text-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[variant]}`,
              children: icon
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-36" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-2xl font-bold ${textMap[variant]}`, children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: sub })
      ]
    }
  );
}
function TransactionRow({
  txType,
  amount,
  balanceAfter,
  idx
}) {
  const isDeposit = txType === TransactionType.deposit;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: idx * 0.05 },
      className: "flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors",
      "data-ocid": `dashboard.recent_tx.item.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isDeposit ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`,
            children: isDeposit ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 15 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground capitalize", children: txType }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate font-mono", children: [
            "After:",
            " ",
            balanceAfter.toLocaleString("en-US", { minimumFractionDigits: 2 }),
            " ",
            "DBANK"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `text-sm font-bold font-mono shrink-0 ${isDeposit ? "text-primary" : "text-destructive"}`,
            children: [
              isDeposit ? "+" : "−",
              Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })
            ]
          }
        )
      ]
    }
  );
}
function Dashboard() {
  const {
    data: account,
    isLoading: accountLoading,
    dataUpdatedAt,
    refetch
  } = useAccount();
  const { data: transactions, isLoading: txLoading } = useTransactions();
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      refetch();
    }, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [refetch]);
  const recentTx = (transactions ?? []).slice(0, 5);
  const netPosition = ((account == null ? void 0 : account.totalDeposits) ?? 0) - ((account == null ? void 0 : account.totalWithdrawals) ?? 0);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-2xl border border-border bg-card shadow-elevated overflow-hidden",
        "data-ocid": "dashboard.balance.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-label text-muted-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 12 }),
                "Account Balance"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AnimatedBalance,
                  {
                    value: (account == null ? void 0 : account.balance) ?? 0,
                    loading: accountLoading
                  }
                ),
                !accountLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-muted-foreground mb-1 font-semibold", children: "DBANK" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-mono mt-2", children: [
                "≡ ",
                (((account == null ? void 0 : account.balance) ?? 0) / 2200).toFixed(4),
                " ICP"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start md:items-end gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-accent", children: [
                  APY,
                  "% APY"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs font-mono border-accent/30 text-accent/80",
                    children: "Variable"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "font-semibold",
                    asChild: true,
                    "data-ocid": "dashboard.deposit_link.button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/deposit", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 14, className: "mr-1.5" }),
                      "Deposit"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "font-semibold",
                    asChild: true,
                    "data-ocid": "dashboard.withdraw_link.button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/withdraw", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, className: "mr-1.5" }),
                      "Withdraw"
                    ] })
                  }
                )
              ] }),
              lastUpdated && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 10, className: "animate-spin-slow" }),
                "Updated ",
                lastUpdated
              ] })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Total Deposits",
          value: `${((account == null ? void 0 : account.totalDeposits) ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16 }),
          variant: "deposit",
          loading: accountLoading,
          ocid: "dashboard.total_deposits.card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Total Withdrawals",
          value: `${((account == null ? void 0 : account.totalWithdrawals) ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 16 }),
          variant: "withdrawal",
          loading: accountLoading,
          ocid: "dashboard.total_withdrawals.card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Earned Yield",
          value: `${((account == null ? void 0 : account.earnedYield) ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} DBANK`,
          sub: `At ${APY}% APY`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
          variant: "yield",
          loading: accountLoading,
          ocid: "dashboard.earned_yield.card"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Net Position",
          value: `${netPosition.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK`,
          sub: "Deposits − Withdrawals",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 16 }),
          loading: accountLoading,
          ocid: "dashboard.net_position.card"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border bg-card",
        "data-ocid": "dashboard.recent_tx.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-semibold", children: "Recent Transactions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last 5 transactions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-xs text-primary font-medium",
                asChild: true,
                "data-ocid": "dashboard.view_history.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/history", children: "View All →" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: txLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-1 p-4",
              "data-ocid": "dashboard.recent_tx.loading_state",
              children: Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[60px] w-full rounded-lg" }, i)
              ))
            }
          ) : recentTx.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-14 text-center",
              "data-ocid": "dashboard.recent_tx.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 36, className: "text-muted-foreground mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground", children: "No transactions yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-[200px]", children: "Make your first deposit to get started earning yield" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    className: "mt-4 font-semibold",
                    asChild: true,
                    "data-ocid": "dashboard.recent_tx.deposit_cta_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/deposit", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 14, className: "mr-1.5" }),
                      "Make First Deposit"
                    ] })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentTx.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TransactionRow,
            {
              txType: tx.txType,
              amount: tx.amount,
              balanceAfter: tx.balanceAfter,
              idx
            },
            tx.id.toString()
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground", children: accountLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Syncing..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Live · refreshes every 10s" })
    ] }) })
  ] });
}
export {
  Dashboard as default
};
