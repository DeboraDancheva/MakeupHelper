package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "credential")
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "description",nullable = false)
    private String description;
}
