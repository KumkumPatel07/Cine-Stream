import { useEffect, useState } from "react";

function SearchBar({ onSearch, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanQuery = query.trim();

      if (cleanQuery) {
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

    if (cleanQuery) {
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