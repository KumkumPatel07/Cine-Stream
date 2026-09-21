import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  favorites,
  onToggleFavorite,
}) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>No movies found</h2>
        <p>Try searching for another movie.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.some(
            (favorite) => favorite.id === movie.id
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;