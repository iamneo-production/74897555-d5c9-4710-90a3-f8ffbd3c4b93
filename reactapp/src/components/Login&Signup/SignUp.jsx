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
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
        <h1>Register</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              className="form-control form-control-sm "
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              className="form-control form-control-sm "
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              name="username"
              className="form-control form-control-sm "
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="email"
              name="email"
              className="form-control form-control-sm "
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            Password:
            <input
              type="password"
              name="password"
              className="form-control form-control-sm "
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>User Type:</label>
          <br />

          <label>
            <input
              type="radio"
              name="role"
              value="USER"
              checked={formData.role === "USER"}
              onChange={handleInputChange}
            />
            User
          </label>
          <br />

          <label>
            <input
              type="radio"
              name="role"
              value="MANAGER"
              checked={formData.role === "MANAGER"}
              onChange={handleInputChange}
            />
            Manager
          </label>
          <br />
          <p className="pe-auto" onClick={() => setSign("signin")}>
            Already have a account? <span>Login</span>{" "}
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
