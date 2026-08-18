# Empowered Fishers of Men International Ministries (EFMI) — Website

Next.js 14 (App Router) + Tailwind CSS site for EFMI: informational content
about the ministry plus donation and membership sign-up forms.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+

## Setup

```bash
# 1. Unzip this project, then from inside the folder:
npm install

# 2. Run the dev server
npm run dev
```

Visit `http://localhost:3000`.

## Available scripts

| Command         | What it does                                      |
|-----------------|----------------------------------------------------|
| `npm run dev`   | Starts the local dev server with hot reload         |
| `npm run build` | Production build (`next build`) — run before deploy |
| `npm run start` | Serves the production build locally                 |
| `npm test`      | Runs the interaction test suite (Vitest)            |

## Project structure

```
src/
├── app/                    # Next.js App Router entry (layout.tsx, page.tsx)
├── components/
│   ├── layout/              # Navbar
│   └── sections/            # All page organisms (Hero, DonationForm, etc.)
│       └── *.test.tsx       # Interaction tests for the two forms
├── hooks/
│   └── useFormValidation.ts # Shared validators (email, KE phone, required, positive number)
├── styles/
│   └── globals.css          # Tailwind entrypoint + accessibility defaults
└── templates/
    └── HomepageTemplate.tsx # Assembles every section into the homepage

public/images/               # Hero image + field gallery photos
tailwind.config.ts           # Design tokens: charcoal/gold color system, fonts
```

## What's real vs. simulated

- **Donation and Membership forms**: full client-side state management and
  validation are real and tested (`npm test`). Submission currently
  `console.log`s the payload and shows a success screen — there is **no
  backend or payment processor wired up yet**.
- **Card fields in `DonationForm`**: UI only. Before taking real donations,
  replace that block with actual Stripe Elements or PayPal Buttons so raw
  card numbers never pass through this app's own state/console — this
  matters for PCI-DSS scope.
- **Footer contact info**: placeholder email/phone — update
  `src/components/sections/Footer.tsx` with real details.

## Deploying

The project is a standard Next.js app and deploys to Vercel, Netlify, or any
Node hosting that supports Next.js.

**Vercel (recommended, easiest):**
```bash
npm i -g vercel
vercel
```
Follow the prompts — it auto-detects Next.js and needs no config.

**Manual / other hosts:**
```bash
npm run build
npm run start   # serves on port 3000 by default
```

## Testing

```bash
npm test
```

Runs the interaction test suite: simulates real typing/clicking against
`DonationForm` and `MembershipRegistrationForm` to verify validation,
error-clearing, and the success flow — not just that the HTML renders.
