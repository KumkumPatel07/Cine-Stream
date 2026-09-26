import Image from "next/image";
import { getMovie } from "../../../lib/tmdb";
import FavoriteButton from "../../../components/FavoriteButton";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const movie = await getMovie(id);

  return {
    title: `${movie.title} | Cine-Stream`,
    description:
      movie.overview ||
      `Explore ${movie.title} on Cine-Stream.`,
  };
}

export default async function MovieDetails({ params }) {
  const { id } = await params;

  const movie = await getMovie(id);

  return (
    <main className="movie-details">
      <div className="movie-details-container">

        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="details-poster"
          />
        )}

        <div className="movie-details-content">

          <h1>{movie.title}</h1>

          {movie.tagline && (
            <p className="tagline">
              {movie.tagline}
            </p>
          )}

          <p className="overview">
            {movie.overview}
          </p>

          <div className="movie-meta">
            <p>
              ⭐ Rating: {movie.vote_average?.toFixed(1)}
            </p>

            <p>
              📅 Release Date: {movie.release_date}
            </p>

            <p>
              🎬 Runtime: {movie.runtime} minutes
            </p>
          </div>

          {/* Client Component */}
          <button
  type="button"
  style={{
    marginTop: "25px",
    padding: "12px 22px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  }}
>
  ♡ Add to Favorites
</button>

        </div>
      </div>
    </main>
  );
}