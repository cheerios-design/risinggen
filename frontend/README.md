# RisingGen Frontend

Next.js + Tailwind implementation of the RisingGen ministry-focused platform prototype (Homepage, Activity Calendar, Event Detail).

## Features Implemented

- App Router (Next 14) with pages:
  - `/` Hero + featured events + leader feature cards + purpose section
  - `/events` Activity calendar list view with grouped months, search UI scaffold, action buttons
  - `/events/[id]` Static pre-rendered detail pages (generateStaticParams)
- Component library seeds: NavBar, Footer, EventCard, TagList
- Data layer: In-memory `events.ts` sample records aligned to design screenshot (multi-language, accessibility tags, multi-day conference)
- Styling: Tailwind, custom utilities (container-safe, gradient hero), semantic tokens, soft shadows
- SEO: next-seo default config template

## Getting Started

Install dependencies and run dev server.

```bash
pnpm install # or npm install / yarn
pnpm dev
```

Open https://localhost:3000

## Next Steps (Suggested)

1. Filtering logic linking to query params (country, type, language, date range)
2. Month/Calendar view (grid) toggle & persistent view preference
3. i18n (next-intl) + dynamic language switcher
4. Authentication & protected organizer routes (NextAuth / custom) + role-based UI
5. Registration workflow (wizard, form schema, conditional questions)
6. Payments (Stripe / placeholder) & stewardship ledger
7. CMS / Admin tool for event creation (tRPC or route handlers + Prisma)
8. Accessibility audits (axe / storybook) & keyboard navigation refinements
9. Analytics instrumentation (privacy-first) for ministry metrics
10. Theming (light/dark) & print-friendly event summary view

## Tech Choices Rationale

- Next App Router for server components & static generation of events; easily expandable to dynamic data sources
- Tailwind for rapid ministry-aligned design tokens & responsive layout
- `lucide-react` icon system (tree-shakable)
- Radix primitives (dropdown / future popovers for filters) – hooks prepared via deps

## Data Model Snapshot

See `lib/data/events.ts` for `EventRecord` shape. Extend with:

- `registrationOpen`, capacity, waitlist
- safeguarding flags, inclusion descriptors, translation status
- engagement metrics (impressions, interest submissions)

## License

Internal prototype artifact derived from RisingGen strategic documents.
