package com.example.ecommerce.controller;

import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.AuthService;
import com.example.ecommerce.service.InvalidTokenException;
import com.example.ecommerce.service.UserNotFoundException;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public static class UserLogin {
        private String username;
        private String password;

        // Getters and Setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @PostMapping("/reset-password-token")
    public void requestPasswordReset(@RequestParam String email) {
        // Logic to fetch user by email and generate token
        Long userId = Long.valueOf(userService.findByEmail(email).getId()); // Assuming userService exists
        AuthService authService = null;
        String token = authService.generatePasswordResetToken(userId);
        // Send token via email (implement email service)
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestParam String token, @RequestParam String newPassword) throws UserNotFoundException, InvalidTokenException {
        AuthService authService = null;
        authService.resetPassword(token, newPassword);
    }
}
