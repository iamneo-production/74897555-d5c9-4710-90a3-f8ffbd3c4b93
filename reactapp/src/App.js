import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Communication from "./components/communication/Communication";
import ProjectCreate from "./components/ProjectCreate/ProjectCreate";
import TaskCreation from "./components/TaskCreation/TaskCreation";
import EditTask from "./components/EditTask/EditTask";
import Navbar from "./components/Dashboard/Navbar";
import EditProject from "./components/EditProject/EditProject";
import ReportDetails from "./components/Report/ReportDetails";
import TaskDetails from "./pages/TaskDetails";
import Home from "./pages/Home";
import ProjecrDetails from "./components/ProjectDetails/ProjectDetails";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/taskcreation" element={<TaskCreation />} />
        <Route path="/edittask" element={<EditTask />} />
        <Route path="/projects" element={<ProjectCreate />} />
        <Route path="/projectdetails" element={<ProjecrDetails />} />
        <Route path="/report" element={<ReportDetails />} />
        <Route path="/editproject" element={<EditProject />} />
        {/* change path once merge backend */}
        <Route path="/projects" element={<ProjectCreate />} />
        <Route path="/editproject" element={<EditProject />} />
        {/* change path once merge backend */}
        <Route path="/tasklist" element={<TaskDetails />} />
      </Routes>
    </div>
  );
};

export default App;
