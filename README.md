# Dev — Employee Portal

This folder contains the employee portal web app used to list jobs and allow employees to apply from the frontend.

The app is a Next.js (App Router) + TypeScript application with a small component library and a client-side drawer used to show the apply form.

## Tech stack

- Next.js (App Router)
- React 19 + TypeScript
- Tailwind CSS
- vaul (drawer primitives)
- Radix UI primitives (used by UI components)
- lucide-react (icons)
- react-hook-form + `@hookform/resolvers` (form handling)
- zod (schema validation)
- zustand (lightweight state when needed)

You can see the precise versions in `package.json`.

## Local setup

1. Install dependencies

```bash
cd dev_employee_portal
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## How to use

- Navigate to the jobs list (home page) and click the `Apply` button on any job.
- The HOC `withApplyDrawer` opens the `Drawer` and renders `ApplyForm` (or any custom `renderDrawerContent` you pass).

## Common notes & tips

- If you pass `renderDrawerContent` to the HOC, it will receive the `job` as the first argument. Make the child component accept `job?: JobListProps` (optional) or ensure the HOC only calls the renderer when a job is present.
- For complex forms prefer `react-hook-form` + `zod` for typed validation and better UX.
- File inputs should be handled as `File` objects (upload via FormData) rather than controlled string values.

## Build & deploy

Build for production:

```bash
npm run build
npm start
```

Deploy as any Next.js site (Vercel is recommended for minimal configuration).
