package com.example.ecommerce.service;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register user and insert into database
    public void register(User user) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Username or Email already exists");
        }

        // Set default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");  // Set default role to 'USER'
        }
        System.out.println("User role: " + user.getRole());


        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);  // Save the user to the database
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    public User makeUserAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ADMIN");
        return userRepository.save(user);
    }

    public ZoneId findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getTimeZone) // Retrieve the time zone string
                .map(ZoneId::of) // Convert it to ZoneId
                .orElse(null); // Return null if the user is not found
    }
}
