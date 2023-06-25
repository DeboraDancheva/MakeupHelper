package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.MakeupProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<MakeupProduct, Long> {

    public Optional<MakeupProduct> findByName(String name);

    public Optional<List<MakeupProduct>> findAllByFacePart(String facePart);



}
