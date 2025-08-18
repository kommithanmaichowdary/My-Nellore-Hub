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
        // Save the review
        Review savedReview = reviewRepository.save(review);
        
        // Update business rating and review count
        updateBusinessRating(review.getBusiness().getId());
        
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

