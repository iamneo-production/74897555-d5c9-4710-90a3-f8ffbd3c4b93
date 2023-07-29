package com.example.springapp.service;

import com.example.springapp.model.Communication;
import com.example.springapp.repository.CommunicationRepository;
import com.example.springapp.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunicationService {

    @Autowired
    private CommunicationRepository communicationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public void savechat(Communication communicationEntity, Long id) {
          projectRepository.findById(id).map(project -> {
	      communicationEntity.setProject(project);
	      return communicationRepository.save(communicationEntity);
	    });
    }

    public List<Communication> findByProject(Long id) {
        return communicationRepository.findByProjectidd(id);
    }

    // public void saveCommunication(Communication communication) {
    //     communicationRepository.save(communication);
    // }

    // public List<Communication> getAllCommunication() {
    //     return communicationRepository.findAll();
    // }
}
