import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils/api";

const LoginPage = ({ setSign }) => {
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        loginData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error:", error.response.data);
    }
  };

  return (
    <main>
      <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-3 text-center" style={{ maxWidth: "500px" }}>
        <h1>Login</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <p onClick={() => setSign("signup")} style={{ cursor: "pointer" }}>
            Don't have an account? <span>Signup</span>{" "}
          </p>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;