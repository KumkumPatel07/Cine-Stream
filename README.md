# 🎬 Cine-Stream

Cine-Stream is a Netflix-style movie discovery web application built with React and Vite. It allows users to discover popular movies, search for movies, continuously browse results, save favorites, and get AI-powered movie recommendations based on their mood.

## 🚀 Live Demo

🔗 Live Demo: [live url](https://cine-stream-two-alpha.vercel.app/)

## 📂 GitHub Repository

🔗 GitHub: https://github.com/KumkumPatel07/Cine-Stream

---

## ✨ Features

### 🎥 Movie Discovery

- Fetches popular movies from TMDB.
- Displays movie posters, titles, release years, and ratings.
- Responsive movie grid layout.
- Handles movies without available posters.

### 🔎 Movie Search

- Search movies using the TMDB API.
- Search requests use a 500ms debounce to avoid unnecessary API calls.
- Search results are dynamically displayed.

### ♾️ Infinite Scroll

- Uses the IntersectionObserver API.
- Automatically loads the next page when the user reaches the bottom.
- Prevents duplicate movies from being added.
- Continues loading until all available TMDB pages are reached.

### ❤️ Favorites

- Add or remove movies using the favorite button.
- Favorites are stored in browser localStorage.
- Favorites remain available after refreshing the page.
- Dedicated `/favorites` route for saved movies.

### 🖼️ Lazy Loading

Movie posters use native browser lazy loading:

```html
loading="lazy"