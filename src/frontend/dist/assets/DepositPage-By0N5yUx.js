import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, T as TrendingUp, B as Button } from "./index-BBiQlMEL.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-DHA2fYkV.js";
import { I as Input, C as CircleCheck } from "./input-CvV4_NcL.js";
import { L as Label } from "./label-Dy-buveb.js";
import { u as useAccount, b as useDeposit, S as Skeleton } from "./useAccount-7GaYu0vw.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-_tgli1kS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const APY = 5.21;
function BalanceLine({
  account,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
    "Available:",
    " ",
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "inline-block h-3 w-20",
        "data-ocid": "deposit.loading_state"
      }
    ) : `${((account == null ? void 0 : account.balance) ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens`
  ] });
}
function DepositPage() {
  const { data: account, isLoading } = useAccount();
  const depositMutation = useDeposit();
  const [amountStr, setAmountStr] = reactExports.useState("");
  const [validationError, setValidationError] = reactExports.useState(null);
  const [lastDeposit, setLastDeposit] = reactExports.useState(null);
  const parsed = Number.parseFloat(amountStr) || 0;
  const estimatedYield = parsed * APY / 100;
  const handleAmountChange = (e) => {
    setAmountStr(e.target.value);
    setValidationError(null);
    setLastDeposit(null);
  };
  const handleBlur = () => {
    if (amountStr && (Number.isNaN(parsed) || parsed <= 0)) {
      setValidationError("Amount must be greater than 0.");
    }
  };
  const handleDeposit = async (e) => {
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
    }
  };
  const quickAmounts = [10, 50, 100, 500];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-6", "data-ocid": "deposit.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Deposit Assets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Earn ",
            APY,
            "% APY on your deposits, compounded automatically."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Deposit DBANK Tokens" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Funds are available instantly" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleDeposit, className: "space-y-5", noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "deposit-amount", className: "text-sm", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "deposit-amount",
                    type: "number",
                    placeholder: "0.00",
                    value: amountStr,
                    onChange: handleAmountChange,
                    onBlur: handleBlur,
                    className: "font-mono text-lg",
                    "data-ocid": "deposit.input",
                    min: "0",
                    step: "any",
                    disabled: depositMutation.isPending,
                    "aria-invalid": !!validationError,
                    "aria-describedby": validationError ? "deposit-amount-error" : void 0
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "shrink-0 text-xs text-primary border-primary/30",
                    onClick: () => setAmountStr(String((account == null ? void 0 : account.balance) ?? 0)),
                    disabled: depositMutation.isPending,
                    "data-ocid": "deposit.max_button",
                    children: "MAX"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BalanceLine, { account, isLoading }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: validationError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  id: "deposit-amount-error",
                  "data-ocid": "deposit.field_error",
                  role: "alert",
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  className: "text-xs text-destructive",
                  children: validationError
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: quickAmounts.map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `deposit.quick_amount.${amt}`,
                disabled: depositMutation.isPending,
                onClick: () => {
                  setAmountStr(String(amt));
                  setValidationError(null);
                  setLastDeposit(null);
                },
                className: "rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-smooth hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50",
                children: [
                  amt,
                  " DBANK"
                ]
              },
              amt
            )) }),
            parsed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-accent/20 bg-accent/5 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 13, className: "text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-semibold", children: "Yield Estimate" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Monthly" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold text-accent", children: [
                    "+",
                    (estimatedYield / 12).toFixed(4),
                    " DBANK"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Yearly" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold text-accent", children: [
                    "+",
                    estimatedYield.toFixed(4),
                    " DBANK"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: depositMutation.error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                "data-ocid": "deposit.error_state",
                role: "alert",
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
                children: depositMutation.error instanceof Error ? depositMutation.error.message : "Deposit failed. Please try again."
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lastDeposit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": "deposit.success_state",
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.3 },
                className: "flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-green-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-green-600 dark:text-green-400", children: "Deposit successful!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium", children: [
                        lastDeposit.amount.toFixed(2),
                        " DBANK Tokens"
                      ] }),
                      " ",
                      "deposited. New balance:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium", children: [
                        lastDeposit.newBalance.toFixed(2),
                        " DBANK Tokens"
                      ] }),
                      "."
                    ] })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full h-11 font-semibold",
                disabled: depositMutation.isPending || !amountStr,
                "data-ocid": "deposit.submit_button",
                children: depositMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-2",
                    "data-ocid": "deposit.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
                      "Processing…"
                    ]
                  }
                ) : `Deposit${parsed > 0 ? ` ${parsed.toLocaleString("en-US", { minimumFractionDigits: 2 })} DBANK Tokens` : ""}`
              }
            )
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.2 },
        className: "rounded-xl border border-border bg-card/60 p-5 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: "01" }),
              "Enter the amount you want to deposit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: "02" }),
              "Confirm the transaction with Internet Identity"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: "03" }),
              "Your balance updates instantly and starts earning yield"
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  DepositPage as default
};
