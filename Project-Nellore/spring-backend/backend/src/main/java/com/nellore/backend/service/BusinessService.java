package com.nellore.backend.service;

import com.nellore.backend.model.Business;
import com.nellore.backend.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BusinessService {
    @Autowired
    private BusinessRepository businessRepository;

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

    public Business approveBusiness(Long id) {
        Optional<Business> businessOpt = businessRepository.findById(id);
        if (businessOpt.isPresent()) {
            Business business = businessOpt.get();
            business.setStatus("APPROVED");
            return businessRepository.save(business);
        }
        throw new RuntimeException("Business not found");
    }

    public Business rejectBusiness(Long id) {
        Optional<Business> businessOpt = businessRepository.findById(id);
        if (businessOpt.isPresent()) {
            Business business = businessOpt.get();
            business.setStatus("REJECTED");
            return businessRepository.save(business);
        }
        throw new RuntimeException("Business not found");
    }

    public List<Business> getBusinessesByStatus(String status) {
        return businessRepository.findByStatus(status);
    }
} 