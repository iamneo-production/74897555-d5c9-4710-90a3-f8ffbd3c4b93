import React, { useState } from "react";
import SU from "../assets/undraw_access_account_re_8spm.svg";
import LoginPage from "../components/Login&Signup/LoginPage";
import SignUp from "../components/Login&Signup/SignUp";

const Login = () => {
  const [sign, setSign] = useState("signin");
  return (
    <main
      className="vw-100 d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Replace with your desired background image or color
      }}
    >
      <section
        className="row d-flex align-items-center justify-content-center w-75 rounded shadow-lg h-75 cursor-pointer bg-white pe-1"
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)" }}
      >
        <section
          className="col-md-6 col-lg-7 col-xl-6 text-center d-none d-md-block"
          style={{ maxWidth: "300px" }}
        >
          <img src={SU} alt="Signup" className="" height="400px" />
        </section>
        <section className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          {sign === "signup" && <SignUp setSign={setSign} />}
          {sign === "signin" && <LoginPage setSign={setSign} />}
        </section>
      </section>
    </main>
  );
};

export default Login;
