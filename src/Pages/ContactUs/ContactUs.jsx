import React, { useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import './ContactUs.css';

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSent(true);
      setForm({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
    } else {
      alert(data.error || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    alert('Could not reach the server. Make sure the backend is running.');
  }

  setLoading(false);
};

  return (
    <div className="contact-page">

      {/* TOP SECTION */}
      <div className="contact-header">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <a href="tel:+254118396533" className="call-btn">
            📞 Call us: 0118 396 533
            </a>
          <p><ul>📍Shop 83 First floor,Simara Mall</ul>
          <ul> Nairobi,Kenya</ul>
          </p>
        </div>
      </div>

      <div className="contact-content">

        {/* LEFT: FORM */}
        <form onSubmit={handleSubmit} className="contact-form">

          {sent && <p className="success-msg">✅ Message sent successfully!</p>}

          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone (eg. +254712345678)" value={form.phone} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          <select name="subject" value={form.subject} onChange={handleChange}>
            <option value="" disabled>Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Order Issue">Order Issue</option>
            <option value="Product Question">Product Question</option>
            <option value="Support">Support</option>
            </select>

          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows="5" />

          <button type="submit" className="contact-btn-send" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>

        </form>

        {/* MAP */}
        <div className="contact-map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8161633476643!2d36.823420973959614!3d-1.2842158987035706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11002d4d8949%3A0x9754c9fa1ccfe054!2sSimara%20Mall!5e0!3m2!1sen!2ske!4v1776606940111!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/*SOCIAL ICONS */}
        <div className="contact-socials">
  <a href="https://instagram.com" target="_blank" rel="noreferrer">
    <FaInstagram />
  </a>
  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <FaFacebookF />
  </a>
</div>

      </div>
    </div>
  );
}

export default ContactUs;