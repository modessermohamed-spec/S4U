# S4U — Sudan for You (Prototype)

Bilingual Arabic/English responsive handyman marketplace demo built with Next.js.

## Run locally
Install Node.js 20+ then:
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repository and push these files.
2. Import the repository into Vercel.
3. Select Next.js and deploy.

## Included
- Arabic (RTL) and English (LTR) language toggle, persisted in localStorage
- Category and location filters, text search
- Six **fictional** provider profiles with fixed-price and quote-only services
- Demo request form (no network calls, no stored submissions)
- Responsive mobile-first UI

## Not yet included
No real users, authentication, database, payments, messaging, identity verification, or live bookings. All profiles, ratings and prices are placeholders. Do not collect real personal data through this demo.

## Next milestone
Connect Supabase with row-level security, secure authentication, provider verification, quote requests, admin review and localization for all user-generated content. Validate availability of third-party services in Sudan before launch.


## Version 2 changes
- Visible demo disclosure on every page
- Trust and safety roadmap (all planned, not active)
- Clearer demo verification badges and honest marketing copy
- Mobile navigation and accessibility improvements
- CSS flex-end compatibility fix
