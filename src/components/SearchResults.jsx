import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../styles/SearchResults.css";

// Maps each JSON file's category key → your React route path
const CATEGORY_ROUTES = {
  iphone:        "/iphone",
  samsung:       "/samsung",
  infinix:       "/infinix",
  tecno:         "/tecno",
  laptop:        "/laptops",
  tablet:        "/tablets",
  headphones:    "/headphones",
  earbuds:       "/earbuds",
  earphones:     "/earphones",
  speakers:      "/speakers",
  powerbank:     "/powerbanks",
  phonechargers: "/phone-chargers",
  laptopchargers:"/laptop-chargers",
  phonecases:    "/phone-cases",
  screenprotectors: "/screen-protectors",
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchResults = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    try {
      const res  = await fetch(
        `https://eddtechaccessories-backend.vercel.app/api/products/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
      setNotFound(data.length === 0);
    } catch (err) {
      console.error(err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { fetchResults(); }, [fetchResults]);

  // Build the correct route for a product using its `category` field
  const getProductLink = (product) => {
    const route = CATEGORY_ROUTES[product.category] || `/${product.category}`;
    return `${route}/${product.id}`;
  };

  return (
    <div className="search-results-page">
      <h2 className="search-title">
        Results for "<span>{query}</span>"
      </h2>

      {loading && <p className="search-status">Searching...</p>}

      {!loading && notFound && (
        <div className="no-results">
          <p>No products found for "<strong>{query}</strong>".</p>
          <p className="no-results-hint">Try a different spelling or a shorter keyword.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="results-count">{results.length} product{results.length !== 1 ? "s" : ""} found</p>
          <div className="search-grid">
            {results.map((product) => (
              <Link
                key={`${product.category}-${product.id}`}
                to={getProductLink(product)}
                className="search-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-image"
                  loading="lazy"
                />
                <div className="search-info">
                  {product.tag && (
                    <span className={`search-tag tag-${product.tag.toLowerCase()}`}>
                      {product.tag}
                    </span>
                  )}
                  <h3>{product.name}</h3>
                  <p className="search-price">{product.price}</p>
                  {!product.inStock && (
                    <span className="out-of-stock">Out of stock</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}