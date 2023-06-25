package com.mkhelper.demo.models.pojo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCommentPojo {
    private String productName;
    private Double rating;

    private String comment;

}
