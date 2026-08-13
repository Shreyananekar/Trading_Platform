import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email,
          password,
        }
      );

      // Get token and user from backend
      const { token, user } = response.data;

      // Save JWT token
      localStorage.setItem("token", token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      window.location.href = "http://localhost:5173";
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login to Zerodha</h2>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;