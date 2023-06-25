package com.mkhelper.demo.models.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaPojo {

    private String name;
    private String description;
    private String type;
    private byte[] content;

    boolean favorite;
}
