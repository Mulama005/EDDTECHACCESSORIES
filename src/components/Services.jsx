// Services.jsx

import "../styles/Services.css";

const services = [
  {
    title: "Screen Replacements",
    icon: "📱",
    desc: "Professional screen replacement services for cracked, broken, or unresponsive smartphone displays using premium quality parts."
  },

  {
    title: "Charging System Repairs",
    icon: "🔌",
    desc: "Fix faulty charging ports, battery connection issues, and power-related problems for all major smartphone brands."
  },

  {
    title: "Water Damage Solutions",
    icon: "💧",
    desc: "Advanced diagnostics and repair solutions for devices affected by water or liquid damage."
  },

  {
    title: "Software Support",
    icon: "💻",
    desc: "Operating system installations, software troubleshooting, unlocking, updates, flashing, and optimization services."
  },

  {
    title: "Device Maintenance",
    icon: "🛠",
    desc: "Routine maintenance, cleaning, diagnostics, and performance enhancement for smartphones and tech devices."
  },

  {
    title: "Tech Accessories & Devices",
    icon: "🎧",
    desc: "Quality smartphones, laptops, chargers, headphones, earbuds, speakers, power banks, and modern tech accessories available at competitive prices."
},

  {
    title: "Multi-Brand Repairs",
    icon: "⚡",
    desc: "Expert repair solutions for iPhone, Samsung, Tecno, Infinix, Xiaomi, Oppo, tablets, laptops, and accessories."
  }
];

export default function Services() {
  return (
    <section className="services">

      <div className="services__bg-grid"></div>

      {/* HERO */}
      <div className="services__hero">

        <div className="services__hero-content">

          <span className="services__badge">
            PROFESSIONAL TECH SERVICES
          </span>

          <h1 className="services__title">
            Reliable Device Repairs &
            <span className="services__title-accent">
              {" "}Premium Tech Support
            </span>
          </h1>

          <p className="services__desc">
            At EDDTECH Mobile Spares, Repairs & Accessories, we specialize in
            high-quality smartphone, laptop, and tech device solutions from
            professional repairs and maintenance to the sale of premium mobile
            phones, laptops, accessories, chargers, audio devices, and modern tech
            attachments. Our experienced technicians and dedicated team ensure fast
            diagnostics, reliable repairs, authentic products, and trusted customer
            service tailored to modern digital lifestyles.
          </p>

          <div className="services__stats">

            <div className="services__stat">
              <h2>100+</h2>
              <p>Devices Repaired</p>
            </div>

            <div className="services__stat">
              <h2>500+</h2>
              <p>Sold Tech Accessories</p>
            </div>

            <div className="services__stat">
              <h2>98%</h2>
              <p>Customer Satisfaction</p>
            </div>

            <div className="services__stat">
              <h2>24/7</h2>
              <p>Support & Assistance</p>
            </div>

          </div>
        </div>

        <div className="services__hero-visual">

          <div className="services__glow"></div>

          <div className="services__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop"
              alt="Tech Repair"
              className="services__hero-img"
            />
          </div>

        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="services__section">

        <div className="services__section-header">

          <span className="services__badge">
            OUR SERVICES
          </span>

          <h2 className="services__section-title">
            Complete Repair Solutions &  Affordable Tech Accessories
          </h2>

        </div>

        <div className="services__grid">

          {services.map((service, index) => (
            <div className="services__card" key={index}>

              <div className="services__card-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>

            </div>
          ))}

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="services__why">

        <div className="services__why-content">

          <span className="services__badge">
            WHY EDDTECH
          </span>

          <h2 className="services__section-title">
            Trusted By Thousands Of Customers
          </h2>

          <p className="services__why-desc">
            We combine expert technical support, premium-quality products,
            professional repair solutions, fast turnaround times, and exceptional
            customer service to deliver a trusted technology experience for
            smartphones, laptops, accessories, and modern digital devices.
          </p>

          <div className="services__features">

            <div className="services__feature">
              ✔ Genuine Quality Parts & Affordable Tech Products
            </div>

            <div className="services__feature">
              ✔ Fast Repair Turnaround 
            </div>

            <div className="services__feature">
              ✔ Skilled Technicians
            </div>

            <div className="services__feature">
              ✔ Affordable Pricing
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}