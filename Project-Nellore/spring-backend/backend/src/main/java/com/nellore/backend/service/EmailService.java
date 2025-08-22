package com.nellore.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${spring.mail.from:}")
	private String configuredFrom;

	@Value("${spring.mail.username:}")
	private String mailUsername;

	public void sendPlainTextEmail(String to, String subject, String body) {
		if (to == null || to.isBlank()) {
			return; // no-op when email missing
		}
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			String from = (configuredFrom != null && !configuredFrom.isBlank()) ? configuredFrom : mailUsername;
			if (from != null && !from.isBlank()) {
				message.setFrom(from);
			}
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			mailSender.send(message);
		} catch (Exception ex) {
			// Log and continue; email failures should not block business actions
			System.err.println("Email send failed: " + ex.getMessage());
		}
	}
}


