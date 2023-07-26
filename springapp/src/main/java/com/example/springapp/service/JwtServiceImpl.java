package com.example.springapp.service;

import java.security.Key;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.springapp.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtServiceImpl implements JwtService {

  private static final String SECRET_KEY = "357538782F413F4428472D4B6150645367566B59703373367639792442264529";

  @Override
  public String generateToken(User userDetails,UserDetails userD) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", userDetails.getId());
    claims.put("username", userDetails.getUsername1());
    claims.put("email", userDetails.getEmail());
    claims.put("firstName", userDetails.getFirstName());
    claims.put("lastName", userDetails.getLastName());
    claims.put("role",userDetails.getRole());
    return generateToken(claims, userD);
  }

  @Override
  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
  };

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
