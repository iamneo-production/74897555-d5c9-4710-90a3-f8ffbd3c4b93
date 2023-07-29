package com.example.springapp.model;
import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Communication{
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String description;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "projectid", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Project project;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public Communication(Long id, String name, String description, Project project) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.project = project;
	}
	public Communication() {
		
	}
	@Override
	public String toString() {
		return "Communication [id=" + id + ", name=" + name + ", description=" + description + ", project=" + project
				+ "]";
	}
	
	
}
