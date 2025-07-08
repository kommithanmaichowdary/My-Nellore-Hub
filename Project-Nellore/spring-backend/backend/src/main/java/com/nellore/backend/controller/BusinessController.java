package com.nellore.backend.controller;

import com.nellore.backend.model.Business;
import com.nellore.backend.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
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
    public List<Business> getBusinesses(@RequestParam(value = "status", required = false) String status) {
        if (status != null) {
            return businessService.getBusinessesByStatus(status);
        }
        return businessService.getAllBusinesses();
    }

    @PutMapping("/businesses/{id}/approve")
    public Business approveBusiness(@PathVariable Long id) {
        return businessService.approveBusiness(id);
    }

    @PutMapping("/businesses/{id}/reject")
    public Business rejectBusiness(@PathVariable Long id) {
        return businessService.rejectBusiness(id);
    }
} 