"use client";

import { useState } from "react";

export default function FavoriteButton({ movie }) {
  const [favorite, setFavorite] = useState(() => {
    if (typeof window === "undefined" || !movie) {
      return false;
    }

    const savedFavorites =
      JSON.parse(localStorage.getItem("cine-stream-favorites")) || [];

    return savedFavorites.some((item) => item.id === movie.id);
  });

  function handleFavorite() {
    if (!movie) return;

    const savedFavorites =
      JSON.parse(localStorage.getItem("cine-stream-favorites")) || [];

    if (favorite) {
      const updatedFavorites = savedFavorites.filter(
        (item) => item.id !== movie.id
      );

      localStorage.setItem(
        "cine-stream-favorites",
        JSON.stringify(updatedFavorites)
      );

      setFavorite(false);
    } else {
      const updatedFavorites = [
        ...savedFavorites,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
        },
      ];

      localStorage.setItem(
        "cine-stream-favorites",
        JSON.stringify(updatedFavorites)
      );

      setFavorite(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleFavorite}
      className="favorite-button"
    >
      {favorite ? "Favorited" : "Add to Favorites"}
    </button>
  );
}