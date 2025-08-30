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
    
    @Autowired
    private FileUploadService fileUploadService;

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
            // Notify submitter using standardized template
            emailService.sendBusinessStatusEmail(
                    business.getEmail(),
                    "APPROVED",
                    nullSafe(business.getFullName()),
                    nullSafe(business.getBusinessName()),
                    nullSafe(business.getBusinessType()),
                    null
            );
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
            emailService.sendBusinessStatusEmail(
                    business.getEmail(),
                    "REJECTED",
                    nullSafe(business.getFullName()),
                    nullSafe(business.getBusinessName()),
                    nullSafe(business.getBusinessType()),
                    null
            );
            return saved;
        }
        throw new RuntimeException("Business not found");
    }

    public List<Business> getBusinessesByStatus(String status) {
        return businessRepository.findByStatus(status);
    }

    public List<Business> getBusinessesBySubmittedBy(String submittedBy) {
        return businessRepository.findBySubmittedBy(submittedBy);
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
        // Get business to delete associated image
        Business business = businessRepository.findById(id).orElse(null);
        
        // Delete associated reviews first to avoid FK constraint issues
        reviewRepository.deleteByBusinessId(id);
        
        // Delete associated image file if it exists
        if (business != null && business.getImageUrl() != null && business.getImageUrl().startsWith("uploads/")) {
            fileUploadService.deleteImage(business.getImageUrl());
        }
        
        businessRepository.deleteById(id);
    }

    private String nullSafe(String value) {
        return value == null ? "" : value;
    }
} 