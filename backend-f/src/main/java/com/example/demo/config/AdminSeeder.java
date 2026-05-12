package com.example.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.service.AuthService;

@Component
public class AdminSeeder implements CommandLineRunner {
	private final AuthService authService;

	@Value("${app.admin.email}")
	private String adminEmail;

	@Value("${app.admin.password}")
	private String adminPassword;

	public AdminSeeder(AuthService authService) {
		this.authService = authService;
	}

	@Override
	public void run(String... args) {
		authService.ensureAdmin(adminEmail, adminPassword);
	}
}
