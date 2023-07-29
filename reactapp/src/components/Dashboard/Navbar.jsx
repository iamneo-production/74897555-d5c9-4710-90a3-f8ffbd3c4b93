import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../../utils/TokenContext";

const Navbar = () => {
  const { decodedToken } = useContext(TokenContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-expand-md navbar-dark w-100 sticky-top"
      style={{ backgroundColor: "#1b2430" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fs-4" to="/">
          Project Management Tool
        </Link>

        <button
          className="navbar-toggler shadow-none border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="sidebar offcanvas offcanvas-end"
          id="offcanvasNavbar"
          style={{ backgroundColor: "#2a3239" }}
        >
          <div className="offcanvas-header text-white border-bottom p-3">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              PMT
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white shadow-none"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            {!decodedToken ? (
              ""
            ) : (
              <ul className="navbar-nav justify-content-end ms-auto ps-3">
                <li className="nav-item ps-lg-3">
                  <Link
                    className="nav-link "
                    style={{
                      fontSize: "18px",
                      borderBottom: "2px solid transparent",
                      transition: "border-color 0.5s",
                    }}
                    to="/"
                    onMouseEnter={(e) =>
                      (e.target.style.borderColor = "#0dcaf0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.borderColor = "transparent")
                    }
                  >
                    <i className="fas fa-dashboard pe-1 text-white d-inline-block d-md-none  d-lg-none"></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item ps-lg-3">
                  <Link
                    className="nav-link"
                    style={{
                      fontSize: "18px",
                      borderBottom: "2px solid transparent",
                      transition: "border-color 0.5s",
                    }}
                    to="/communication"
                    onMouseEnter={(e) =>
                      (e.target.style.borderColor = "#0dcaf0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.borderColor = "transparent")
                    }
                  >
                    <i className="fas fa-comments pe-1 text-white d-inline-block d-md-none  d-lg-none"></i>
                    Communication
                  </Link>
                </li>

                <li className="nav-item ps-lg-3">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    className="nav-link"
                    style={{
                      fontSize: "18px",
                      borderBottom: "2px solid transparent",
                      transition: "border-color 0.5s",
                    }}
                    to="/login"
                    onMouseEnter={(e) =>
                      (e.target.style.borderColor = "#0dcaf0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.borderColor = "transparent")
                    }
                  >
                    <i className="fas fa-sign-in-alt pe-1 text-white d-inline-block d-md-none  d-lg-none"></i>{" "}
                    {decodedToken.firstName + " " + decodedToken.role}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
