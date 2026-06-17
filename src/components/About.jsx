// About.jsx
import "../styles/About.css";

export default function About() {
  const team = [
    {
      name: "Moureen Wachira",
      role: "CEO",
      image:
        "https://qalskxdcfldadmvedjak.supabase.co/storage/v1/object/public/product_pics/Staff/Moryn.jpeg",
      desc: "Ensures every customer receives professional support, seamless service, and a premium shopping experience."
    },

    {
      name: "Bonventure Mulama",
      role: " IT Speacilist",
      image:
        "https://qalskxdcfldadmvedjak.supabase.co/storage/v1/object/public/product_pics/Staff/Mulama.jpeg",
      desc: "Responsible for building, maintaining, and troubleshooting a website's underlying infrastructure, ensuring it remains secure, highly available, and fully functional for all end users"
    },

    {
      name: "George Wanyoike ",
      role: "Senior Accessories Specialist",
      image:
        "https://qalskxdcfldadmvedjak.supabase.co/storage/v1/object/public/product_pics/Staff/George.jpeg",
      desc: "Focused on sourcing high-quality gadgets and accessories that blend innovation, performance, and reliability."
    },
    
    {
      name: "John kimani",
      role: "Founder & Lead Technician",
      image:
        "https://qalskxdcfldadmvedjak.supabase.co/storage/v1/object/public/product_pics/Staff/kim.jpeg",
      desc: "Passionate about premium mobile technology, repairs, and delivering trusted tech solutions to every customer."
    },
    
    
    {
      name: "William Kelly",
      role: " Technician",
      image:
        "https://qalskxdcfldadmvedjak.supabase.co/storage/v1/object/public/product_pics/Staff/William.jpeg",
      desc: "Committed to elevating the customer experience through premium mobile technology, reliable repairs, and trusted, high-quality tech solutions."
    },
    
  ];

  return (
    <section className="about">
      <div className="about__bg-grid"></div>

      {/*  */}
      <div className="about__hero">
        <div className="about__hero-content">
          

          <h1 className="about__title">
            Premium Tech Solutions Built Around{" "}
            <span className="about__title-accent">Trust & Innovation</span>
          </h1>

          <p className="about__desc">
            EDDTECH Mobile Spares, Repairs & Accessories is a modern and reliable technology store dedicated to providing high-quality mobile solutions for everyday needs.
            We specialize in professional smartphone repairs, genuine mobile spares, and a wide range of modern accessories designed to keep your devices performing at their best.
            Our services include screen replacements, charging system repairs, water damage solutions, software support, and maintenance for different smartphone brands and other tech devices. 
            At EDDTECH, we combine skilled workmanship, quality products, and excellent customer service to ensure every client receives fast, affordable, and dependable solutions.
            Driven by innovation and customer satisfaction, we aim to create a trusted tech experience where customers can confidently access reliable repairs, premium accessories, 
            and professional support all in one place.
          </p>

          <div className="about__stats">
            <div className="about__stat-card">
              <h2>500+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="about__stat-card">
              <h2>100%</h2>
              <p>Quality Products</p>
            </div>

            <div className="about__stat-card">
              <h2>24/7</h2>
              <p>Customer Support</p>
            </div>
          </div>
        </div>

        <div className="about__hero-visual">
          <div className="about__glow"></div>

          <div className="about__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1400&auto=format&fit=crop"
              alt="Tech Store"
              className="about__hero-img"
            />
          </div>
        </div>
      </div>

      {/* PURPOSE */}
      <div className="about__section">
        <div className="about__section-header">
          <span className="about__badge">Our Purpose</span>

          <h2 className="about__section-title">
            Why Customers Choose EDDTECH
          </h2>
        </div>

        <div className="about__cards">
          <div className="about__card">
            <div className="about__card-icon">⚡</div>

            <h3>Premium Devices</h3>

            <p>
              We provide authentic smartphones, accessories, and gadgets from
              trusted global brands.
            </p>
          </div>

          <div className="about__card">
            <div className="about__card-icon">🛠</div>

            <h3>Expert Repairs</h3>

            <p>
              Professional diagnostics and repairs handled by skilled
              technicians using quality replacement parts.
            </p>
          </div>

          <div className="about__card">
            <div className="about__card-icon">🤝</div>

            <h3>Trusted Service</h3>

            <p>
              Customer satisfaction is our foundation. We focus on reliability,
              transparency, and long-term relationships.
            </p>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="about__section">
        <div className="about__section-header">
          <span className="about__badge">Meet The Team</span>

          <h2 className="about__section-title">
            The Professionals Behind The Brand
          </h2>
        </div>

        <div className="about__team">
          {team.map((member, index) => (
            <div className="about__team-card" key={index}>
              <div className="about__team-image-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="about__team-image"
                />
              </div>

              <div className="about__team-content">
                <h3>{member.name}</h3>

                <span>{member.role}</span>

                <p>{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}