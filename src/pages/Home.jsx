import { useCallback, useEffect, useRef, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";
import {
  getFavorites,
  toggleFavorite,
} from "../utils/favorites";

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    getFavorites()
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

  const loadMovies = useCallback(
    async (pageNumber, searchQuery = "") => {
      try {
        setLoading(true);
        setError("");

        const data = searchQuery
          ? await searchMovies(searchQuery, pageNumber)
          : await getPopularMovies(pageNumber);

        setMovies((previousMovies) => {
          if (pageNumber === 1) {
            return data.results;
          }

          const existingIds = new Set(
            previousMovies.map((movie) => movie.id)
          );

          const newMovies = data.results.filter(
            (movie) => !existingIds.has(movie.id)
          );

          return [...previousMovies, ...newMovies];
        });

        setHasMore(pageNumber < data.total_pages);
      } catch (error) {
        console.error(error);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading
          ) {
            setPage((previousPage) => {
              const nextPage = previousPage + 1;

              loadMovies(nextPage, query);

              return nextPage;
            });
          }
        },
        {
          rootMargin: "300px",
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, query, loadMovies]
  );

  function handleSearch(searchQuery) {
    setQuery(searchQuery);
    setPage(1);
    setHasMore(true);

    loadMovies(1, searchQuery);
  }

  function handleToggleFavorite(movie) {
    const updatedFavorites =
      toggleFavorite(movie);

    setFavorites(updatedFavorites);
  }

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">
          YOUR MOVIE DISCOVERY PLATFORM
        </p>

        <h1>
          Discover your next
          <span> favorite movie.</span>
        </h1>

        <p className="hero-description">
          Explore popular movies, search thousands of
          titles and create your personal watchlist.
        </p>

        <SearchBar onSearch={handleSearch} />
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

      {loading && (
        <div className="loading">
          Loading movies...
        </div>
      )}

      {!loading && hasMore && (
        <div
          ref={lastMovieRef}
          className="scroll-trigger"
        />
      )}

      {!hasMore && movies.length > 0 && (
        <p className="end-message">
          You've reached the end of the results.
        </p>
      )}
    </main>
  );
}

export default Home;