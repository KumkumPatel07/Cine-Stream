"use client";

import { useState } from "react";
import Link from "next/link";
import MovieCard from "./MovieCard";

export default function FavoriteList() {
  const [favorites] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return (
      JSON.parse(localStorage.getItem("cine-stream-favorites")) || []
    );
  });

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <p>No favorite movies yet.</p>

        <Link href="/">
          Explore Movies
        </Link>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
}