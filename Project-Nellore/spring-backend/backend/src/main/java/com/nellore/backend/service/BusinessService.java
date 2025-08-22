package com.nellore.backend.service;

import com.nellore.backend.model.Business;
import com.nellore.backend.repository.BusinessRepository;
import com.nellore.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessService {
    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EmailService emailService;

    public Business submitBusiness(Business business) {
        business.setStatus("PENDING");
        return businessRepository.save(business);
    }

    public List<Business> getPendingBusinesses() {
        return businessRepository.findByStatus("PENDING");
    }

    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    public List<Business> getBusinessesByType(String businessType) {
        return businessRepository.findByBusinessType(businessType);
    }

    public List<Business> getBusinessesByTypeAndStatus(String businessType, String status) {
        return businessRepository.findByBusinessTypeAndStatus(businessType, status);
    }

    public Business getBusiness(Long id) {
        Optional<Business> businessOpt = businessRepository.findById(id);
        if (businessOpt.isPresent()) {
            return businessOpt.get();
        }
        throw new RuntimeException("Business not found");
    }

    public Business approveBusiness(Long id) {
        Optional<Business> businessOpt = businessRepository.findById(id);
        if (businessOpt.isPresent()) {
            Business business = businessOpt.get();
            business.setStatus("APPROVED");
            Business saved = businessRepository.save(business);
            // Notify submitter
            String to = business.getEmail();
            String subject = "Business Approved";
            String body = String.format("Hello %s, your business %s has been approved.",
                    nullSafe(business.getFullName()), nullSafe(business.getBusinessName()));
            emailService.sendPlainTextEmail(to, subject, body);
            return saved;
        }
        throw new RuntimeException("Business not found");
    }

    public Business rejectBusiness(Long id) {
        Optional<Business> businessOpt = businessRepository.findById(id);
        if (businessOpt.isPresent()) {
            Business business = businessOpt.get();
            business.setStatus("REJECTED");
            Business saved = businessRepository.save(business);
            String to = business.getEmail();
            String subject = "Business Not Approved";
            String body = String.format("Hello %s, your business %s has not been approved.",
                    nullSafe(business.getFullName()), nullSafe(business.getBusinessName()));
            emailService.sendPlainTextEmail(to, subject, body);
            return saved;
        }
        throw new RuntimeException("Business not found");
    }

    public List<Business> getBusinessesByStatus(String status) {
        return businessRepository.findByStatus(status);
    }

    public Business updateBusiness(Long id, Business updates) {
        Business existing = businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found"));
        if (updates.getBusinessName() != null) existing.setBusinessName(updates.getBusinessName());
        if (updates.getBusinessType() != null) existing.setBusinessType(updates.getBusinessType());
        if (updates.getServices() != null) existing.setServices(updates.getServices());
        if (updates.getAddress() != null) existing.setAddress(updates.getAddress());
        if (updates.getImageUrl() != null) existing.setImageUrl(updates.getImageUrl());
        if (updates.getTimings() != null) existing.setTimings(updates.getTimings());
        if (updates.getStatus() != null) existing.setStatus(updates.getStatus());
        return businessRepository.save(existing);
    }

    public void deleteBusiness(Long id) {
        // Delete associated reviews first to avoid FK constraint issues
        reviewRepository.deleteByBusinessId(id);
        businessRepository.deleteById(id);
    }

    private String nullSafe(String value) {
        return value == null ? "" : value;
    }
} 