package com.game.sudoku.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*") // Дозволити доступ з будь-якого домену
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Дозволені HTTP-методи
                        .allowedHeaders("*"); // Дозволити всі заголовки
            }
        };
    }
}