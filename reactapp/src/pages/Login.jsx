import React, { useState } from "react";
import SU from "../assets/undraw_access_account_re_8spm.svg";
import LoginPage from "../components/Login&Signup/LoginPage";
import SignUp from "../components/Login&Signup/SignUp";

const Login = () => {
  const [sign, setSign] = useState("signup");
  return (
    <main
      className="vw-100 d-flex align-items-center justify-content-center "
      style={{ height: "85vh" }}
    >
      <section className="row d-flex align-items-center justify-content-center w-75 rounded shadow-lg h-75 cursor-pointer bg-white pe-1">
        <section className="col-md-8 col-lg-7 col-xl-6 text-center">
          {sign === "signin" && (
            <img src={SU} alt="Login" className="" height="400px" />
          )}
          {sign === "signup" && (
            <img src={SU} alt="Signup" className="" height="400px" />
          )}
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
