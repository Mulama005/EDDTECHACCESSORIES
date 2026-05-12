import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [agreed, setAgreed] = useState(false); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CHECK PASSWORD MATCH
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    // CHECK PRIVACY AGREEMENT
    if (!agreed) {
      return alert("You must agree to the Privacy Policy & Terms");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          agreedToPolicy: true 
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/*  PRIVACY CHECKBOX */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />{" "}
          I agree to the{" "}
          <a href="/privacy-policy" target="_blank">Privacy Policy</a> and{" "}
          <a href="/terms" target="_blank">Terms of Use</a>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}