# Copenhagen Live 2026

Event website for Copenhagen Live 2026, a full day of live virtual air traffic control across Copenhagen and Danish airspace, organised by VATSIM Scandinavia.

## Requirements

- Node.js 22.12 or newer
- pnpm

## Development

Install dependencies:

```sh
pnpm install
```

Start Astro's background development server:

```sh
pnpm exec astro dev --background
```

Manage the server with:

```sh
pnpm exec astro dev status
pnpm exec astro dev logs
pnpm exec astro dev stop
```

## Quality checks

```sh
pnpm check
pnpm lint
pnpm format:check
pnpm build
```

The production site is generated in `dist/`.

## Routes

- `/` — event landing page
- `/briefings/departure` — step-by-step departure briefing
- `/briefings/arrival` — step-by-step arrival briefing
- `404.astro` — custom not-found page
