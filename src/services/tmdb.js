const API_KEY = import.meta.env.cc5757c4d1ab13d2dee11afa281055da;


const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("TMDB request failed");
  }

  return await response.json();
}

// Popular movies
export async function getPopularMovies(page = 1) {
  const url =
    `${BASE_URL}/movie/popular` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&page=${page}`;

  return await fetchTMDB(url);
}

// Search movies
export async function searchMovies(query, page = 1) {
  const url =
    `${BASE_URL}/search/movie` +
    `?api_key=${API_KEY}` +
    `&language=en-US` +
    `&query=${encodeURIComponent(query)}` +
    `&page=${page}`;

  return await fetchTMDB(url);
}