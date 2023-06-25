package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "makeup_media")
public class MakeupMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //eyeFormId..
    @Column(name="face_part_id",nullable = false)
    private Long facePartId;

    //eye,nose..
    @Column(name="face_part_type",nullable = false)
    private String facePartType;

    @OneToOne
    @JoinColumn(name = "media_id")
    private Media media_id;

}
