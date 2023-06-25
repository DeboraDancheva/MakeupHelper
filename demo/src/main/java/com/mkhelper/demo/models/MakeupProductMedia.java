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
@Table(name="makeup_products_media")
public class MakeupProductMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private MakeupProduct makeupProduct;

    @OneToOne
    @JoinColumn(name = "media_id")
    private Media media;

}
