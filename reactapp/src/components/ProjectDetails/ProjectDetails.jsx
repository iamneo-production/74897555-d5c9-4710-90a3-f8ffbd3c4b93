import React from "react";
import ProjectList from "./ProjectList";

const ProjecrDetails = () => {
  // Event handlers
  /*
    const handleAddTask = () => {
        // Add task logic
      };
    
      const handleViewTaskDetails = () => {
        // View task details logic
      };
    
      const handleEditProject = () => {
        // Edit project logic
      };
    
      const handleDeleteProject = () => {
        // Delete project logic
      };
    */

  return (
    <div>
      <ProjectList
        projectId="123"
        projectName="My Project"
        projectDescription="This is my project"
        projectStartDate="2023-05-01"
        projectEndDate="2023-06-30"
        // onAddTask={handleAddTask}
        // onViewTaskDetails={handleViewTaskDetails}
        // onEditProject={handleEditProject}
        // onDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default ProjecrDetails;
