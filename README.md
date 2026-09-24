# Safequence

A premium, black/near-black React marketing site for Safequence, a cybersecurity
testing and assessment consultancy.

## Stack

- React 19 + Vite
- React Router v7
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Framer Motion for interaction and scroll reveals

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Structure

```
src/
  components/   shared UI: Navbar, Footer, hero surfaces, diagrams, forms
  pages/        Home, WebVapt, M365Security, CloudSecurity, ApiSecurity, Contact
  data/         services.js — single source of truth for service copy,
                the five-stage methodology, and the wider capability list
  lib/Seo.jsx   lightweight per-page <title>/meta/canonical manager
```

## Logo

No logo asset was supplied with this build. `public/logo.svg` is a placeholder
wordmark used across the navbar and footer via `src/components/Logo.jsx`.
Replace `public/logo.svg` with the real Safequence mark (same filename) to swap
it in everywhere at once — no other code changes needed.

## Content

Service copy, the methodology stages, and the "additional capabilities" list
live in `src/data/services.js`. Only Web VAPT, M365 Security, Cloud Security
and API Security have dedicated routes, per the brief; the other 12 services
from the wider catalog surface as a supporting list on the homepage.

The contact form (`src/components/ContactForm.jsx`) currently just shows a
confirmation state on submit — wire `handleSubmit` up to your lead-intake
endpoint or CRM webhook before going live.
