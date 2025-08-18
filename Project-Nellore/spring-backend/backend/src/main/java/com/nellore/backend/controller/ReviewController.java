package com.nellore.backend.controller;

import com.nellore.backend.model.Review;
import com.nellore.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping("/reviews")
    public Review submitReview(@RequestBody Review review) {
        return reviewService.submitReview(review);
    }
    
    @GetMapping("/businesses/{businessId}/reviews")
    public List<Review> getReviewsByBusinessId(@PathVariable Long businessId) {
        return reviewService.getReviewsByBusinessId(businessId);
    }
}

