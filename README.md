# Growth Capital Flow

Growth Capital Flow is a React + Vite single page application that demonstrates how subscription businesses can convert their
recurring revenue into upfront growth capital. The experience includes a detailed funding calculator, underwriting education,
and an application workflow tailored for finance teams.

## Highlights

- **Funding simulator** – model churn, recovery, and advance scenarios with break-even insights and sensitivity analysis.
- **Go-to-market storytelling** – showcase strategic use cases, operating principles, and risk controls for non-dilutive
  financing.
- **Application readiness** – capture the data points lenders need through a structured intake form and guidance cards.

## Tech stack

- [React 18](https://react.dev/) with TypeScript for a type-safe component architecture.
- [Vite](https://vitejs.dev/) for ultra-fast development and production builds.
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for composable, accessible UI primitives.
- [TanStack Query](https://tanstack.com/query/latest) prepared for future data fetching enhancements.

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   ```
4. **Preview the production build**
   ```bash
   npm run preview
   ```

The project targets modern evergreen browsers. Node.js 18+ is recommended for local development.

## Project structure

```
src/
  assets/                # Static images and illustrations
  components/
    calculator/          # Reusable calculator-specific UI blocks
    layout/              # Navigation, footer, and shared layout elements
    ui/                  # shadcn/ui primitives
  hooks/                 # Custom React hooks for shared logic
  lib/                   # Domain utilities such as calculator math helpers
  pages/                 # Top-level route views (Home, Calculator, Apply, etc.)
```

Key architectural practices:

- **Composable domain logic** – complex calculator logic lives in `src/lib/calculator.ts`, enabling reuse in hooks, tests, or
  future APIs.
- **Stateful hooks** – UI state is abstracted by `src/hooks/use-funding-calculator.ts` to keep React components declarative.
- **Presentational components** – cards, tables, and grids in `src/components/calculator/` encapsulate layout concerns.

## Code style & quality

- The repository ships with [ESLint](https://eslint.org/) configured for React and TypeScript. Run `npm run lint` before
  opening pull requests.
- Tailwind utility classes are organised for readability; multi-line attributes are preferred when class strings grow long.
- Components include descriptive comments to document intent and aid future contributors.
- Avoid side-effectful logic in components; move calculations into hooks or `lib/` helpers for easier testing.

## Testing ideas

Automated tests are not included yet, but the modular architecture makes it straightforward to add:

- Unit tests for `src/lib/calculator.ts` using [Vitest](https://vitest.dev/) to validate funding scenarios.
- Component tests for key UI flows with [Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- End-to-end flows with [Playwright](https://playwright.dev/) once backend integrations exist.

## Deployment notes

The app produces a static build with `npm run build`. Host the generated `dist/` directory on any modern static hosting
platform (Netlify, Vercel, Render, etc.). Configure HTTPS and caching headers according to your platform’s best practices.
