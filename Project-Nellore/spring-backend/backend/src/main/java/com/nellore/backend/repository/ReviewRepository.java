package com.nellore.backend.repository;

import com.nellore.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBusinessIdOrderByCreatedAtDesc(Long businessId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.business.id = :businessId")
    Double getAverageRatingByBusinessId(@Param("businessId") Long businessId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.business.id = :businessId")
    Long getReviewCountByBusinessId(@Param("businessId") Long businessId);
}

