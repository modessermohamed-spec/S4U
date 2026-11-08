# S4U — Sudan for You (Prototype v4)

Bilingual (Arabic RTL / English LTR) marketplace prototype for local professionals in Sudan. Next.js 15, TypeScript, plain CSS.

## Status: DEMO MODE
- No real accounts, no database, no uploads, no payments, no identity verification.
- Sign-up / log-in forms validate input in the browser only. Nothing is sent or stored.
- All profiles are fictional examples and marked as such. No ratings, no "verified" badges.

## Pages
| Route | Content |
|---|---|
| `/` | Home: search, categories, area filter, example profiles, trust roadmap |
| `/pros/[id]` | Professional profile + demo request form |
| `/register` | Choose role (customer / professional) |
| `/register/customer` | Customer sign-up (demo) |
| `/register/pro` | 4-step professional sign-up with work-sample preview and profile preview (demo) |
| `/login` | Log-in and password reset (demo) |

## Structure
- `lib/i18n.tsx` – language context (AR/EN, RTL/LTR, saved in localStorage)
- `lib/data.ts` – categories, cities, example profiles (demo only)
- `lib/verification.ts` – verification statuses (must only be changed server-side later)
- `lib/auth.ts` – auth interface; demo provider now, Supabase later; shared validation
- `components/` – UI building blocks and form fields

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build check
```

## Next: Supabase
Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`), then implement the Supabase provider in `lib/auth.ts`, tables with row-level security, and server-side verification status changes. Until then the app stays in demo mode.
