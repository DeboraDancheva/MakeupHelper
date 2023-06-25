package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findAllByProductName(String name);
}
