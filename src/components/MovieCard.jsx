function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <article className="movie-card">
      <div className="poster-container">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            No Poster
          </div>
        )}

        <button
          className={`favorite-button ${
            isFavorite ? "active" : ""
          }`}
          onClick={() => onToggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>{year}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;