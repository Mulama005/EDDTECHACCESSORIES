import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      // Store token + role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin/orders");
      } else {
        navigate("/"); 
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

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

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}