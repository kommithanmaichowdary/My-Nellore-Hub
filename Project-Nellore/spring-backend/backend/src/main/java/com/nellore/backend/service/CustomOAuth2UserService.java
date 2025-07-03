package com.nellore.backend.service;

import com.nellore.backend.model.User;
import com.nellore.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String googleId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        String fullName = (String) attributes.get("name");

        try {
            userRepository.findByGoogleId(googleId)
                    .orElseGet(() -> {
                        logger.info("Registering new user: {} ({}), GoogleID: {}", fullName, email, googleId);
                        User newUser = new User();
                        newUser.setGoogleId(googleId);
                        newUser.setEmail(email);
                        newUser.setFullName(fullName);
                        User savedUser = userRepository.save(newUser);
                        logger.info("User saved with ID: {}", savedUser.getId());
                        return savedUser;
                    });
        } catch (Exception e) {
            logger.error("Error saving user to database: {}", e.getMessage(), e);
        }

        // Do NOT update user info if already exists

        return oAuth2User;
    }
} 