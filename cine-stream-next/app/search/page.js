import { searchMovies } from "../../lib/tmdb";
import MovieGrid from "../../components/MovieGrid";
import Navbar from "../../components/Navbar";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  return {
    title: query
      ? `Search results for "${query}" | Cine-Stream`
      : "Search Movies | Cine-Stream",

    description: query
      ? `Explore movie search results for "${query}" on Cine-Stream.`
      : "Search and discover movies on Cine-Stream.",
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";

  return (
    <>
      <Navbar />

      <main>
        <h1>Search Movies</h1>

        {!query ? (
          <p className="page-subtitle">
            Enter a movie name to search.
          </p>
        ) : (
          <>
            <p className="page-subtitle">
             Results for &quot;{query}&quot;
            </p>

            <SearchResults query={query} />
          </>
        )}
      </main>
    </>
  );
}

async function SearchResults({ query }) {
  const data = await searchMovies(query);

  return <MovieGrid movies={data.results} />;
}