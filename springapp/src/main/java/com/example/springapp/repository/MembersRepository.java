package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springapp.model.Members;

public interface MembersRepository extends JpaRepository<Members,Long>{

    
}
