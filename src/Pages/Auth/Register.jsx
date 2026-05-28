import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Register.css";

const API = "https://eddtechaccessories-backend.vercel.app";

// ── Password rules ──
const PASSWORD_RULES = [
  { id: "length",  label: "At least 8 characters",        test: (p) => p.length >= 8 },
  { id: "upper",   label: "One uppercase letter (A-Z)",   test: (p) => /[A-Z]/.test(p) },
  { id: "lower",   label: "One lowercase letter (a-z)",   test: (p) => /[a-z]/.test(p) },
  { id: "number",  label: "One number (0-9)",             test: (p) => /[0-9]/.test(p) },
  { id: "special", label: "One special character (!@#$)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const passwordStrength = PASSWORD_RULES.filter((r) => r.test(form.password)).length;

  const strengthLabel = ["", "Weak", "Weak", "Fair", "Strong", "Very Strong"][passwordStrength];
  const strengthColor = ["", "#ef4444", "#ef4444", "#f59e0b", "#22c55e", "#16a34a"][passwordStrength];

  // ── Email + Password Register ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    const failedRules = PASSWORD_RULES.filter((r) => !r.test(form.password));
    if (failedRules.length > 0) {
      return alert(`Password must have: ${failedRules.map((r) => r.label).join(", ")}`);
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!agreed) {
      return alert("You must agree to the Privacy Policy & Terms");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          agreedToPolicy: true,
        }),
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

  // ── Google Sign-in ──
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

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
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>

        {/* GOOGLE BUTTON */}
        <button
          className="register-google-btn"
          onClick={handleGoogle}
          disabled={loading}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div className="register-divider">
          <span>or</span>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD WITH RULES */}
          <div className="register-password-wrap">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowRules(true)}
              required
            />

            {/* STRENGTH BAR */}
            {form.password && (
              <div className="register-strength">
                <div className="register-strength__bar">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="register-strength__seg"
                      style={{ background: i <= passwordStrength ? strengthColor : "#e5e7eb" }}
                    />
                  ))}
                </div>
                <span className="register-strength__label" style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
            )}

            {/* RULES CHECKLIST */}
            {showRules && (
              <ul className="register-rules">
                {PASSWORD_RULES.map((rule) => (
                  <li
                    key={rule.id}
                    className={`register-rule ${rule.test(form.password) ? "register-rule--pass" : ""}`}
                  >
                    <span className="register-rule__icon">
                      {rule.test(form.password) ? "✓" : "○"}
                    </span>
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* MATCH INDICATOR */}
          {form.confirmPassword && (
            <p className={`register-match ${form.password === form.confirmPassword ? "register-match--ok" : "register-match--err"}`}>
              {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}

          {/* CHECKBOX */}
          <label className="register-checkbox">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
              {" "}and{" "}
              <a href="/terms" target="_blank" rel="noreferrer">Terms of Use</a>
            </span>
          </label>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}