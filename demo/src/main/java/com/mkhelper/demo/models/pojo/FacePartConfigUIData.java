package com.mkhelper.demo.models.pojo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FacePartConfigUIData {
    private String facePart;
    private List<String> facePartMediaFileNames;
}
