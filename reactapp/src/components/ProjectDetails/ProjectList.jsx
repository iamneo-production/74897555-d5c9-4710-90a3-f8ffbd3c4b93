import React from "react";
import api from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
const ProjectList = ({
  projectId,
  projectName,
  projectDescription,
  projectStartDate,
  projectEndDate,
  //onAddTask,
  //onViewTaskDetails,
  //onEditProject,
  //onDeleteProject,
}) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  const navigate = useNavigate();
  const deleteProject = async (projectid) => {
    await api.delete(`http://localhost:8080/projects/${projectid}`, projectid);
    sweetalert();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const sweetalert = () => {
    Swal.fire({
      icon: "success",
      text: "Project Deleted Successfully 👍",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-item-center vh-60">
        <div
          className="text-white text-center p-3 m-4"
          style={{ width: "615px", height: "75px", background: "#1a256f" }}
        >
          <h2>Project Details</h2>{" "}
        </div>
      </div>
      <div
        className="mx-auto w-50 p-5"
        style={{ fontSize: "19px", background: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-12 col-md-8 d-block overflow-auto text-start">
            <div>
              <strong>Project ID:</strong> {projectId}
            </div>
            <br />
            <div>
              <strong>Project Name:</strong> {projectName}
            </div>
            <br />
            <div>
              <strong>Project Description:</strong> {projectDescription}
            </div>
            <br />
            <div>
              <strong>Start Date:</strong> {projectStartDate}
            </div>
            <br />
            <div>
              <strong>End Date:</strong> {projectEndDate}
            </div>
            <br />
          </div>
          <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
            {decodedToken.role === "MANAGER" ? (
              <Link to={`/projects/${projectId}`}>
                <button className="btn btn-info btn-lg pt-3 pb-3 ps-4 pe-4 text-white">
                  Edit Project
                </button>
              </Link>
            ) : null}
            <br />
            {decodedToken.role === "MANAGER" ? (
              <button
                className="btn btn-danger btn-lg pt-3 pb-3 ps-4 pe-4"
                onClick={() => deleteProject(projectId)}
              >
                Delete Project
              </button>
            ) : null}
            <br />
          </div>
          <div className="m-2 text-center">
            {decodedToken.role === "MANAGER" ? (
              <Link
                to={`/taskcreation?projectId=${projectId}&name=${projectName}`}
              >
                <button className="btn btn-primary btn-lg pt-3 pb-3 ps-4 pe-4 text-white me-3 mb-2">
                  Add Task
                </button>
              </Link>
            ) : null}
            <Link to={`/tasklist?projectId=${projectId}`}>
              <button className="btn btn-primary btn-lg pt-3 pb-3 ps-4 pe-4 text-white mb-2">
                View Task Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
