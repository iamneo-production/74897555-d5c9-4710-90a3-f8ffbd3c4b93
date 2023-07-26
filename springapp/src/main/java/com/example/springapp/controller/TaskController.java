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
        Task task = taskService.createTask(projectid, taskRequest);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }
   
    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        Task task = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(task);
    }

    

}
