import React, { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import api, { BASE_URL } from "../../utils/api";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState({});
  const [teammember, setTeammember] = useState([]);
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const result = await api.get(`${BASE_URL}/projects/${projectId}`);
        const data = result.data;
        console.log("Erttr***");
        setTeammember(result.data.members);
        setProjectData(data);
      } catch (error) {
        console.log("API Not working");
      }
    };
    handleFetch();
  }, []);

  return (
    <div>
      <ProjectList
        projectId={projectId}
        projectName={projectData.projectName}
        projectDescription={projectData.description}
        projectStartDate={projectData.startDate}
        projectEndDate={projectData.endDate}
        projectTeammember={teammember}
      />
    </div>
  );
};

export default ProjectDetails;
