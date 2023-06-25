package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;



@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "eye")
public class Eye extends FacePart{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

//    private List<Media> media;
}
