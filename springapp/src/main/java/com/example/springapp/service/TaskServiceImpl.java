package com.example.springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.exception.ResourceNotFoundException;
import com.example.springapp.model.Project;
import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.ProjectRepository;
import com.example.springapp.repository.TaskRepository;
import com.example.springapp.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;
  
    @Override
    public Task createTask(Long projectId, Task taskRequest) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        taskRequest.setProject(project);
        String assignedTo = taskRequest.getAssignedTo();
        int assignedToId = Integer.parseInt(assignedTo.split(" ")[0]);

        User user = userRepository.findById(assignedToId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + assignedToId));
        taskRequest.setUser(user);
        return taskRepository.save(taskRequest);
    }
   
    @Override
    public Task updateTask(Long taskId, Task updatedTask) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        task.setTaskName(updatedTask.getTaskName());
        task.setTaskDescription(updatedTask.getTaskDescription());
        task.setAssignedTo(updatedTask.getAssignedTo());
        task.setPriority(updatedTask.getPriority());
        task.setDeadline(updatedTask.getDeadline());
        task.setStatus(updatedTask.getStatus());
        String assignedTo=updatedTask.getAssignedTo();
        int assignedToId = Integer.parseInt(assignedTo.split(" ")[0]);
        User user=userRepository.findById(assignedToId)
                .orElseThrow(()-> new RuntimeException("user not found with id: "+assignedToId));
        task.setAssignedToId(assignedToId);
        task.setUser(user);  
        return taskRepository.save(task);   
    }

   
    
   
}
