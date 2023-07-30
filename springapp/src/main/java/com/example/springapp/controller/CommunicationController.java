package com.example.springapp.controller;


import com.example.springapp.model.Communication;
import com.example.springapp.model.Project;
import com.example.springapp.service.CommunicationService;
import com.example.springapp.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CommunicationController {

    @Autowired
    private CommunicationService communicationService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/addchat/{id}")
    public String saveCommunication(@RequestBody Communication communicationEntity,@PathVariable Long id) 
	 {	 
        try
		{
        communicationService.savechat(communicationEntity,id);	
	    return "Chat added";
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
	  }

    @GetMapping("/project/manager/{id}")
    public Project getProjectmid(@PathVariable Long id)
    {
        try
		{
        return projectService.getProjectbymid(id);
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/communication/{id}")
    public List<Communication> getchat(@PathVariable Long id)
    {
        try
		{
        return communicationService.findByProject(id);
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
        }
}
