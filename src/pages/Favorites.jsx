import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import {
  getFavorites,
  toggleFavorite,
} from "../utils/favorites";

function Favorites() {
  const [favorites, setFavorites] =
    useState(getFavorites());

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