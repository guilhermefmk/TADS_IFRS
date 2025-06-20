package com.recsocial.controller;

import com.recsocial.dto.RecommendationDTO;
import com.recsocial.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<RecommendationDTO> getRecommendations(@PathVariable String userId) {
        RecommendationDTO recommendations = recommendationService.recommendAll(userId);
        return ResponseEntity.ok(recommendations);
    }
}