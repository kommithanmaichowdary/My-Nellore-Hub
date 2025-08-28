package com.nellore.backend.controller;

import com.nellore.backend.model.Business;
import com.nellore.backend.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api")
public class BusinessController {
    @Autowired
    private BusinessService businessService;

    @PostMapping("/businesses")
    public Business submitBusiness(@RequestBody Business business) {
        return businessService.submitBusiness(business);
    }

    @GetMapping("/businesses")
    public List<Business> getBusinesses(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "type", required = false) String businessType,
            @RequestParam(value = "submittedBy", required = false) String submittedBy
    ) {
        if (submittedBy != null) {
            return businessService.getBusinessesBySubmittedBy(submittedBy);
        } else if (businessType != null && status != null) {
            return businessService.getBusinessesByTypeAndStatus(businessType, status);
        } else if (businessType != null) {
            return businessService.getBusinessesByType(businessType);
        } else if (status != null) {
            return businessService.getBusinessesByStatus(status);
        } else {
            return businessService.getAllBusinesses();
        }
    }

    @GetMapping("/businesses/{id}")
    public Business getBusiness(@PathVariable Long id) {
        return businessService.getBusiness(id);
    }

    @PutMapping("/businesses/{id}/approve")
    public Business approveBusiness(@PathVariable Long id) {
        return businessService.approveBusiness(id);
    }

    @PutMapping("/businesses/{id}/reject")
    public Business rejectBusiness(@PathVariable Long id) {
        return businessService.rejectBusiness(id);
    }

    @PutMapping("/businesses/{id}")
    public Business updateBusiness(@PathVariable Long id, @RequestBody Business updates) {
        return businessService.updateBusiness(id, updates);
    }

    @DeleteMapping("/businesses/{id}")
    public void deleteBusiness(@PathVariable Long id) {
        businessService.deleteBusiness(id);
    }
} 