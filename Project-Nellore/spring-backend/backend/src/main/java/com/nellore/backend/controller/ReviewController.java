package com.nellore.backend.controller;

import com.nellore.backend.model.Review;
import com.nellore.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	@PostMapping("/reviews")
	public ResponseEntity<?> submitReview(@RequestBody Review review) {
		try {
			Review saved = reviewService.submitReview(review);
			return ResponseEntity.status(HttpStatus.CREATED).body(saved);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}
	
	@GetMapping("/businesses/{businessId}/reviews")
	public List<Review> getReviewsByBusinessId(@PathVariable Long businessId) {
		return reviewService.getReviewsByBusinessId(businessId);
	}
}

