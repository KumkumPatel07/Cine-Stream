"use client";

export default function Error({ reset }) {
  return (
    <main className="error-page">
      <h1>Something went wrong</h1>

      <p>
        We couldn&apos;t load the movies right now.
        Please try again.
      </p>

      <button onClick={() => reset()}>
        Try Again
      </button>
    </main>
  );
}