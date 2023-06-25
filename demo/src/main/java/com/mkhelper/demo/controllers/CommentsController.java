package com.mkhelper.demo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mkhelper.demo.models.ProductReview;
import com.mkhelper.demo.models.pojo.UserCommentPojo;
import com.mkhelper.demo.services.CommentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/makeup/comments/")
@RequiredArgsConstructor
@Data
public class CommentsController {
    private final CommentService commentService;

    @PostMapping
    public void addMakeupProduct(@RequestBody UserCommentPojo userCommentPojo) {
        commentService.addProductComment(userCommentPojo);
    }

    @GetMapping("/by-product/{productName}")
    public ResponseEntity<List<ProductReview>> getProductReviewsByProductName(@PathVariable String productName) {
        List<ProductReview> reviews = commentService.getAllReviewsForProduct(productName);
        return ResponseEntity.ok(reviews);
    }
}
