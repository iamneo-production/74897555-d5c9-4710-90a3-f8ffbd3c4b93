import React from "react";
import { Link } from "react-router-dom";

const TaskList = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-item-center vh-60">
        <div
          className="text-white p-3 m-4 text-center"
          style={{ width: "615px", height: "75px", background: "#1a256f" }}
        >
          {" "}
          <h2>Task Details</h2>{" "}
        </div>
      </div>
      <div className="d-flex justify-content-center align-item-center vh-70">
        <div
          className="d-block overflow-auto mb-3 p-5 rounded-2 float-start text-start"
          style={{
            width: "60%",
            fontSize: "19px",
            background: "#f2f2f2",
          }}
        >
          <label>
            {" "}
            <strong>Task Name : </strong> Creation of Dashboard
          </label>
          <br />
          <br />
          <label>
            <strong>Task Description : </strong>Dashboard should contain all the
            information like list of project and a navigation bar to navigate to
            different pages{" "}
          </label>
          <br />
          <br />
          <label>
            {" "}
            <strong>Assigned to : </strong> Member 1
          </label>
          <br />
          <br />
          <label>
            {" "}
            <strong>Task Priority : </strong> Low{" "}
          </label>
          <br />
          <br />
          <label>
            {" "}
            <i class="fa fa-calendar"></i> <strong>Deadline : </strong>{" "}
            04-06-2023
          </label>
          <br />
          <br />
          <label>
            {" "}
            <strong>Task Status : </strong> Pending
          </label>
          <br />
          <br />
          <div className="d-flex justify-content-center align-item-center vh-60">
            <Link to="/edittask">
              <button className="btn btn-info btn-lg pt-3 pb-3 ps-4 pe-4 text-white me-3">
                {" "}
                Edit Task
              </button>{" "}
            </Link>
            <button className="btn btn-danger btn-lg pt-3 pb-3 ps-4 pe-4">
              {" "}
              Delete Task{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
