package com.mkhelper.demo.models.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFaceConfigPojo {

    private String facePart;

    private String fileName;
}
