package com.example.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import java.util.Map;

import static java.time.LocalTime.now;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_role", nullable = false)
    private String role;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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


    public void setEnabled(boolean b) {

    }

    public String getEmail() {

        return email;
    }

    public Map<Object, Object> getRole() {
        return null;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static String getTimeZone(Object o) {
        if (o instanceof User) {
            User user = (User) o; // Cast the object to User
            return user.getTimeZone(now()); // Retrieve the time zone from the user object
        }
        return null; // Return null if the object is not a User instance
    }
}
