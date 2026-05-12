package com.example.demo.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public AuthService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public UserEntity register(String email, String password) {
		String normalizedEmail = normalizeEmail(email);
		validateCredentials(normalizedEmail, password);

		if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
			throw new IllegalArgumentException("El email ya esta registrado");
		}

		UserEntity user = UserEntity.builder()
				.email(normalizedEmail)
				.passwordHash(encoder.encode(password))
				.role("USER")
				.createdAt(new Date())
				.build();

		return userRepository.save(user);
	}

	public UserEntity login(String email, String password) {
		String normalizedEmail = normalizeEmail(email);
		validateCredentials(normalizedEmail, password);

		UserEntity user = userRepository.findByEmailIgnoreCase(normalizedEmail)
				.orElseThrow(() -> new IllegalArgumentException("Credenciales invalidas"));

		if (!encoder.matches(password, user.getPasswordHash())) {
			throw new IllegalArgumentException("Credenciales invalidas");
		}

		return user;
	}

	public void ensureAdmin(String email, String password) {
		String normalizedEmail = normalizeEmail(email);
		if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
			return;
		}

		UserEntity admin = UserEntity.builder()
				.email(normalizedEmail)
				.passwordHash(encoder.encode(password))
				.role("ADMIN")
				.createdAt(new Date())
				.build();

		userRepository.save(admin);
	}

	private String normalizeEmail(String email) {
		return email == null ? "" : email.trim().toLowerCase();
	}

	private void validateCredentials(String email, String password) {
		if (email.isEmpty() || password == null || password.trim().isEmpty()) {
			throw new IllegalArgumentException("Email y contrasena son obligatorios");
		}
	}
}
