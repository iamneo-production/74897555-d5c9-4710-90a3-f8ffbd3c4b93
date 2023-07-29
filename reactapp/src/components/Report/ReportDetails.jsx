import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import api, { BASE_URL } from "../../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const ReportDetails = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [project, setProject] = useState({});
  const {  projectName, startDate, endDate, description } = project;
  const [tasks, setTask] = useState([]);
  const [projectProgress, setProjectprogress] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [totalTask, setTotalTask] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const result = await api.get(`${BASE_URL}/projects/${id}`);
      const Data = result.data;
      console.log(Data);
      setProject(Data);
      console.log("The project is " + project);
      setSelectedValues(Data.members);
      console.log("The members are " + selectedValues);
      setTask(Data.tasks);
      console.log("project = " + project);
      console.log("task = " + tasks);
    } catch (error) {
      console.error("Error loading project:", error);
    }
  };

  useEffect(
    (e) => {
      let completed = 0;
      let totaltask = 0;
      tasks.forEach((task) => {
        totaltask++;
        if (task.status === "completed") {
          completed++;
        }
      });
      setCompletedTask(completed);
      setTotalTask(totaltask);
      let total = Math.round((completed / totaltask) * 100);
      setProjectprogress(total);
    },
    [tasks]
  );

  const exportToPDF = () => {
    const doc = new jsPDF("portrait", "px", "a4");

    const printReportElement = document.querySelector(".print-report");

    html2canvas(printReportElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      doc.save("report.pdf");
    });
  };

  const data = tasks.map((task) => {
    const uname=task.assignedTo;
    if (task.status === "pending") {
      return { name: uname, progress: 0 };
    } else if (task.status === "inprogress") {
      return { name: uname, progress: 50 };
    } else {
      return { name: uname, progress: 100 };
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h4 className="p-3" style={{ fontSize: "18px" }}>
            Project Id :{id} Report
          </h4>
        </div>
        <div className="ms-auto col-auto">
          <button className="btn btn-success p-1 mt-2" onClick={exportToPDF}>
            Export to PDF
          </button>
        </div>
      </div>
      {/* --------------- project --------- */}
      <div className="print-report">
        <hr></hr>
        <h3 className="ms-2 text-center">Project Details</h3>
        <div className="row">
          <div className="table-responsive container col-12 col-md-6 col-lg-6">
            <table
              className="table table-bordered table-striped table-hover"
              style={{ height: "470px" }}
            >
              <tbody>
                <tr>
                  <th className="col-4">Project Id</th>
                  <td className="col-8">{id}</td>
                </tr>
                <tr>
                  <th className="col-4">Project Name</th>
                  <td className="col-8">{projectName}</td>
                </tr>
                <tr>
                  <th className="col-4">Description</th>
                  <td className="col-8">{description}</td>
                </tr>
                <tr>
                  <th className="col-4">Team Members</th>
                  <td className="col-8">
                    {selectedValues.map((option, index) => (
                      <span key={index}>
                        {option.label}
                        {index !== selectedValues.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th className="col-4">Completed Task</th>
                  <td className="col-8">{completedTask}</td>
                </tr>
                <tr>
                  <th className="col-4">Total Task</th>
                  <td className="col-8">{totalTask}</td>
                </tr>
                <tr>
                  <th className="col-4">Start Date</th>
                  <td className="col-8">{startDate}</td>
                </tr>
                <tr>
                  <th className="col-4">End Date</th>
                  <td className="col-8">{endDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-md-6 col-lg-6 ">
            <h4 className="text-center m-3">Individual Task Progress</h4>
            <BarChart width={500} height={300} className="mx-auto" data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="progress"
                barSize={30}
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
            <h4 className="text-center m-3">Project Progress</h4>
            <div
              className="progress border border-1 col-10 mx-auto"
              style={{ height: "20px" }}
            >
              <div
                className="progress-bar"
                style={{ width: `${projectProgress}%` }}
              >
                {projectProgress}%
              </div>
            </div>
          </div>
        </div>
        {/* --------------- task --------- */}
        <h3 className="text-center">Task Details</h3>
        <div className="table-responsive container">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th className="col-1 bg-info text-white">Task Id</th>
                <th className="col-2 bg-info text-white">Task Name</th>
                <th className="col-3 bg-info text-white">Description</th>
                <th className="col-2 bg-info text-white">Assigned To</th>
                <th className="col-1 bg-info text-white">Priority</th>
                <th className="col-1 bg-info text-white">Deadline</th>
                <th className="col-1 bg-info text-white">Task Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.taskId}</td>
                    <td>{task.taskName}</td>
                    <td>{task.taskDescription}</td>
                    <td>{task.assignedTo}</td>
                    <td>{task.priority}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {totalTask === 0 && (
            <p className="col-12 text-center">No task present</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;