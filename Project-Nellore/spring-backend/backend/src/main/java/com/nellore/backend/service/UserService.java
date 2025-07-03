package com.nellore.backend.service;

import com.nellore.backend.model.User;
import com.nellore.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User registerUser(String fullName, String email, String password) {
        if (emailExists(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        // Password logic removed for Google-only login
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            // Password authentication not supported. Use Google login.
            throw new RuntimeException("Password authentication not supported. Use Google login.");
        }
        throw new RuntimeException("Invalid email or password");
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
} 