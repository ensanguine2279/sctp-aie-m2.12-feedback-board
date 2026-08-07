## Assignment Description

Build an **Event Feedback Board**: a small app where visitors can browse a list of talks from a conference, open a detail page for each talk, and filter the talk list by track. Data comes from a local json-server instance, the same tool used in the lesson.

This project is intentionally separate from the CRM so you can apply the Server Component and routing patterns to a different domain without copying the lab code directly.

### What You Will Build

A multi-page Next.js application that:

- Lists all talks at `/talks`, fetched from json-server inside a Server Component
- Shows a talk detail page at `/talks/:id` using a dynamic route segment
- Shows a loading spinner while each page's data is being fetched
- Shows an error page with a retry button if json-server is unreachable
- Lets a visitor filter the talk list by track using a Client Component, without a new network request

## How To Install And Run

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Both NextJS and JSON servers must be running.

Open the app at the local URL shown in your terminal (i.e. `http://127.0.0.1:5173` or similar).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run JSON server

```bash
npm run server
```

<br/>

## Notes

### Speaker photo on talk details page

- A `utils\getRandomSpeakerPhoto` utility function was created to help fetch a random URL of a person's photo from `https://randomuser.me/api`

- If the API fails, the function return a fallback avatar image URL `/images/default-avatar.png`

### Recovering when `json-server` is down

- The error (`json-server` stopped) is happening in the Server Component work, not just local client state.

- Sometimes the server-side payload/cache state remains, effectively, the same (even after `reset()`), this causes the app to fall back into the same failure.

- In these cases, refreshing the React Server Component (RSC) with `router.refresh()` helps because it:
  1. Requests a new Server Component payload for the current route.
  2. Re-runs server data fetching for that route segment.
  3. Revalidates against current backend state (for example, API recovered, env fixed, remote image source available).
  4. Makes retry behavior closer to what a full browser reload does, but inside Next navigation.

### Talk list loading

