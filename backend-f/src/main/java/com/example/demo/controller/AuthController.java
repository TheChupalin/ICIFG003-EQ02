package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:9992"})
public class AuthController {
	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody AuthRequest request) {
		try {
			UserEntity user = authService.register(request.getEmail(), request.getPassword());
			return ResponseEntity.ok(toResponse(user));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest request) {
		try {
			UserEntity user = authService.login(request.getEmail(), request.getPassword());
			return ResponseEntity.ok(toResponse(user));
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.status(401).body(ex.getMessage());
		}
	}

	private AuthResponse toResponse(UserEntity user) {
		return new AuthResponse(user.getId(), user.getEmail(), user.getRole());
	}
}
