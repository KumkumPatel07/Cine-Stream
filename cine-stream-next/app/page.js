import { getPopularMovies } from "../lib/tmdb";
import MovieGrid from "../components/MovieGrid";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Cine-Stream | Discover Popular Movies",
  description:
    "Discover popular movies, explore movie details, and save your favorite films with Cine-Stream.",
};

export default async function Home() {
  const data = await getPopularMovies();

  return (
    <>
      <Navbar />

      <main>
        <h1>Discover Movies</h1>
        <p className="page-subtitle">
          Explore popular movies powered by TMDB.
        </p>

        <MovieGrid movies={data.results} />
      </main>
    </>
  );
}