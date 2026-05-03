import { c as createLucideIcon, j as jsxRuntimeExports, T as TrendingUp } from "./index-BBiQlMEL.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DHA2fYkV.js";
import { u as useAccount, S as Skeleton } from "./useAccount-7GaYu0vw.js";
import { C as Coins } from "./coins-CFYSXNR3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode);
const APY = 5.21;
function AssetsPage() {
  const { data: account, isLoading } = useAccount();
  const assets = [
    {
      name: "USDT",
      fullName: "Tether USD",
      balance: (account == null ? void 0 : account.balance) ?? 0,
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "assets.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Assets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Overview of your deposited assets and yield positions." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm text-muted-foreground font-normal", children: "Total Portfolio Value" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-bold text-foreground", children: [
          ((account == null ? void 0 : account.balance) ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 2
          }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "USDT" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { size: 14, className: "text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm text-muted-foreground font-normal", children: "Current APY" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-bold text-accent", children: [
          APY,
          "%"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm text-muted-foreground font-normal", children: "Total Earned" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl font-bold text-foreground", children: [
          ((account == null ? void 0 : account.earnedYield) ?? 0).toLocaleString("en-US", {
            minimumFractionDigits: 2
          }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "USDT" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Token Holdings" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: assets.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 px-6 py-4",
          "data-ocid": "assets.item.1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  asset.bg
                ].join(" "),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 18, className: asset.color })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: asset.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: asset.fullName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold text-foreground", children: [
                asset.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2
                }),
                " ",
                asset.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                APY,
                "% APY"
              ] })
            ] })
          ]
        },
        asset.name
      )) }) })
    ] })
  ] });
}
export {
  AssetsPage as default
};
