import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProjectCreate from "./components/ProjectCreate/ProjectCreate";
import TaskCreation from "./components/TaskCreation/TaskCreation";
import EditTask from "./components/EditTask/EditTask";
import EditProject from "./components/EditProject/EditProject";
import TaskDetails from "./pages/TaskDetails";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/taskcreation" element={<TaskCreation />} />
        <Route path="/edittask" element={<EditTask />} />
        <Route path="/projects" element={<ProjectCreate />} />
        <Route path="/editproject" element={<EditProject />} />
        {/* change path once merge backend */}
        <Route path="/tasklist" element={<TaskDetails />} />
      </Routes>
    </div>
  );
};

export default App;
