package com.example.ecommerce.service;

public class InvalidTokenException extends Throwable {
    public InvalidTokenException(String invalidOrExpiredToken) {
               super(invalidOrExpiredToken);
        }
    }

