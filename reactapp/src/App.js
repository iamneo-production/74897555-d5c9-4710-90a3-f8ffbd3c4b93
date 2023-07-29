import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProjectCreate from "./components/ProjectCreate/ProjectCreate";
import EditProject from "./components/EditProject/EditProject";
import ProjDet from "./pages/ProjDet";
import TaskCreationPage from "./components/TaskCreation/TaskCreation";
import TaskEditPage from "./components/EditTask/EditTask";
import TaskDetails from "./pages/TaskDetails";
import Navbar from "./components/Dashboard/Navbar";
import ReportDetails from "./components/Report/ReportDetails";
import { useContext } from "react";
import { TokenContext } from "./utils/TokenContext";
import Communication from "./components/communication/Communication";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const App = () => {
  const { decodedToken } = useContext(TokenContext);s

  return (
    <div>
      {decodedToken ? <Navbar /> : ""}
      <Routes>
        <Route
          exact
          path="/login"
          element={decodedToken ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/" element={decodedToken ? <Home /> : <LandingPage />} />
        <Route path="/tasklist" element={<TaskDetails />} />
        <Route path="/projects" element={<ProjectCreate />} />
        <Route path="/projectdetails/:projectId" element={<ProjDet />} />
        <Route path="/projects/:id" element={<EditProject />} />
        <Route path="/taskcreation" element={<TaskCreationPage />} />
        <Route path="/edittask" element={<TaskEditPage />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/report/:id" element={<ReportDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
