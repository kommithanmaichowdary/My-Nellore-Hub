package com.nellore.backend.service;

import com.nellore.backend.model.Review;
import com.nellore.backend.model.Business;
import com.nellore.backend.repository.ReviewRepository;
import com.nellore.backend.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private BusinessRepository businessRepository;
	
	@Transactional
	public Review submitReview(Review review) {
		Long businessId = review.getBusiness() != null ? review.getBusiness().getId() : null;
		String userEmail = review.getUserEmail();
		if (businessId == null || userEmail == null || userEmail.isBlank()) {
			throw new IllegalArgumentException("Business and user email are required");
		}
		
		boolean alreadyReviewed = reviewRepository.existsByBusinessIdAndUserEmail(businessId, userEmail);
		if (alreadyReviewed) {
			throw new IllegalStateException("User has already submitted a review for this business");
		}
		
		// Save the review
		Review savedReview = reviewRepository.save(review);
		
		// Update business rating and review count
		updateBusinessRating(businessId);
		
		return savedReview;
	}
	
	public List<Review> getReviewsByBusinessId(Long businessId) {
		return reviewRepository.findByBusinessIdOrderByCreatedAtDesc(businessId);
	}
	
	private void updateBusinessRating(Long businessId) {
		Double avgRating = reviewRepository.getAverageRatingByBusinessId(businessId);
		Long reviewCount = reviewRepository.getReviewCountByBusinessId(businessId);
		
		if (avgRating != null) {
			Business business = businessRepository.findById(businessId).orElse(null);
			if (business != null) {
				business.setAverageRating(avgRating);
				business.setTotalReviews(reviewCount.intValue());
				businessRepository.save(business);
			}
		}
	}
}

