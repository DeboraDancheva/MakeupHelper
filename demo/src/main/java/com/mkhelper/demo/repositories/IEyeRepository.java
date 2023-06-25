package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Eye;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IEyeRepository extends JpaRepository<Eye, Long> {

    Optional<Eye> findEyeById(Long id);
    Optional<Eye> findEyeByType(String type);
}
