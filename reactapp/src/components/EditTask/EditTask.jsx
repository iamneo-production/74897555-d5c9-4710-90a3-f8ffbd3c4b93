
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api, { BASE_URL } from "../../utils/api";
import Swal from 'sweetalert2';

const TaskEditPage = () => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    assignedTo: "",
    priority: "",
    deadline: "",
    status: ""
  });
  const [options, setOptions] = useState([]);
  const navigate = useNavigate(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let projectId = searchParams.get('projectId');
  let taskId = searchParams.get('taskId');
  taskId = parseInt(taskId, 10);
  projectId = parseInt(projectId, 10);
  const role=decodedToken.role;
  const isManager = role === "MANAGER";

  useEffect(() => {
    api
      .get(`${BASE_URL}/projects/${projectId}`)
      .then(response => {
        const teammembers = response.data.members;
        const transformedOptions = teammembers.map(option => ({
          value: option.value,
          label: option.value + " " + option.label
        }));
        setOptions(transformedOptions);
      })
      .catch(error => {
        console.error('Error loading project:', error);
      });
  }, [projectId]);

  useEffect(() => {
    api
      .get(`${BASE_URL}/tasks/${taskId}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
      });
  }, [taskId]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };
  
  const sweetalert =()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Task Updated Successfully',
      showConfirmButton: false,
      width:'500px',
      height:'200px',
      timer: 1500
    });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await api.put(`${BASE_URL}/tasks/${taskId}`, task)
    sweetalert();
    console.log('Task updated successfully!');
    setTimeout(() => {
      navigate(`/tasklist?projectId=${projectId}`);
    }, 2000);
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
                  EDIT TASK
                </h1>
              </center>
              <table className="t-ble border border-0 mx-1 pt-1 "
                style={{ width: "95%", borderCollapse: "separate", borderSpacing: "0 10px" }}
                border="0" cellSpacing="10"align="center"   >
                <tbody>
                  <tr className="table-row mt-1">
                    <td>
                      <label className="lable-txt d-flex align-items-center" style={{ fontWeight: "500", fontSize: "large" }}  >
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
                        onChange={handleChange}
                        required
                        disabled={!isManager}
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
                  onChange={handleChange}
                  required
                  disabled={!isManager}>
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
                    <select className="dropdown2" style={{ width: "80%", marginLeft: "50px", height: "28px" }} name="assignedTo" value={task.assignedTo}
                  onChange={handleChange}
                  required
                  disabled={!isManager}
                  >
                      <option value="">select a user</option>
                      {options.map(option => (
                      <option key={option.value} value={option.label}>{option.label}</option>
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
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        required
                        disabled={!isManager}
                      >
                        <option disabled value="">
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
                        onChange={handleChange}
                        required
                        disabled={!isManager}
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
                      {" "}
                      <input 
                        type="radio"
                        name="status"
                        value="pending"
                        checked={task.status === "pending"}
                        onChange={handleChange}
                        disabled={isManager}
                      />
                      Pending
                      <input 
                        type="radio"
                        name="status"
                        value="inprogress"
                        checked={task.status === "inprogress"}
                        onChange={handleChange}
                        disabled={isManager}
                      />
                      InProgress
                      <input 
                        type="radio"
                        name="status"
                        value="completed"
                        checked={task.status === "completed"}
                        onChange={handleChange}
                        disabled={isManager}
                      />
                      Completed
                    </td>
                  </tr>
                  <tr></tr>
                  <tr className="table-row mt-1">
                    <td></td>
                    <td className="btn-btn d-flex" style={{ marginLeft: "40px" }}>
                    <Link to={`/tasklist?projectId=${projectId}`}>
                      <input className="btn2 w-150 h-40 mr-1 m-1 text-white bg-info border border-1 border-solid border-light rounded-2"
                        style={{ fontSize: "18px", width: "150px", height: "40px"  }}
                        type="button"
                        value="Back"
                      />
                    </Link>
                      <input className="btn1 w-150 h-40 mr-1 m-1 text-white bg-success border border-1 border-solid border-light rounded-2 opacity-50"
                        style={{ fontSize: "18px", width: "150px", height: "40px"  }}
                        type="submit"
                        value="Update Task"                 
                      />               
                     </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>       
      );
};

export default TaskEditPage;



