# Taha Azaghar — Portfolio

Personal portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.  
Terminal-style interface. SSR + SEO optimized. Deployed on Vercel.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- JetBrains Mono font

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Push to GitHub, then connect the repo on [Vercel](https://vercel.com).  
Zero config — Vercel auto-detects Next.js.

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout, metadata, fonts
    page.tsx          # Home page (assembles all sections)
    globals.css       # Global styles + Tailwind
  components/
    sections/         # One file per section
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
    ui/               # Reusable UI primitives
      Terminal.tsx    # The core terminal shell component
  lib/
    data.ts           # All content data (easy to edit)
public/
  cv.pdf              # ← Place your CV here
```

## Customization

All content lives in `src/lib/data.ts`. Edit that file to update  
your name, projects, skills, contact info — no hunting through components.

## License

MIT
