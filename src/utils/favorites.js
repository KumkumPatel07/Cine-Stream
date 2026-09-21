const FAVORITES_KEY = "cine-stream-favorites";

export function getFavorites() {
  try {
    const storedFavorites =
      localStorage.getItem(FAVORITES_KEY);

    return storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
  } catch (error) {
    console.error(
      "Failed to read favorites:",
      error
    );

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

  const updatedFavorites = alreadyFavorite
    ? favorites.filter(
        (favorite) => favorite.id !== movie.id
      )
    : [...favorites, movie];

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}