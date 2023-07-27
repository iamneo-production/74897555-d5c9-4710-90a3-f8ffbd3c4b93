import React,{useState,useEffect} from "react";
import { Link , useLocation , useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import api, { BASE_URL } from "../../utils/api";
import Swal from "sweetalert2";

const TaskList = () => {
  const [taskdetails, setTaskdetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let projectId = searchParams.get("projectId");

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  const role = decodedToken.role;
  const userId = decodedToken.id;

  const sweetalert = () => {
    Swal.fire({
      icon: "success",
      text: "Task Deleted Successfully 👍",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    if (role === "MANAGER") {
      api
        .get(`${BASE_URL}/projects/${projectId}/tasks`)
        .then((response) => {
          setTaskdetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    } else {
      api
        .get(`${BASE_URL}/projects/users/${userId}/tasks`)
        .then((response) => {
          setTaskdetails(response.data);
        })
        .catch((error) => {
          console.log("Error fetching options:", error);
        });
    }
  }, [role, projectId, userId]);

  const navigate = useNavigate();

  const deleteTask = async (taskid) => {
    await api.delete(`${BASE_URL}/task/${taskid}`, taskid);
    sweetalert();
    setTimeout(() => {
      navigate(`/projectdetails/${projectId}`);
    }, 2000);
  };

  const tasksPerPage = 2;
  const offset = currentPage * tasksPerPage;
  const pageCount = Math.ceil(taskdetails.length / tasksPerPage);
  const currentTasks = taskdetails.slice(offset, offset + tasksPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleSortOrder = () => {
    const newSortOrder = sortOrder === "ascending" ? "descending" : "ascending";
    setSortOrder(newSortOrder);
  };

  // Sort the tasks based on task ID
  const sortedTasks = currentTasks.sort((a, b) => {
    if (sortOrder === "ascending") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      return new Date(b.deadline) - new Date(a.deadline);
    }
  });

  const filteredTasks = sortedTasks.filter((val) => {
    if (searchTerm.trim() === "") {
      return val;
    } else if (val.taskName.toLowerCase().includes(searchTerm.toLowerCase()) || val.taskId.toString().includes(searchTerm)){
      return val;
    }
    return null;
  });

  function getStatusColorClass(status) {
    if (status === "completed") {
      return "text-success";
    } else if (status === "inprogress") {
      return "text-info";
    } else if (status === "pending") {
      return "text-danger";
    } else {
      return "";
    }
  }
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
      <div className=" container d-flex justify-content-center align-item-center vh-60 mb-3 mt-2">
        <button
          onClick={handleSortOrder}
          className="btn btn-primary pt-2 pb-2 ps-4 pe-4 text-white me-3 mb-2"
        >
          Sort: {sortOrder === "ascending" ? "Ascending" : "Descending"}
        </button>

        <div className="col-md-2">
          <input
            className="mb-3 form-control "
            type="text"
            placeholder="search.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="container text-center">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/task-not-found-4810738-4009510.png"
            alt=""
            height="300px"
            width="270px"
            style={{ maxWidth: "100%" }}
          />
          <h2 className="mb-5 text-center"> No Task Found !! </h2>
        </div>
      ) : (
        filteredTasks.map((task, index) => (
          // Task item rendering code...
      <div className="d-flex justify-content-center align-item-center vh-70" key={index}>
        <div
          className="d-block overflow-auto bg-white shadow mb-4 p-5 rounded-2 float-start text-start"
          style={{
            width: "60%",
            fontSize: "19px",
          }}
        >
          <label>
                <strong>Project Id : </strong> {projectId}
              </label>
              <br />
              <br />
              <label>
                {" "}
                <strong>Task Id : </strong> {task.taskId}{" "}
              </label>
              <br />
              <br />
          <label>
            {" "}
            <strong>Task Name : </strong> {task.taskName}{" "}
          </label>
          <br />
          <br />
          <label>
          {" "}
                <strong>Task Description : </strong> {task.taskDescription}
              </label>{" "}
              {role === "MANAGER" ? (
                <>
                  <br />
                  <br />
                  <label>
                    {" "}
                    <strong>Assigned to : </strong>{" "}
                    {task.assignedTo.split(" ")[1].trim()}
                  </label>
                </>
              ) : null}
              <br />
              <br />
              <label>
                {" "}
                <strong>Task Priority : </strong>
                {task.priority}
              </label>
              <br />
              <br />
              <label>
                {" "}
                <i class="fa fa-calendar"></i> <strong>Deadline : </strong>{" "}
                {task.deadline}
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
            <strong>Task Status : </strong> 
            <span className={getStatusColorClass(task.status)}>
                  {task.status}
                </span>
          </label>
          <br />
          <br />
          <div className="d-flex justify-content-center align-item-center vh-60">
            <Link to={`/edittask?projectId=${projectId}&taskId=${task.taskId}`}>
              <button className="btn btn-info btn-lg pt-3 pb-3 ps-4 pe-4 text-white me-3">
                {" "}
                Edit Task
              </button>{" "}
            </Link>
            {role === "MANAGER" ? (
                  <button
                    className="btn btn-danger btn-lg pt-3 pb-3 ps-4 pe-4"
                    onClick={() => deleteTask(task.taskId)}
                  >
                    {" "}
                    Delete Task{" "}
                  </button>
                ) : null}
          </div>
        </div>
      </div>
       ))
       )}
       {filteredTasks.length === 0 ? null : (
         <div className="pagination-container">
           <ReactPaginate
             previousLabel={"Previous"}
             nextLabel={"Next"}
             breakLabel={"..."}
             pageCount={pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageChange}
             containerClassName={"pagination justify-content-center p-2 m-2"}
             pageClassName={"page-item"}
             pageLinkClassName={"page-link"}
             previousClassName={"page-item"}
             previousLinkClassName={"page-link"}
             nextClassName={"page-item"}
             nextLinkClassName={"page-link"}
             breakClassName={"page-item"}
             breakLinkClassName={"page-link"}
             activeClassName={"active"}
           />
         </div>
       )}
       <br />
    </div>
  );
};

export default TaskList;
