import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <div className="searchbar__inner">
        <div className="searchbar__field">
          <svg className="searchbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            className="searchbar__input"
            placeholder="Search phones, laptops, accessories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          {query && (
            <button
              className="searchbar__clear"
              onClick={() => setQuery("")}
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>

        <button
          className="searchbar__btn searchbar__btn--search"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}