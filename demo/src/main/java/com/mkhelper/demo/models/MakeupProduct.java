package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class MakeupProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String brand;

    @OneToOne
    @JoinColumn(name = "type")
    private MakeupProductType type;

    @Column(nullable = false, name = "face_part")
    private String facePart;

    @Column(name = "average_review")
    private Double averageReview;

    @Column
    private Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductReview> productReviews;


    public Double getAverageReview() {
        if(averageReview == null) {
            averageReview = 0D;
        }
        return averageReview;
    }
}
