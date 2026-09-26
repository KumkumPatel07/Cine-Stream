import { getPopularMovies } from "../lib/tmdb";
import MovieGrid from "../components/MovieGrid";

export default async function Home() {
  const data = await getPopularMovies();

  return (
    <main>
      <h1>Cine-Stream</h1>

      <h2>Popular Movies</h2>

      <MovieGrid movies={data.results} />
    </main>
  );
}