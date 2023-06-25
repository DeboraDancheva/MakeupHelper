package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.MakeupProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IMakeupProductTypeRepository extends JpaRepository<MakeupProductType, Long> {
    public Optional<MakeupProductType> findAllByFacePart(String facePart);

    public Optional<MakeupProductType> findAllByType(String type);

}
