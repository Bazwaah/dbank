# Design Brief

## Direction

DBANK — a professional decentralized banking DApp with clean, editorial aesthetics emphasizing transparency and trust.

## Tone

Dark editorial with fintech authority. No decoration; precision and clarity drive every interaction. Inspiration: Ledger dashboard, MetaMask UI. Professional confidence without corporate coldness.

## Differentiation

Consistent use of teal as the primary action color (signals tech + trust) with warm amber reserved exclusively for yield/profit indicators, creating instant visual feedback on financial outcomes.

## Color Palette

| Token            | OKLCH           | Role                               |
| ---------------- | --------------- | ---------------------------------- |
| background       | 0.12 0.02 270   | Dark charcoal base (dark mode)     |
| foreground       | 0.92 0.01 260   | High contrast text (dark mode)     |
| card             | 0.16 0.02 270   | Card surface, elevated layer       |
| primary          | 0.72 0.18 190   | Teal action, deposits, interactions|
| accent           | 0.72 0.15 85    | Warm amber for yields and profits  |
| destructive      | 0.65 0.19 22    | Red for withdrawals and warnings   |
| muted            | 0.22 0.02 270   | Secondary surfaces, dividers       |
| border           | 0.26 0.02 270   | Subtle section dividers            |

## Typography

- Display: Space Grotesk — technical confidence for headings and hero metrics
- Body: DM Sans — clean and efficient for labels, body text, and UI
- Mono: JetBrains Mono — transaction hashes, contract addresses
- Scale: hero `text-6xl md:text-7xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-xs uppercase font-semibold`, body `text-base`

## Elevation & Depth

Surface hierarchy defined by background shifts (no lift shadows). Card layers shift from dark background (0.12) to card surface (0.16) with 1px subtle shadows for focus states only.

## Structural Zones

| Zone    | Background           | Border              | Notes                                      |
| ------- | -------------------- | ------------------- | ------------------------------------------ |
| Header  | card (0.16)          | border (0.26 0.02)  | Logo, user principal, logout button        |
| Sidebar | card (0.16)          | border (0.26 0.02)  | Navigation tabs: Dashboard, Deposit, etc.  |
| Content | background (0.12)    | —                   | Full bleed, alternating card sections      |
| Footer  | background (0.12)    | border (0.26 0.02)  | Optional transaction count or net worth    |

## Spacing & Rhythm

Section gaps at 2rem (32px). Content grouping via card layers with 1rem padding between sections. Micro-spacing: 4px for inline elements, 8px for component internals. Data tables use compact density (8px padding).

## Component Patterns

- Buttons: rounded-lg, teal primary bg, white text, hover:opacity-90, active:ring-2 ring-offset
- Cards: rounded-lg bg-card, border-border, shadow-card on hover
- Badges: inline-flex rounded-full, accent badge for APY rates, success badge for confirmed transactions
- Inputs: bg-input border-border rounded-md, focus:ring-primary/50

## Motion

- Entrance: fade-in over 150ms on page load, stagger child elements +50ms each
- Hover: smooth opacity/scale transition 200ms on interactive elements, no bounce
- Decorative: subtle pulse on active transaction indicator

## Constraints

- No full-page gradients or ambient effects
- Maximum 3 color values in use per section (background, foreground, accent)
- Data-first layout; decoration must serve information hierarchy
- Dark mode is primary; light mode optional future consideration
- High contrast maintained for accessibility (AA+ on all text)

## Signature Detail

Consistent amber highlighting of APY yield values throughout the interface, signaling financial gain as a primary cognitive anchor.
