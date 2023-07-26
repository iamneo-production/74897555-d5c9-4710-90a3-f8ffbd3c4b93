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
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.model.Members;
import com.example.springapp.model.Project;
import com.example.springapp.repository.MembersRepository;
import com.example.springapp.service.ProjectService;


@RestController
@CrossOrigin
public class ProjectController {
	@Autowired
	private ProjectService projectService;


	@PostMapping("/projects")
	public ResponseEntity<Project> addProject(@RequestBody Project projects) {
		Project createdProject = projectService.addProject(projects);
		return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
	}

	@GetMapping("/projects/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
		Project project = projectService.getProjectById(id);
		return ResponseEntity.ok(project);
	}

	@GetMapping("/projects")
	public List<Project> getAllProjects() {
		return projectService.getAllProjects();
	}

	@PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projects) {
		Project updatedProject = projectService.updateProject(id, projects);
		return ResponseEntity.ok(updatedProject);
	}

	@DeleteMapping("/projects/{id}")
	public ResponseEntity<HttpStatus> deleteProjectById(@PathVariable Long id) {
		projectService.deleteProjectById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	
	
}
