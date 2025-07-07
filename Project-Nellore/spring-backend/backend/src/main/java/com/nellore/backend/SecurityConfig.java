package com.nellore.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List;

import com.nellore.backend.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests((authz) -> authz
                .requestMatchers("/api/save-user").permitAll()
                .requestMatchers("/api/users").permitAll()
                .requestMatchers("/api/businesses**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(authorization -> authorization
                    .authorizationRequestResolver(
                        customAuthorizationRequestResolver(clientRegistrationRepository)
                    )
                )
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
                .defaultSuccessUrl("http://localhost:5173/", true)
            )
            .formLogin().disable()
            .httpBasic().disable();
        return http.build();
    }

    private OAuth2AuthorizationRequestResolver customAuthorizationRequestResolver(ClientRegistrationRepository repo) {
        DefaultOAuth2AuthorizationRequestResolver resolver =
            new DefaultOAuth2AuthorizationRequestResolver(
                repo, OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI);

        return new OAuth2AuthorizationRequestResolver() {
            @Override
            public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
                OAuth2AuthorizationRequest authRequest = resolver.resolve(request);
                if (authRequest == null) {
                    return null;
                }
                return OAuth2AuthorizationRequest.from(authRequest)
                    .additionalParameters(params -> params.put("prompt", "select_account"))
                    .build();
            }
            @Override
            public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
                OAuth2AuthorizationRequest authRequest = resolver.resolve(request, clientRegistrationId);
                if (authRequest == null) {
                    return null;
                }
                return OAuth2AuthorizationRequest.from(authRequest)
                    .additionalParameters(params -> params.put("prompt", "select_account"))
                    .build();
            }
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
} 