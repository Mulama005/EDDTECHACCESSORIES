import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';


export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__inner">

        <div className="hero__content">
          <span className="hero__badge">Featured Product</span>
          <h1 className="hero__title">
            iPhone 17<br />
            <span className="hero__title-accent">Pro Max</span>
          </h1>
          <p className="hero__desc">
            The most powerful iPhone ever. Titanium design,
            A19 Pro chip, and a revolutionary camera system.
          </p>
          <div className="hero__price-row">
            <span className="hero__price">Ksh 153,000</span>
            <span className="hero__stock">In Stock</span>
          </div>
          <div className="hero__actions">
      <button className="hero__btn hero__btn--primary" onClick={() => navigate('/iphone/1')}>
        Select Options →
      </button>
      <button className="hero__btn hero__btn--ghost" onClick={() => navigate('/iphone')}>
        Learn More
      </button>
    </div>
        </div>

        <div className="hero__visual">
            <div className="hero__glow" aria-hidden="true" />
            <div className="hero__phone-frame">
                <img
                src="/images/Phones/iphones/Iphone17Promax.png"
                alt="iPhone 17 Pro Max"
                className="hero__phone-img"
                />
                </div>
                <div className="hero__orbit hero__orbit--1" aria-hidden="true" />
                <div className="hero__orbit hero__orbit--2" aria-hidden="true" />
                </div>

      </div>
    </section>
  );
}