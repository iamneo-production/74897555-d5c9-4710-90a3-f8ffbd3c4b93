import React from "react";
import { Link } from "react-router-dom";

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
            <Link to="/editproject">
              <button
                className="btn btn-info btn-lg pt-3 pb-3 ps-4 pe-4 text-white"
                // onClick={onEditProject}
              >
                {" "}
                Edit Project
              </button>
            </Link>
            <br />
            <button
              className="btn btn-danger btn-lg pt-3 pb-3 ps-4 pe-4"
              // onClick={onDeleteProject}
            >
              {" "}
              Delete Project{" "}
            </button>
            <br />
          </div>
          <div className="m-2 text-center">
            <Link
              to={`/taskcreation?projectId=${projectId}&name=${projectName}`}
            >
              <button
                className="btn btn-primary btn-lg pt-3 pb-3 ps-4 pe-4 text-white me-3 mb-2"
                // onClick={onAddTask}
              >
                {" "}
                Add Task
              </button>
            </Link>
            <Link to="/tasklist">
              <button
                className="btn btn-primary btn-lg pt-3 pb-3 ps-4 pe-4 text-white mb-2"
                // onClick={onViewTaskDetails}
              >
                {" "}
                View Task Details{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
