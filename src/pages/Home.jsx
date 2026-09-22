import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import MoodMatcher from "../components/MoodMatcher";

import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";
import {
  getFavorites,
  toggleFavorite,
} from "../utils/favorites";

function handleMoodMovie(movieTitle) {
  console.log("AI suggested:", movieTitle);

  setQuery(movieTitle);
  setMovies([]);
  setHasMore(false);
  pageRef.current = 1;

  loadMovies(1, movieTitle);
}

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(getFavorites());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const observerRef = useRef(null);

  // LOAD MOVIES
  const loadMovies = useCallback(
    async (pageNumber, searchQuery = "") => {
      // Prevent multiple API requests at the same time
      if (loadingRef.current) return;

      loadingRef.current = true;
      setLoading(true);
      setError("");

      try {
        const data = searchQuery
          ? await searchMovies(searchQuery, pageNumber)
          : await getPopularMovies(pageNumber);

        const newMovies = data.results || [];

        setMovies((previousMovies) => {
          // First page = replace old movies
          if (pageNumber === 1) {
            return newMovies;
          }

          // Remove duplicate movies
          const existingIds = new Set(
            previousMovies.map((movie) => movie.id)
          );

          const uniqueMovies = newMovies.filter(
            (movie) => !existingIds.has(movie.id)
          );

          return [...previousMovies, ...uniqueMovies];
        });

        setHasMore(pageNumber < data.total_pages);
        pageRef.current = pageNumber;
      } catch (error) {
        console.error("Movie loading error:", err);
        setError(error.message || "Unable to load movies.");
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    []
  );

  // FIRST LOAD
  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  // INFINITE SCROLL
  const lastMovieRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !loadingRef.current &&
            hasMore
          ) {
            const nextPage = pageRef.current + 1;

            loadMovies(nextPage, query);
          }
        },
        {
          rootMargin: "200px",
        }
      );

      observerRef.current.observe(node);
    },
    [hasMore, query, loadMovies]
  );

  // SEARCH
  function handleSearch(searchQuery) {
    setQuery(searchQuery);
    setMovies([]);
    setHasMore(true);
    pageRef.current = 1;

    loadMovies(1, searchQuery);
  }

  // FAVORITES
  function handleToggleFavorite(movie) {
    const updatedFavorites = toggleFavorite(movie);
    setFavorites(updatedFavorites);
  }

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">CINE-STREAM</p>

        <h1>Discover Your Next Movie</h1>

        <p>
          Search popular movies and save your favorites.
        </p>

        <SearchBar onSearch={handleSearch} />

        <MoodMatcher onMovieFound={handleMoodMovie} />

      </section>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <MovieGrid
        movies={movies}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Infinite scroll trigger */}
      <div
        ref={lastMovieRef}
        style={{
          height: "40px",
          marginTop: "20px",
        }}
      />

      {loading && (
        <p className="loading-message">
          Loading movies...
        </p>
      )}

      {!hasMore && movies.length > 0 && (
        <p className="loading-message">
          No more movies to load.
        </p>
      )}
    </main>
  );
}

export default Home;