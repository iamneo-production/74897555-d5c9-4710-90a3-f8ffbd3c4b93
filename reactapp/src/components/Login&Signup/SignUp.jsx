import React, { useState } from "react";
import { BASE_URL } from "../../utils/connect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = ({ setSign }) => {
  const navigate = useNavigate();

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
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users`, formData);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error.response.data);
    }
  };

  return (
    <main>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
        <h1>Register</h1>
        {error && <p>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              className="form-control form-control-sm "
              value={formData.firstName}
              onChange={handleInputChange}
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
