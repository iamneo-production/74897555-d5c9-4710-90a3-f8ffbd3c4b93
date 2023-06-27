import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Communication from "./components/communication/Communication";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/communication" element={<Communication/>}/>
      </Routes>
    </div>
  );
};

export default App;
