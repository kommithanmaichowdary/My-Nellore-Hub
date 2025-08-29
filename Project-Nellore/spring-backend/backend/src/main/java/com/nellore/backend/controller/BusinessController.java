package com.nellore.backend.controller;

import com.nellore.backend.model.Business;
import com.nellore.backend.service.BusinessService;
import com.nellore.backend.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/api")
public class BusinessController {
    @Autowired
    private BusinessService businessService;
    
    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/businesses")
    public Business submitBusiness(
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("businessName") String businessName,
            @RequestParam("businessType") String businessType,
            @RequestParam("services") String services,
            @RequestParam("address") String address,
            @RequestParam(value = "timings", required = false) String timings,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("submittedBy") String submittedBy
    ) {
        Business business = new Business();
        business.setFullName(fullName);
        business.setEmail(email);
        business.setPhone(phone);
        business.setBusinessName(businessName);
        business.setBusinessType(businessType);
        business.setServices(services);
        business.setAddress(address);
        business.setTimings(timings != null ? timings : "");
        business.setSubmittedBy(submittedBy);
        
        // Handle image upload
        if (image != null && !image.isEmpty()) {
            try {
                String imagePath = fileUploadService.uploadImage(image);
                business.setImageUrl(imagePath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }
        
        return businessService.submitBusiness(business);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads/business-images/" + filename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // You might want to detect this dynamically
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
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
    public ResponseEntity<Void> deleteBusiness(@PathVariable Long id) {
        businessService.deleteBusiness(id);
        return ResponseEntity.noContent().build();
    }
} 