import React from "react";
import project from "../assets/benifit.png";
import projectmanage from "../assets/project-management.png";
import goal from "../assets/goal.png";
import chat from "../assets/collaboration.png";
import report from "../assets/analysis (2).png";
import image from "../assets/ProjectManagement.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  let benefits = [
    {
      description: "Improved scheduling and planning",
    },
    {
      description: "Better Communication And Team Collaboration",
    },
    {
      description: "Project data is organized and centralized.",
    },
    {
      description: "Progress can be easily tracked.",
    },
    {
      description: "Remote working has been improved.",
    },
    {
      description: "Increased Productivity.",
    },
  ];
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-expand-md navbar-dark w-100 sticky-top"
        style={{ backgroundColor: "#1b2430" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/">
            PMT
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
              <ul className="navbar-nav justify-content-end ms-auto ps-3">
                <li className="nav-item ps-lg-3">
                  <a
                    className="nav-link "
                    style={{
                      fontSize: "20px",
                      borderBottom: "2px solid transparent",
                      transition: "border-color 0.5s",
                    }}
                    href="#scrollspyservice"
                    onMouseEnter={(e) =>
                      (e.target.style.borderColor = "#0dcaf0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.borderColor = "transparent")
                    }
                  >
                    <i className="fas fa-dashboard pe-1 text-white d-inline-block d-md-none  d-lg-none"></i>{" "}
                    Services
                  </a>
                </li>
                <li className="nav-item ps-lg-3">
                  <a
                    className="nav-link"
                    style={{
                      fontSize: "20px",
                      borderBottom: "2px solid transparent",
                      transition: "border-color 0.5s",
                    }}
                    href="#scrollspybenefit"
                    onMouseEnter={(e) =>
                      (e.target.style.borderColor = "#0dcaf0")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.borderColor = "transparent")
                    }
                  >
                    <i className="fas fa-comments pe-1 text-white d-inline-block d-md-none  d-lg-none"></i>
                    Benefits
                  </a>
                </li>

                <li className="nav-item ps-lg-3">
                  <Link
                    className="nav-link"
                    style={{
                      fontSize: "20px",
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
                    Login/Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 justify-content-center align-items-center">
            <div className="mt-5">
              <div className="heading_container">
                <h1
                  id="scrollspyHeading1"
                  className="text-center"
                  style={{ fontFamily: "Roboto Slab", color: "#19888f" }}
                >
                  Project Management Tool
                </h1>
              </div>
              <p
                style={{
                  fontSize: "19px",
                  textAlign: "justify",
                  marginTop: "20px",
                }}
              >
                A project management tool is software that assists teams and
                project managers in organising, managing, and centralising their
                projects. It offers a centralised platform for team
                collaboration, task management and progress tracking for project
                managers and their teams. By allowing users to manage
                activities, resources and deadlines in a single location, the
                project management tool seeks to increase project management's
                effectiveness, communication and productivity.{" "}
              </p>
              <br />
              <Link to="/login">
                <button className="btn btn-warning btn-lg ">
                  {" "}
                  Get Started{" "}
                </button>
              </Link>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="img-box">
              <img
                src={project}
                height="450px"
                width="650px"
                style={{ maxWidth: "100%" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <section class="service_section layout_padding">
        <div class="container">
          <div class="heading_container heading_center">
            <br />
            <br />
            <h2
              className="text-center"
              id="scrollspyservice"
              style={{ fontFamily: "Roboto Slab", color: "#fd694d" }}
            >
              Services
            </h2>
            <br />
          </div>
        </div>
        <div class="container ">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="box m-3 bg-white text-center card shadow border-0 p-4">
                <div class="d-flex flex-column align-items-center">
                  <div
                    class="img-box"
                    style={{ height: "75px", width: "75px" }}
                  >
                    <img
                      src={projectmanage}
                      class="img-fluid mx-auto cursor-pointer"
                      style={{ maxWidth: "120px", maxHeight: "150px" }}
                      alt=""
                    />
                  </div>
                  <div class="detail-box">
                    <br />
                    <h4 style={{ marginTop: "20px" }}>Project Management</h4>
                    <p>
                      In project management, project managers plan, execute,
                      track and complete projects with the help of project
                      teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="box m-3 bg-white text-center card shadow border-0 p-4">
                <div class="d-flex flex-column align-items-center">
                  <div
                    class="img-box"
                    style={{ height: "75px", width: "75px" }}
                  >
                    <img
                      src={goal}
                      class="img-fluid mx-auto cursor-pointer"
                      style={{ maxWidth: "100px", maxHeight: "120px" }}
                      alt=""
                    />
                  </div>
                  <div class="detail-box">
                    <br />
                    <h4 style={{ marginTop: "20px" }}>Task Management</h4>
                    <p>
                      Task management involves breaking down a project into
                      smaller tasks, managing those tasks, and tracking their
                      progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="box m-3 bg-white text-center card shadow border-0 p-4">
                <div class="d-flex flex-column align-items-center">
                  <div
                    class="img-box"
                    style={{ height: "75px", width: "75px" }}
                  >
                    <img
                      src={chat}
                      class="img-fluid mx-auto cursor-pointer"
                      style={{ maxWidth: "100px", maxHeight: "120px" }}
                      alt=""
                    />
                  </div>
                  <div class="detail-box">
                    <br />
                    <h4 style={{ marginTop: "20px" }}>Collaboration</h4>
                    <p>
                      Team members and managers can efficiently communicate and
                      collaborate with each other to discuss about the project
                      progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="box m-3 bg-white text-center card shadow border-0 p-4">
                <div class="d-flex flex-column align-items-center">
                  <div
                    class="img-box"
                    style={{ height: "75px", width: "75px" }}
                  >
                    <img
                      src={report}
                      class="img-fluid mx-auto cursor-pointer"
                      style={{ maxWidth: "100px", maxHeight: "120px" }}
                      alt=""
                    />
                  </div>
                  <div class="detail-box">
                    <br />
                    <h4 style={{ marginTop: "20px" }}>Report Generation</h4>
                    <p>
                      A project report as a summary overview to share the status
                      of the project with stakeholders, clients, and team
                      members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pros" class="features">
        <div class="container" data-aos="fade-up">
          <header class="section-header">
            <h2
              className="text-center"
              id="scrollspybenefit"
              style={{ fontFamily: "Roboto Slab", color: "#fd694d" }}
            >
              Benefits
            </h2>
          </header>

          <div class="row">
            <div class="col-lg-6">
              <br />
              <img
                src={image}
                height="500px"
                style={{ maxWidth: "100%" }}
                class="img-fluid"
                alt=""
              />
            </div>

            <div class="col-lg-6 mt-5 mt-lg-0 d-flex">
              <div class="row align-self-center gy-4">
                {benefits.map((benefit, id) => (
                  <div class="col-md-6">
                    <div class="box m-3 bg-white text-center card shadow border-0 p-2">
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        style={{ color: "#19888f" }}
                      />
                      <h5>{benefit.description}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
