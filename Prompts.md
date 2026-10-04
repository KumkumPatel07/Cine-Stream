# Cine-Stream - AI Usage & Development Prompts

## Project
Cine-Stream is a Next.js 15 movie discovery application migrated from a React/Vite SPA.

The project uses:
- Next.js 15
- React 19
- App Router
- TMDB API
- Server Components
- Client Components
- Next.js Image Optimization
- Dynamic Routes
- Dynamic SEO Metadata
- Browser localStorage for favorites

---

## Prompt 1 - Next.js Migration

I have an existing React/Vite movie application called Cine-Stream.
Help me migrate the project to Next.js 15 using the App Router.

Requirements:
- Use the App Router.
- Replace React Router routes with Next.js file-based routing.
- Keep the existing movie discovery functionality.
- Explain the migration step by step.

---

## Prompt 2 - Server Component Architecture

Explain how to fetch the initial TMDB popular movies directly inside a Next.js Server Component without using useEffect.

The homepage should fetch movie data on the server and pass the results to reusable movie components.

---

## Prompt 3 - Dynamic Movie Route

Create a Next.js App Router dynamic route for movie details using:

/movie/[id]

The movie ID should be used to fetch movie details from TMDB on the server.

---

## Prompt 4 - Dynamic SEO Metadata

Implement generateMetadata() for the dynamic movie details route.

The page title should contain the movie title and the meta description should use the movie overview.

---

## Prompt 5 - Server vs Client Components

Explain which Cine-Stream components should be Server Components and which should be Client Components.

Interactive features such as search input, favorite buttons, React state, and localStorage should use Client Components.

Movie data fetching should remain on the server where possible.

---

## Prompt 6 - TMDB API Debugging

Help debug a Next.js TMDB API request that works with IPv4 curl but fails with Node.js fetch due to network/DNS connection issues.

The solution should avoid exposing the TMDB API key in client-side code.

---

## Prompt 7 - Favorites Feature

Implement a favorite movie feature using a Client Component and browser localStorage.

The favorite button should:
- Add a movie to favorites.
- Remove a movie from favorites.
- Preserve favorites after page refresh.
- Display saved movies on a Favorites page.

---

## Prompt 8 - Search Feature

Implement movie search using the TMDB search endpoint.

The search input should be interactive on the client, while the search results should be fetched and rendered using the Next.js App Router.

The search URL should use:

/search?q=movie-name

---

## Prompt 9 - Loading and Error Handling

Add Next.js loading and error UI using:

loading.js
error.js

The loading UI should appear while movie data is being fetched and the error UI should provide a retry option.

---

## Prompt 10 - UI Debugging

Help improve the Cine-Stream interface while preserving the existing functionality.

The UI should:
- Be responsive.
- Have consistent movie cards.
- Have a professional navigation bar.
- Have a usable search bar.
- Have a clean movie details page.
- Provide clear favorite button styling.

---

## AI Usage Note

AI assistance was used for:
- Understanding Next.js App Router concepts.
- Debugging development errors.
- Understanding Server and Client Component boundaries.
- Troubleshooting TMDB API connectivity.
- Structuring dynamic routes and metadata.
- Debugging the favorites and search implementations.
- Improving UI responsiveness and styling.

All implementation was reviewed and tested during development.