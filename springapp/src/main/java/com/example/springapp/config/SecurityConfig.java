package com.example.springapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  private final JWTAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors()
        .and()
        .csrf()
        .disable()
        .authorizeRequests()
        .antMatchers("/api/v1/auth/**").permitAll()
        // .antMatchers("/api/v1/user/**")
        // .hasAnyRole(Role.USER.name(), Role.MANAGER.name())
        // .antMatchers(HttpMethod.GET, "/api/v1/user/**")
        // .hasAnyAuthority(Permission.USER_READ.name(), Permission.MANAGER_READ.name())
        // .antMatchers(HttpMethod.POST, "/api/v1/user/**")
        // .hasAnyAuthority(Permission.USER_CREATE.name(),
        // Permission.MANAGER_CREATE.name())
        // .antMatchers(HttpMethod.PUT, "/api/v1/user/**")
        // .hasAnyAuthority(Permission.USER_UPDATE.name(),
        // Permission.MANAGER_UPDATE.name())
        // .antMatchers(HttpMethod.DELETE, "/api/v1/user/**")
        // .hasAnyAuthority(Permission.USER_DELETE.name(),
        // Permission.MANAGER_DELETE.name())
        // .antMatchers("/api/v1/manager/**").hasRole(Role.MANAGER.name())
        // .antMatchers(HttpMethod.GET,
        // "/api/v1/manager/**").hasAuthority(Permission.MANAGER_READ.name())
        // .antMatchers(HttpMethod.POST,
        // "/api/v1/manager/**").hasAuthority(Permission.MANAGER_CREATE.name())
        // .antMatchers(HttpMethod.PUT,
        // "/api/v1/manager/**").hasAuthority(Permission.MANAGER_UPDATE.name())
        // .antMatchers(HttpMethod.DELETE,
        // "/api/v1/manager/**").hasAuthority(Permission.MANAGER_DELETE.name())
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
