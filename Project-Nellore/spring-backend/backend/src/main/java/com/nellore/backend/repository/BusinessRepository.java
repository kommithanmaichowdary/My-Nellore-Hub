package com.nellore.backend.repository;

import com.nellore.backend.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    List<Business> findByStatus(String status);
    List<Business> findByBusinessType(String businessType);
    List<Business> findByBusinessTypeAndStatus(String businessType, String status);
} 