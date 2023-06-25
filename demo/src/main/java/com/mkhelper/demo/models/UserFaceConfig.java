package com.mkhelper.demo.models;


import com.mkhelper.demo.models.Eye;
import com.mkhelper.demo.models.Face;
import com.mkhelper.demo.models.Mouth;
import com.mkhelper.demo.models.Nose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_face_configs")
public class UserFaceConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "eye_id")
    private Eye eye;

    @OneToOne
    @JoinColumn(name = "mouth_id")
    private Mouth mouth;

    @OneToOne
    @JoinColumn(name = "nose_id")
    private Nose nose;

    @OneToOne
    @JoinColumn(name = "face_id")
    private Face face;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
