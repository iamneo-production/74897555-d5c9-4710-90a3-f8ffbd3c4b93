import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  let ProjectInfo = [
    {
      projectId: 1,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
    {
      projectId: 2,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
    {
      projectId: 3,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
    {
      projectId: 4,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
    {
      projectId: 5,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
    {
      projectId: 6,
      projectName: "Pmt",
      projectDescription:
        "The objective of a Project Management Tool is to provide a centralized platform for project managers and team members",
      startDate: "12/12/2022",
      endDate: "21/02/2023",
      buttonText: "View details",
    },
  ];
  return (
    <div className="dashboard w-80  mx-auto" style={{ width: "fit-content" }}>
      <div className="d-flex justify-content-between align-items-center p-4 bg-secondary-subtle">
        <h6 className="text-dark">Project Progress</h6>
        <div>
          <input
            className="search px-2 py-1 mx-1  rounded-2 text-dark"
            type="text"
            placeholder="search..."
          />
          <Link to="/createproject">
            <button className="add_new px-2 py-1 text-white bg-info rounded-2">
              Add new
            </button>
          </Link>
        </div>
      </div>

      <div className="container1 m-3">
        <div
          className="box1 d-flex border p-3 border-3 border-light w-100 h-auto flex-wrap justify-content-around my-2 mx-auto"
          style={{ maxWidth: "fit-content" }}
        >
          {ProjectInfo.map((project) => (
            <div
              className="m-1 bg-white text-center card shadow border-0 p-2"
              style={{
                fontSize: "18px",
                width: "400px",
              }}
            >
              <p className="mt-1">
                <b>Project Id:</b> {project.projectId}
              </p>
              <p className="mt-1">
                <b>Project name:</b> {project.projectName}
              </p>
              <p className=" mt-1">
                <b>Project description:</b>
                {project.projectDescription}{" "}
              </p>
              <div className="disflex d-flex text-center mx-auto">
                <p className="mt-1">
                  <i class="fa-solid fa-calendar-days"></i>
                  <b>Start date :</b> {project.startDate}
                </p>
                <p className="mt-1">
                  <i class="fa-solid fa-calendar-days"></i>
                  <b>End date :</b> {project.endDate}
                </p>
              </div>
              <div className="d-flex align-item-center justify-content-center mb-2">
                <Link to="/projectdetails">
                  <button className=" btn btn-outline-0  border-solid border-0 rounded-2 cursor-pointer m-1 p-1 bg-info text-white">
                    {project.buttonText}
                  </button>
                </Link>
                <Link to="/report">
                  <button className=" btn btn-outline-0  border-solid border-0 rounded-2 cursor-pointer m-1 p-1 bg-info text-white">
                    Take Report
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
