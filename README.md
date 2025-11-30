# GrayVally Website

**Digital Infrastructure Architects**

A minimal, high-performance single-page marketing site for GrayVally, built with Next.js 14, TypeScript, and Tailwind CSS.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typography**: Inter (UI) & JetBrains Mono (Code/Technical)
- **Animation**: Framer Motion
- **Language**: TypeScript

## Development

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the site.

## Project Structure

- `src/app/layout.tsx`: Root layout with font configurations (Inter/JetBrains Mono).
- `src/app/page.tsx`: Main landing page composition.
- `src/components/`: Reusable UI components (Hero, Services, Portfolio, etc.).
- `tailwind.config.ts`: Custom theme configuration (colors, fonts).

## Customization

- **Content**: Edit text in `src/components/*.tsx`.
- **Colors**: Adjust the `brand` and `accent` colors in `tailwind.config.ts`.
- **Fonts**: Font variables are defined in `src/app/layout.tsx`.
