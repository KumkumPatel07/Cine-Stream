import { getMovie } from "../../../lib/tmdb";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} | Cine-Stream`,
    description:
      movie.overview || `Explore ${movie.title} on Cine-Stream.`,
  };
}

export default async function MovieDetails({ params }) {
  const { id } = await params;

  const movie = await getMovie(id);

  return (
    <main className="movie-details">
      <h1>{movie.title}</h1>

      {movie.tagline && (
        <p className="tagline">{movie.tagline}</p>
      )}

      <p>{movie.overview}</p>

      <div className="movie-meta">
        <p>⭐ Rating: {movie.vote_average?.toFixed(1)}</p>
        <p>📅 Release Date: {movie.release_date}</p>
        <p>🎬 Runtime: {movie.runtime} minutes</p>
      </div>
    </main>
  );
}