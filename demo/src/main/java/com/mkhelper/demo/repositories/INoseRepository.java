package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Eye;
import com.mkhelper.demo.models.Nose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface INoseRepository extends JpaRepository<Nose, Long> {
    Optional<Nose> findNoseByType(String type);
}
