package com.mkhelper.demo.services;

import com.mkhelper.demo.config.AppConfig;
import com.mkhelper.demo.models.*;
import com.mkhelper.demo.models.pojo.UserCommentPojo;
import com.mkhelper.demo.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CommentService {

    private final FacePartsService facePartsService;

    private final IProductRepository productRepository;

    private final IProductReviewRepository productReviewRepository;

    private final AppConfig appConfig;

    @Transactional
    public void addProductComment(UserCommentPojo pojo) {
        var product = productRepository.findByName(pojo.getProductName()).get();
        var user = appConfig.getCurrentUser();

        var productReview = ProductReview.builder()
                .product(product)
                .user(user)
                .comment(pojo.getComment())
                .grade(pojo.getRating())
                .createdDate(LocalDateTime.now())
                .build();
        product.getProductReviews().add(productReview);
        productRepository.save(product);
    }

    @Transactional
    public List<ProductReview> getAllReviewsForProduct(String productName) {
       return productReviewRepository.findAllByProductName(productName);
    }
}
