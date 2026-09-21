import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import {
  getFavorites,
  toggleFavorite,
} from "../utils/favorites";

function Favorites() {
  const [favorites, setFavorites] = useState(
    getFavorites()
  );

  function handleToggleFavorite(movie) {
    const updatedFavorites =
      toggleFavorite(movie);

    setFavorites(updatedFavorites);
  }

  return (
    <main>
      <section className="page-heading">
        <p className="eyebrow">
          YOUR COLLECTION
        </p>

        <h1>My Favorites</h1>

        <p>
          Movies you've saved for later.
        </p>
      </section>

      <MovieGrid
        movies={favorites}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  );
}

export default Favorites;

const FAVORITES_KEY = "cine-stream-favorites";

export function getFavorites() {
  try {
    const storedFavorites =
      localStorage.getItem(FAVORITES_KEY);

    return storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
  } catch (error) {
    console.error("Failed to read favorites", error);
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(favorites)
  );
}

export function toggleFavorite(movie) {
  const favorites = getFavorites();

  const alreadyFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );

  let updatedFavorites;

  if (alreadyFavorite) {
    updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== movie.id
    );
  } else {
    updatedFavorites = [...favorites, movie];
  }

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

