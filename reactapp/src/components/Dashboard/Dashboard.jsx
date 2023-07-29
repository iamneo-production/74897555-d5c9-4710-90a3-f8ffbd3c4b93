import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { BASE_URL } from "../../utils/api";

const Dashboard = () => {
  const [projectid, setProjectid] = useState(null);
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const [project, setProject] = useState({});
  const [checkProject, setCheckProject] = useState(null);

  const [teamCount, setTeamCount] = useState(null);

  useEffect(() => {
    check();
  });

  useEffect(() => {
    const loginid = decodedToken.id;
    if (decodedToken.role === "MANAGER") {
      // Find project ID for this manager's login ID
      api
        .get(`${BASE_URL}/project/manager/${loginid}`)
        .then((response) => {
          const pid = response.data.id;
          setProjectid(pid);
          console.log(
            "manager project id = " +
              response.data.id +
              " ** " +
              projectid +
              " check = " +
              checkProject
          );
        })
        .catch((error) => {
          console.error("Error fetching options: ", error);
        });
    } else {
      // User is logged in
      api
        .get(`${BASE_URL}/project/user/${loginid}`)
        .then((response) => {
          const pid = response.data.project_id;
          setProjectid(pid);
          console.log(
            "user project id = " + response.data.project_id + " * " + projectid
          );
        })
        .catch((error) => {
          console.error("Error fetching options: ", error);
        });
    }
  }, [checkProject, decodedToken.id, decodedToken.role, projectid]);

  useEffect(() => {
    loadProject();
  }, [projectid]);

  const loadProject = async () => {
    // alert("projectid = "+projectid);
    try {
      const result = await api.get(`${BASE_URL}/projects/${projectid}`);
      setProject(result.data);
      console.log(project);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };
  
  useEffect(() => {
    if (project.members && project.members.length > 0) {
      const teammembercount = project.members.length;
      setTeamCount(teammembercount);
    }
  }, [project]);
  const check = () => {
    const loginid = decodedToken.id;
    if (decodedToken.role === "MANAGER") {
      api
        .get(`${BASE_URL}/project/manager/check/${loginid}`)
        .then((response) => {
          setCheckProject(response.data);
          console.log("check = " + response.data + " ** " + checkProject);
        })
        .catch((error) => {
          console.error("Error to check: ", error);
        });
    } else {
      api
        .get(`${BASE_URL}/project/user/check/${loginid}`)
        .then((response) => {
          setCheckProject(response.data);
          console.log("check = " + response.data + " ** " + checkProject);
        })
        .catch((error) => {
          console.error("Error to check: ", error);
        });
    }
  };
  useEffect(() => {
    console.log("checkProject updated:", checkProject);
  }, [checkProject]);

  return (
    <div className="w-100 mx-auto" style={{ width: "fit-content" }}>
      {checkProject === 0 ? (
        <div className="text-center mt-5">
          <img
            src="https://www.itarian.com/assets-new/images/project-management.png"
            height="450px"
            width="500px"
            style={{ maxWidth: "100%" }}
            alt=""
          />

          <h2 className="text-primary">
            {" "}
            <br />
            No projects found
          </h2>
          <p style={{ fontSize: "18px" }}>
            It appears that no projects have yet been created! Once your project
            is created, the details will be displayed here.{" "}
          </p>
          {decodedToken.role === "MANAGER" ? (
            <Link to="/projects">
              <button className="add_new btn btn-primary p-2 rounded-1">
                Create new Project
              </button>
            </Link>
          ) : null}
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundImage: `url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="m-3">
            <div className="d-flex border p-3 border-3 border-light w-100  h-auto flex-wrap justify-content-around my-2 mx-auto">
              <div
                className="m-1 bg-white text-center card shadow-lg border-0 p-4"
                style={{ fontSize: "18px", width: "100%", maxWidth: "600px" }}
              >
                <p className="mt-1">
                  <b>Project Id:</b> {project.id}
                </p>
                <p className="mt-1">
                  <b>Project name:</b> {project.projectName}
                </p>
                <p className=" mt-1">
                  <b>Project description:</b>
                  {project.description}
                </p>
                <div className="disflex d-flex text-center mx-auto ">
                  <p className="m-1">
                    <i className="fa-solid fa-calendar-days"></i>
                    <b>Start date :</b> {project.startDate}
                  </p>

                  <p className="m-1">
                    <i className="fa-solid fa-calendar-days"></i>
                    <b>End date :</b> {project.endDate}
                  </p>
                </div>
                <p className=" mt-1">
                  <b>Team Size:</b> {teamCount}
                </p>
                <div className="d-flex align-item-center justify-content-center mb-2">
                  <Link to={`/projectdetails/${project.id}`}>
                    <button className=" btn btn-outline-0 border-solid border-0 rounded-2 cursor-pointer m-1 p-1 bg-info text-white">
                      View Details
                    </button>
                  </Link>
                  <Link to={`/report/${project.id}`}>
                    <button className=" btn btn-outline-0 border-solid border-0 rounded-2 cursor-pointer m-1 p-1 bg-info text-white">
                      Take Report
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;