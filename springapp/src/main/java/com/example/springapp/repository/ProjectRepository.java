package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springapp.model.Project;

public interface ProjectRepository extends JpaRepository<Project,Long>{

}
