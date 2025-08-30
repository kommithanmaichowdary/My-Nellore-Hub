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

	public void sendBusinessStatusEmail(String to,
			String status,
			String userName,
			String businessName,
			String sectorName,
			String reasonIfAny) {
		if (to == null || to.isBlank()) return;
		String normalized = status == null ? "" : status.trim().toUpperCase();
		String subject;
		String body;
		switch (normalized) {
			case "APPROVED":
			case "ACCEPTED":
				subject = "Your Business Submission Has Been Accepted 🎉";
				body = "Hello " + safe(userName) + ",\n\n" +
					"We are pleased to inform you that your business submission \"" + safe(businessName) + "\" has been accepted.\n" +
					"It is now successfully listed in our platform under the " + bold(sectorName) + " sector.\n\n" +
					"Thank you for contributing to My Nellore Hub.\n\n" +
					"Best regards,\nTeam My Nellore Hub";
				break;
			case "REJECTED":
				subject = "Your Business Submission Status ❌";
				body = "Hello " + safe(userName) + ",\n\n" +
					"We regret to inform you that your business submission \"" + safe(businessName) + "\" has been rejected.\n" +
					"Reason: " + (reasonIfAny == null || reasonIfAny.isBlank() ? "Not specified" : reasonIfAny) + ".\n\n" +
					"You may update the details and resubmit your business for review.\n\n" +
					"Best regards,\nTeam My Nellore Hub";
				break;
			case "PENDING":
			default:
				subject = "Your Business Submission is Under Review ⏳";
				body = "Hello " + safe(userName) + ",\n\n" +
					"Thank you for submitting your business \"" + safe(businessName) + "\" to My Nellore Hub.\n" +
					"Your submission is currently pending review by our team.\n\n" +
					"We will notify you once the review process is complete.\n\n" +
					"Best regards,\nTeam My Nellore Hub";
		}

		sendPlainTextEmail(to, subject, body);
	}

	private String safe(String v) {
		return v == null ? "" : v;
	}

	private String bold(String v) {
		return v == null || v.isBlank() ? "" : ("**" + v + "**");
	}
}


