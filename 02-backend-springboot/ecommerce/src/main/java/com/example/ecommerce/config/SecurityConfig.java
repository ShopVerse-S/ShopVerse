package com.example.ecommerce.config;

import com.example.ecommerce.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public SecurityConfig(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    //public SecurityConfig(BCryptPasswordEncoder passwordEncoder) {
    //    this.passwordEncoder = passwordEncoder;
    //}

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        // In-memory user setup
        /*authenticationManagerBuilder
                .inMemoryAuthentication()
                .withUser("user") // Username
                .password(passwordEncoder.encode("123")) // Password
                .roles("USER","ADMIN"); // Role*/
        authenticationManagerBuilder.userDetailsService(userService).passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }
   /* @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for now (be cautious in production)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/product-category/**", "/api/products/**", "/api/auth/register","/api/auth/**").permitAll() // Public endpoints
                        .anyRequest().authenticated() // All other requests need authentication
                )
                .formLogin(login -> login
                        .loginProcessingUrl("/api/auth/login") // Backend login processing URL
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                        .failureHandler((request, response, exception) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
                        })
                )
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                );
        return http.build();
    }
*/
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       http
               // Disable CSRF using the lambda-style configuration
               .csrf(csrf -> csrf.disable()) // Updated for Spring Security 6.1
               .sessionManagement(session -> session
                       .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No session for stateless JWT auth
               )
               .authorizeHttpRequests(authz -> authz
                       .requestMatchers("/api/product-category/**", "/api/products/**", "/api/auth/register","/api/auth/login","/api/users/**").permitAll() // Publicly accessible authentication endpoints
                       .anyRequest().authenticated() // Other requests require authentication
               )
               .httpBasic(httpBasic -> httpBasic.disable()) // Disable HTTP basic auth
               .formLogin(formLogin -> formLogin.disable()); // Disable form-based login

       return http.build();
   }

}
