import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

export default function ProductCard({
  product,
  basePath
}) {

  const { id, name, price, tag, image } = product;

  // Prevent undefined routes
  if (!basePath) {
    console.error("ProductCard missing basePath:", product);
    return null;
  }

  return (
    <div className="pcard">

      <Link to={`${basePath}/${id}`}>

        <div className="pcard__img-wrap">

          {tag && (
            <span className={`pcard__tag pcard__tag--${tag.toLowerCase()}`}>
              {tag}
            </span>
          )}

          {image ? (
            <img
              src={image}
              alt={name}
              className="pcard__img"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x300?text=Image+Not+Found";
              }}
            />
          ) : (
            <div className="pcard__img-ph" aria-hidden="true">
              <div className="pcard__ph-screen" />
              <div className="pcard__ph-btn" />
            </div>
          )}

        </div>

        <div className="pcard__body">

          <h3 className="pcard__name">{name}</h3>

          <p className="pcard__price">{price}</p>

          <div className="pcard__btn">
            Select Options
          </div>

        </div>

      </Link>
    </div>
  );
}