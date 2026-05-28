import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../styles/SearchResults.css";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await fetch(
        `https://eddtechaccessories-backend.vercel.app/api/products/search?q=${query}`
      );

      const data = await res.json();
      setResults(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search-results-page">

      <h2 className="search-title">
        Results for "{query}"
      </h2>

      {results.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <div className="search-grid">

          {results.map((product) => (
            <Link
              key={product.id}
              to="#"
              className="search-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="search-image"
              />

              <div className="search-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
}
