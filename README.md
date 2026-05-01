# Lime DB — Documentation Website

Official documentation site for **Lime DB**, a browser-native vector database. Built with React + TypeScript + Vite and deployed to GitHub Pages.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Static type checking |
| Vite | Build tool and dev server |
| React Router 7 | Client-side routing |
| TanStack Query v5 | Server state management |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui + Radix UI | Accessible component primitives |
| Motion + Animate UI | Animations |
| Vitest | Unit testing |
| Biome + Ultracite | Linting and formatting |
| Husky | Git hooks |

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/docs/introduction` | What is Lime DB |
| `/docs/quick-start` | Installation and first steps |
| `/docs/architecture` | How Lime DB works internally |
| `/docs/concepts` | Chunking, embeddings, and similarity |
| `/docs/api-reference` | Full `BrowserVectorDB` API |
| `/docs/indexeddb` | Persistence with IndexedDB |

## Project Structure

```
src/
├── @types/       # Shared TypeScript type declarations
├── api/          # API layer organized by feature
│   └── [feature]/
│       ├── queries/    # TanStack Query hooks
│       └── mutations/  # TanStack Query mutations
├── components/
│   ├── ui/         # shadcn/ui primitives
│   ├── animate-ui/ # Animated components
│   ├── code-block/ # Syntax-highlighted code blocks
│   ├── doc-header/ # Top navigation bar
│   ├── doc-sidebar/# Docs sidebar navigation
│   └── lime-logo/  # Lime DB logo SVG component
├── config/       # App-level configuration
├── constants/    # Shared constants (nav items, etc.)
├── contexts/     # React contexts (theme)
├── hooks/        # Custom React hooks
├── layout/       # Root and doc layouts
├── lib/          # Utility functions
├── pages/        # Route-level pages
├── providers/    # App-wide providers
├── routes/       # Route definitions
├── tests/        # Vitest test files
└── utils/        # General-purpose utilities
```

## Getting Started

```bash
git clone https://github.com/giovani/lime-webpage
cd lime-webpage
bun install
bun dev
```

## Scripts

| Command | Description |
|---|---|
| `bun dev` | Start dev server |
| `bun build` | Production build |
| `bun preview` | Preview production build locally |
| `bun check` | Lint and type-check with Biome |
| `bun fix` | Auto-fix lint issues |
| `bun test` | Run tests with Vitest |

## Deployment

Automatically deployed to GitHub Pages on every push to `main` via GitHub Actions. The workflow builds the site with `VITE_BASE_PATH=/lime-webpage/` and copies `index.html` to `404.html` for SPA routing support.

