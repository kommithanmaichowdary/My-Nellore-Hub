package com.nellore.backend.controller;

import com.nellore.backend.model.User;
import com.nellore.backend.service.UserService;
import com.nellore.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Allow frontend requests with credentials
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String fullName = body.get("fullName");
        String email = body.get("email");
        String password = body.get("password");
        try {
            userService.registerUser(fullName, email, password);
            return ResponseEntity.ok(Map.of("message", "Registration successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        try {
            User user = userService.authenticateUser(email, password);
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "user", Map.of(
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail()
                )
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(OAuth2AuthenticationToken authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();
        return ResponseEntity.ok(Map.of(
            "email", attributes.get("email"),
            "name", attributes.get("name"),
            "googleId", attributes.get("sub")
        ));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/test-create-user")
    public ResponseEntity<?> testCreateUser() {
        try {
            User user = new User();
            user.setGoogleId("test_google_id");
            user.setEmail("test@example.com");
            user.setFullName("Test User");
            userRepository.save(user);
            return ResponseEntity.ok("User created");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/save-user")
    public ResponseEntity<?> saveUserFromFrontend(@RequestBody Map<String, String> userData) {
        try {
            String googleId = userData.get("googleId");
            String email = userData.get("email");
            String fullName = userData.get("name"); // or "fullName" if that's what you store

            // Only create if not exists
            if (userRepository.findByGoogleId(googleId).isEmpty()) {
                User user = new User();
                user.setGoogleId(googleId);
                user.setEmail(email);
                user.setFullName(fullName);
                userRepository.save(user);
                return ResponseEntity.ok("User saved");
            } else {
                return ResponseEntity.ok("User already exists");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
} 