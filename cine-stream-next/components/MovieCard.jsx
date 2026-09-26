import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <Link
        href={`/movie/${movie.id}`}
        className="movie-link"
      >
        <div className="poster-wrapper">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="movie-poster"
            />
          ) : (
            <div className="no-poster">
              No Poster
            </div>
          )}
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      </Link>
    </article>
  );
}