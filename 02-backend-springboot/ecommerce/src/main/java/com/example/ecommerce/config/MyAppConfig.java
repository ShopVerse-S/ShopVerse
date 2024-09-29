package com.example.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyAppConfig implements WebMvcConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Allow CORS on all paths
                .allowedOrigins("http://localhost:4200") // Allow Angular frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true) // Allow credentials (cookies, authorization headers, etc.)
                .maxAge(3600); // Max age for caching CORS preflight response
    }

}
