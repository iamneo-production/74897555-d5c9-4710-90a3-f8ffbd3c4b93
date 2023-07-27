import { useNavigate } from "react-router-dom";
const Project = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <label>Name : </label>
        <input type="text" placeholder="enter the name" />
        <br></br>
        <label>description</label>
        <textarea placeholder="enter description"></textarea>
        <br></br>
        <label>Start Date : </label>
        <input type="text" placeholder="enter the start date" />
        <br></br>
        <label>End Date : </label>
        <input type="text" placeholder="enter the end date" />
        <br></br>
        <button type="submit">submit</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};
export default Project;
