import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/taskcreation" element={<TaskCreationPage />} />
        <Route path="/edittask" element={<TaskEditPage />} />
      </Routes>
    </div>
  );
};

export default App;
