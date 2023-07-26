package com.example.springapp.service;

import java.util.*;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.springapp.model.User;

public interface JwtService {

  public String generateToken(User userDetails, UserDetails userD);

  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

}
