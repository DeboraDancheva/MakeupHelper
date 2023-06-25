package com.mkhelper.demo.models.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MakeupProductPojo {
    String productName;
    String description;
    String brand;
    String facePart;
    String productType;
    List<String> mediaNames;
    Double averageReview;
    Double price;
    Boolean favorite;
    Integer currentImageIndex;
    Boolean hover;

    public Double getAverageReview() {
        if(averageReview == null) {
            averageReview = 0D;
        }
        return averageReview;
    }
}
