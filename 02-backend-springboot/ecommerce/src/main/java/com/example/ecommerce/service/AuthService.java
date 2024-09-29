package com.example.ecommerce.service;

import com.example.ecommerce.model.PasswordResetToken;
import com.example.ecommerce.repository.PasswordResetTokenRepository;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.util.UUID;

import static java.time.Instant.now;

@Service
public class AuthService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    public String generatePasswordResetToken(Long userId) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUserId(userId);
        passwordResetToken.setExpiryDate(expiryDate);

        passwordResetTokenRepository.save(passwordResetToken);
        return token;
    }

    public PasswordResetToken validatePasswordResetToken(String token) throws InvalidTokenException {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);

        if (passwordResetToken == null || passwordResetToken.getExpiryDate().isBefore(ChronoLocalDateTime.from(now()))) {
            throw new InvalidTokenException("Invalid or expired token");
        }

        return passwordResetToken;
    }

    public void resetPassword(String token, String newPassword) throws InvalidTokenException, UserNotFoundException {
        PasswordResetToken passwordResetToken = validatePasswordResetToken(token);

        User user = userRepository.findById(passwordResetToken.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);

        passwordResetTokenRepository.delete(passwordResetToken);
    }
}
