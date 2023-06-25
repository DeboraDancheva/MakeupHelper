package com.mkhelper.demo.config;

import com.mkhelper.demo.models.User;
import com.mkhelper.demo.models.UserFaceConfig;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Data
@Configuration
public class AppConfig {

    private User currentUser;

    private UserFaceConfig userFaceConfig;


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("Authorization", "Content-Type");
            }
        };
    }


}
