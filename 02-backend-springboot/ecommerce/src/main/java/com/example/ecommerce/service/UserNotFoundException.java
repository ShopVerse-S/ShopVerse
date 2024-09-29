package com.example.ecommerce.service;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException(String userNotFound) {
        super(userNotFound);
    }
}
