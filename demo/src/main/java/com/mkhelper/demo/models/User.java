package com.mkhelper.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credential_id", nullable = false)
    private Credential credential;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_product_favorite",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<MakeupProduct> favouriteProducts;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "favorite_user_makeup_data",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "media_id"))
    private List<Media> favouriteMedia;

}
