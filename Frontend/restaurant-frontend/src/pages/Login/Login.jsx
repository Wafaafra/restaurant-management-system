import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import mealImg from "../../assets/images/OIP (1).webp";
import logo from "../../assets/images/chickentaki-logo.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError("Invalid email or password.");
      } else {
        setError("Cannot connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      setGoogleLoading(true);
      setError("");

      // Exchange Google access token for user info
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      // Send id_token to Django backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/google/",
        { token: userInfo.data.sub, email: userInfo.data.email, name: userInfo.data.name }
      );

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError("Google login failed. Please try again."),
  });

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-left">
        <img src={mealImg} className="login-left-bg" alt="Restaurant" />
        <div className="overlay"></div>
        <div className="login-brand">
          <span className="brand-tag">RESTAURANT MANAGEMENT</span>
          <h1>Manage Your Restaurant<br />With Confidence.</h1>
          <p>Monitor your expenses, suppliers, inventory, products and reports from one beautiful dashboard.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">

          <div className="logo">
            <img src={logo} className="logo-icon" alt="ChickenTaki logo" />
            <h2>ChickenTaki Manager</h2>
          </div>

          <div className="login-header">
            <h3>Welcome Back</h3>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Google Button */}
          <button
            className="google-button"
            onClick={() => googleLogin()}
            disabled={googleLoading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width="20"
              height="20"
            />
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="signup-prompt">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>

          <div className="login-footer">
            Restaurant Management System
            <span>Version 1.0</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;