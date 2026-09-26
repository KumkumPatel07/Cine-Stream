"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite((current) => !current);
  }

  return (
    <button
      type="button"
      onClick={handleFavorite}
      className="favorite-button"
    >
      {favorite ? "❤️ Favorited" : "♡ Add to Favorites"}
    </button>
  );
}