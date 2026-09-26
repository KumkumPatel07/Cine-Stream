import { Agent, setGlobalDispatcher } from "undici";
import { cache } from "react";

const API_KEY = process.env.TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

setGlobalDispatcher(
  new Agent({
    connect: {
      family: 4,
    },
  })
);

export async function getPopularMovies() {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is missing");
  }

  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export const getMovie = cache(async function getMovie(id) {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is missing");
  }

  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Movie request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
});