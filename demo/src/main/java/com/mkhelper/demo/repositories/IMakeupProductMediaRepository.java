package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.MakeupProduct;
import com.mkhelper.demo.models.MakeupProductMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IMakeupProductMediaRepository extends JpaRepository<MakeupProductMedia, Long> {
    Optional<List<MakeupProductMedia>> findByMakeupProduct(MakeupProduct makeupProduct);
}
