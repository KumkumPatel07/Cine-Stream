const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

console.log(
  "TMDB KEY EXISTS:",
  Boolean(TMDB_API_KEY)
);

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB(endpoint) {
  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB API key missing. Check your .env file."
    );
  }

  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${TMDB_API_KEY}`
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("TMDB ERROR:", data);

    throw new Error(
      data.status_message || "TMDB request failed"
    );
  }

  return data;
}

export async function getPopularMovies(page = 1) {
  return fetchTMDB(
    `/movie/popular?language=en-US&page=${page}`
  );
}

export async function searchMovies(query, page = 1) {
  return fetchTMDB(
    `/search/movie?language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
}