package com.example.springapp.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springapp.model.Communication;

public interface CommunicationRepository extends JpaRepository<Communication,Long>{

   @Query(nativeQuery = true, value = "SELECT * FROM communication WHERE projectid = :id")
    List<Communication> findByProjectidd(Long id);
    
}
