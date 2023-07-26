package com.example.springapp.controller;

import com.example.springapp.model.Communication;
import com.example.springapp.model.Project;
import com.example.springapp.service.CommunicationService;
import com.example.springapp.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CommunicationController {

    @Autowired
    private CommunicationService communicationService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/addchat/{id}")
    public String saveCommunication(@RequestBody Communication communicationEntity,@PathVariable Long id) 
	 {	 
        communicationService.savechat(communicationEntity,id);	
	    return "Chat added";
	  }

    @GetMapping("/project/manager/{id}")
    public Project getProjectmid(@PathVariable Long id)
    {
        return projectService.getProjectbymid(id);
    }

    @GetMapping("/communication/{id}")
    public List<Communication> getchat(@PathVariable Long id)
    {
        return communicationService.findByProject(id);
    }
}
