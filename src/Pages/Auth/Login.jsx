import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const API = "https://eddtechaccessories-backend.vercel.app";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login"); // "login" | "otp"
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── STEP 1: Email + Password ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStep("otp");
      startResendTimer();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 2: Verify OTP ──
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email || form.email);

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

  // ── Resend OTP ──
  const handleResend = async () => {
    if (resendTimer > 0) return;

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      alert("New code sent to your email.");
      startResendTimer();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
        body: JSON.stringify({
          token: idToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email || result.user.email);

      // New Google user → redirect to register page
      if (data.is_new_user) {
        navigate("/register");
        return;
      }

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

  // ── OTP Screen ──
  if (step === "otp") {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-otp-icon">🔐</div>

          <h2>Check Your Email</h2>

          <p className="login-otp-hint">
            We sent a 6-digit code to <strong>{form.email}</strong>.
            Enter it below to continue.
          </p>

          <form
            className="login-form"
            onSubmit={handleVerifyOtp}
          >
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              maxLength={6}
              className="login-otp-input"
              required
              autoFocus
            />

            <button
              type="submit"
              className="login-btn"
              disabled={loading || otp.length < 6}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </form>

          <div className="login-otp-actions">
            <button
              className="login-resend-btn"
              onClick={handleResend}
              disabled={resendTimer > 0 || loading}
            >
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : "Resend code"}
            </button>

            <button
              className="login-back-btn"
              onClick={() => {
                setStep("login");
                setOtp("");
              }}
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Login Screen ──
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <button
          className="login-google-btn"
          onClick={handleGoogle}
          disabled={loading}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>

        <div className="login-divider">
          <span>or</span>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Sending code..." : "Continue"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}