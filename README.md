# Visualize

Interactive educational MVP for explaining complex systems through one-page visual explainers. The current flagship route teaches **How a Jet Engine Works**, with additional explainers for AI, web delivery, GPS, and solar panels plus a transistor starter route.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Flow
- Motion

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local development
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript checks

## Main Routes

- `/` - landing page
- `/about` - project context
- `/concept/how-a-jet-engine-works` - flagship jet engine explainer
- `/concept/how-the-internet-delivers-a-web-page` - browser, network, and rendering walkthrough
- `/concept/how-gps-works` - timed-signal to map-position explainer
- `/concept/how-solar-panels-work` - sunlight-to-electricity explainer
- `/concept/how-ai-works` - AI walkthrough with a supporting concept map
- `/concept/how-a-transistor-works` - starter transistor route
