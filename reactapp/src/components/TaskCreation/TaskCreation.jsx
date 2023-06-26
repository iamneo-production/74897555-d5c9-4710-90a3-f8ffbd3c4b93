import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

const TaskCreationPage = () => {

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    assignedTo: "",
    priority: "",
    deadline: "",
    status:""
  
  });
  const [status, setStatus] = useState("pending");
  const [options, setOptions] = useState([]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setTask(prevTask => ({ ...prevTask, status: e.target.value }));
  };
  let handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const transformedOptions = response.data.map(option => ({
          value: option.id,
          label: option.id + " " + option.name
        }));
        setOptions(transformedOptions);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get('projectId');
  const name = searchParams.get('name');

  const resetForm = () => {
    setTask({
      taskName: "",
      taskDescription: "",
      assignedTo: "",
      priority: "",
      deadline: "",
      status: ""
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
   // await axios.post('http://localhost:8080/tasks', task);
    alert('Task created successfully!');
    resetForm();
    
  };

  return (
    <div className="main">
      <div
        className="Form-container position-absolute  p-5 rounded-2 d-flex justify-content-center bg-light position-absolute  "
        style={{ width: "700px !important", height: "500px !important", transform: "translate(-50%,-50%)", top: "50%", left: "50%",}} >
        <form className="Form max-vh-4 mx-auto align-items-center" name="taskcreation" onSubmit={onSubmit} >
          <center>
            <h1 className="text-white text-center"
              style={{paddingTop: "5px", paddingBottom: "5px", fontSize: "30px",transform: "translateY(-15px)",width: "600px", height: "50px", background: "#1a256f" }}  >
              TASK CREATION 
            </h1>
            <p style={{ fontWeight: 'bold' }}>Project Id: {projectId}</p>
            <p style={{ fontWeight: 'bold' }}>Project Name: {name}</p>
          </center>
          <table className="t-ble border border-0 mx-1 pt-1 "
            style={{ width: "95%", borderCollapse: "separate", borderSpacing: "0 10px" }}
            border="0" cellSpacing="10"align="center"   >
            <tbody>
              <tr className="table-row mt-1">
                <td>
                  <label className="lable-txt d-flex align-items-center " style={{ fontWeight: "500", fontSize: "large",  }}  >
                    TaskName:<span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td className="in-field">
                  <input className="in-field width-80" 
                    style={{ width: "80%", marginLeft: "50px" }}
                    type="text"
                    placeholder="enter Task Name"
                    name="taskName"
                    value={task.taskName}
                    onChange={handleChange} required
                  />
                </td>
              </tr>
              <tr className="table-row mt-1 ">
                <td>
                  <label className="lable-txt d-flex align-items-center"
                    style={{ fontWeight: "500", fontSize: "large" }}   >
                    <center>TaskDescription:</center><span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td>
                  <textarea className="txtarea"
                    style={{ width: "80%", marginLeft: "50px" }}
                    rows="2"
                    cols="21"
                    placeholder="enter Task Description"
                    name="taskDescription"
                    value={task.taskDescription}
                    onChange={handleChange} required>
                  </textarea>
                </td>
              </tr>
              <tr className="table-row mt-1">
                <td>
                  <label className="lable-txt d-flex align-items-center"
                    style={{ fontWeight: "500", fontSize: "large" }}  >
                    AssignedTo:<span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td className="in">
                <select className="dropdown2" style={{ width: "80%", marginLeft: "50px", height: "28px" }} name="assignedTo" value={task.assignedTo} onChange={handleChange}required>
                    <option value="">select a user</option>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option> 
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="table-row mt-1">
                <td>
                  <label className="lable-txt d-flex align-items-center"
                    style={{ fontWeight: "500", fontSize: "large" }}
                  >
                    Priority:<span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td>
                  <select className="dropdown"
                    style={{ width: "80%", marginLeft: "50px" }}
                    name="priority" required
                  >
                    <option disabled selected value="">
                      select priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
              </tr>
              <tr className="table-row mt-1">
                <td>
                  <label className="lable-txt d-flex align-items-center"
                    style={{ fontWeight: "500", fontSize: "large" }} >
                    Deadline:<span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td className="in">
                  <input className="in-field"
                    style={{ width: "80%", marginLeft: "50px" }}
                    type="Date"
                    placeholder="enter the deadline"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange} required
                  />
                </td>
              </tr>
              <tr className="table-row1 mt-1">
                <td>
                  <label className="lable-txt1 d-flex align-items-center"
                    style={{ fontWeight: "500", fontSize: "large" }}  >
                    Status:<span className="text-danger font-weight-bold"> *</span>
                  </label>
                </td>
                <td className="radio-btn1 d-flex justify-content-evenly ml-3" style={{paddingLeft:"20px"}}>
                  {" "}
                  <input 
                    type="radio"
                    name="status"
                    value="pending"
                    checked={task.status === "pending"}
                    onChange={handleStatusChange}
                  />
                  Pending

                  <input 
                    type="radio"
                    name="status"
                    value="inprogress"
                    checked={task.status === "inprogress"}
                    onChange={handleStatusChange}
                  />
                  InProgress

                  <input 
                    type="radio"
                    name="status"
                    value="completed"
                    checked={task.status === "completed"}
                    onChange={handleStatusChange}
                  />
                  Completed
                </td>
              </tr>
              <tr></tr>
              <tr className="table-row mt-1">
                <td></td>
                <td className="btn-btn d-flex" style={{ marginLeft: "40px" }}>
                  <input className="btn1 w-150 h-40 mr-1 m-1 text-white bg-success border border-1 border-solid border-light rounded-2 opacity-50"
                    style={{ fontSize: "18px", width: "150px", height: "40px" }}
                    type="submit"
                    value="Create Task"
                    
                  />
                  {"    "}
                  <Link to="/projectdetails">
                  <input className="btn2 w-150 h-40 mr-1 m-1 text-white bg-info border border-1 border-solid border-light rounded-2"
                    style={{ fontSize: "18px", width: "150px", height: "40px"  }}
                    type="button"
                    value="Back"
                  />
                 </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TaskCreationPage;