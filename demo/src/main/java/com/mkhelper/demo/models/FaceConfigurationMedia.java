package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="face_configuration_media")
public class FaceConfigurationMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "face_part")
    private String facePart;

    @Column(name = "face_part_id", unique=true)
    private Long facePartId;

    @OneToOne
    @JoinColumn(name = "media_id", unique=true)
    private Media media;

}