[![Watch talk list loading demo on YouTube](https://img.shields.io/badge/Watch%20talk%20list%20loading%20demo%20on%20YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/j6d0lF260C8)

### Loading spinner appearing when network throttled

[![Watch loading spinner demo on YouTube](https://img.shields.io/badge/Watch%20loading%20spinner%20demo%20on%20YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/QvfsQc9lC5Y)

<br/>

<details>
      <summary>Assignment Details</summary>

## Requirements

### Core Requirements

#### 1. Project Setup

- [ ] Scaffold the project: `npx create-next-app@15 feedback-board`, answering the prompts the same way as the lesson (No TypeScript, Yes ESLint, No Tailwind, No `src/` directory, Yes App Router, Yes Turbopack, No import alias)
- [ ] Install json-server as a dev dependency: `npm install --save-dev json-server`
- [ ] No other data-fetching or state-management libraries; use plain `fetch` and `useState`, the same as the lesson

#### 2. Mock Data

Create `data/db.json` with the following shape:

```json
{
  "talks": [
    {
      "id": "1",
      "title": "Server Components in Practice",
      "speaker": "Mei Ling",
      "track": "Frontend",
      "abstract": "A tour of what changes when data fetching moves to the server."
    },
    {
      "id": "2",
      "title": "Designing REST APIs That Last",
      "speaker": "Arjun Patel",
      "track": "Backend",
      "abstract": "Lessons from ten years of versioning APIs without breaking clients."
    },
    {
      "id": "3",
      "title": "State Management Without the Ceremony",
      "speaker": "Farah Osman",
      "track": "Frontend",
      "abstract": "When Context is enough, and when it is not."
    },
    {
      "id": "4",
      "title": "Zero-Downtime Database Migrations",
      "speaker": "Wei Jie Tan",
      "track": "Backend",
      "abstract": "A practical checklist for changing schema under live traffic."
    },
    {
      "id": "5",
      "title": "Accessible by Default",
      "speaker": "Priya Nair",
      "track": "Design",
      "abstract": "Building components that pass an audit without a separate accessibility pass."
    },
    {
      "id": "6",
      "title": "Design Tokens Across Platforms",
      "speaker": "Daniel Goh",
      "track": "Design",
      "abstract": "Keeping a single source of truth for colour and spacing across web and mobile."
    }
  ]
}
```

Add a `server` script alongside `dev` in `package.json`, the same as the lesson:

```json
"scripts": {
  "dev": "next dev",
  "server": "json-server --watch data/db.json --port 3001",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

#### 3. Environment Variable

- [ ] Create `.env.local` with `API_BASE_URL=http://localhost:3001`, no `NEXT_PUBLIC_` prefix, since every `fetch` call runs on the server
- [ ] Add `.env.local` to `.gitignore`

#### 4. Routes to Create

| Path         | File                     | Behaviour                                                            |
| ------------ | ------------------------ | -------------------------------------------------------------------- |
| `/`          | `app/page.js`            | Short homepage with a heading and a link to `/talks`                 |
| `/talks`     | `app/talks/page.js`      | Server Component; fetches all talks; renders `TrackFilter`           |
| `/talks/:id` | `app/talks/[id]/page.js` | Server Component; fetches one talk by `id`                           |
| n/a          | `app/talks/loading.js`   | Shown while `/talks` or `/talks/:id` is fetching                     |
| n/a          | `app/talks/error.js`     | Shown if a fetch throws; includes a "Try again" button using `reset` |

`loading.js` and `error.js` placed directly inside `app/talks/` apply to both `/talks` and `/talks/:id`, since the App Router walks up to the nearest ancestor with one; a nested `error.js` under `app/talks/[id]/` is only needed if the two routes should show different error messages, which this assignment does not require.

#### 5. Shared Layout

- [ ] Create `app/talks/layout.js` with a simple header (site title, a link back to `/`) that wraps both `/talks` and `/talks/:id`
- [ ] The root layout (`app/layout.js`) should only set the `metadata` title and description; the talks-specific header belongs in the nested layout, not the root, the same reasoning the lesson used for keeping `CrmLayout` out of `app/layout.js`

#### 6. The Talk List Page

- [ ] `app/talks/page.js` fetches `${process.env.API_BASE_URL}/talks` and passes the array to a Client Component, `TrackFilter`
- [ ] `TrackFilter` (`'use client'`) holds the selected track in `useState`, defaulting to "All"
- [ ] Render a row of buttons or a `<select>` for the distinct tracks found in the data, plus an "All" option
- [ ] Filtering happens against the data already in memory; no new `fetch` call runs when the track changes
- [ ] Each talk in the filtered list links to `/talks/:id`

#### 7. The Talk Detail Page

- [ ] `app/talks/[id]/page.js` reads the `id` from `params` (remember: `params` is a `Promise` in Next.js 15, `await` it)
- [ ] Fetches `${process.env.API_BASE_URL}/talks/${id}` and displays the title, speaker, track, and abstract
- [ ] Includes a link back to `/talks`

#### 8. Loading and Error States

- [ ] `app/talks/loading.js` renders a simple spinner or "Loading talks..." message
- [ ] `app/talks/error.js` is a Client Component (`'use client'`) that receives `error` and `reset` as props, displays `error.message`, and calls `reset` from a button
- [ ] Verify the loading state by throttling the Network tab to "Slow 3G" and reloading `/talks`
- [ ] Verify the error state by stopping json-server, reloading `/talks`, confirming the error page appears, then restarting json-server and clicking "Try again"

### Stretch Goals

- [ ] Add a search input to `TrackFilter` (or a sibling Client Component) that filters by title or speaker name, combined with the track filter
- [ ] Add `app/talks/[id]/loading.js` and give it a different message than `app/talks/loading.js`, to see the App Router pick the more specific one
- [ ] Add a `favouriteCount` field to each talk in `db.json` and a "Most popular" sort option in `TrackFilter`
- [ ] Add `next/image` for a speaker photo on the detail page, supplying `width` and `height`
- [ ] Add page-specific `metadata` (`title`, `description`) to `app/talks/page.js` and `app/talks/[id]/page.js`, generated from the talk's own title

## Deliverables

- GitHub repository link (or ZIP file) submitted to the course platform
- A `README.md` in the project root explaining how to install and run the project locally, including the reminder that `npm run server` and `npm run dev` must both be running at the same time
- Screenshots or a short screen recording demonstrating:
  - The talk list loading from json-server
  - The loading spinner appearing under throttled network conditions
  - The error page appearing when json-server is stopped, and recovering after "Try again"
  - Filtering the talk list by track without a page reload

## References

- [Next.js: App Router](https://nextjs.org/docs/app)
- [Next.js: Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Next.js: Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [json-server: GitHub](https://github.com/typicode/json-server)

</details>
