import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const SignUp = ({ setSign }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
    username: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/users`,
        formData
      );
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.reload();
      console.log("Navigation Done!");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error.response.data);
    }
  };

  return (
    <main>
      <div
        className="col-md-8 col-lg-6 offset-md-2 offset-lg-3 text-center"
        style={{ minWidth: "350px", maxHeight: "500px" }}
      >
        <h1>Register</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group ">
            <label className="mr-3">User Type:</label>
            <div className="d-flex flex-wrap text-center justify-content-center gap-4">
              <div className="form-check mr-3">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={formData.role === "USER"}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label">User</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="role"
                  value="MANAGER"
                  checked={formData.role === "MANAGER"}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Manager</label>
              </div>
            </div>
          </div>

          <p
            className="pe-auto"
            style={{ cursor: "pointer" }}
            onClick={() => setSign("signin")}
          >
            Already have an account? <span>Login</span>{" "}
          </p>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Signup
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
