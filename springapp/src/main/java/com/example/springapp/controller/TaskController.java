package com.example.springapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.model.Task;
import com.example.springapp.service.TaskService;

@RestController
@CrossOrigin()
@RequestMapping()
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/projects/{projectid}/tasks")
    public ResponseEntity<Task> createTask(@PathVariable(value = "projectid") Long projectid,
            @RequestBody Task taskRequest) {
    try
    {
        Task task = taskService.createTask(projectid, taskRequest);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<List<Task>> getTaskByProjectId(@PathVariable(value = "projectId") Long projectId) {
    try
    {
        List<Task> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }

    @GetMapping("/projects/users/{userId}/tasks")
    public ResponseEntity<List<Task>> getTaskByUserId(@PathVariable(value = "userId") int userId) {
    try{
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }
    catch(Exception e)
    {
      throw new RuntimeException(e);  
    }
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
    try
    {
        Task task = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(task);
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable(value = "id") Long id) {
    try
    {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
    try
    {
        return taskService.getAllTasks();
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable(value = "id") Long taskId) {
    try
    {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully.");
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }
    }
}
