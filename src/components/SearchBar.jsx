import { useEffect, useRef, useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const lastSearchRef = useRef("");

  useEffect(() => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    const timer = setTimeout(() => {
      if (cleanQuery !== lastSearchRef.current) {
        lastSearchRef.current = cleanQuery;
        onSearch(cleanQuery);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query, onSearch]);

  function handleSubmit(event) {
    event.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    if (cleanQuery !== lastSearchRef.current) {
      lastSearchRef.current = cleanQuery;
      onSearch(cleanQuery);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;