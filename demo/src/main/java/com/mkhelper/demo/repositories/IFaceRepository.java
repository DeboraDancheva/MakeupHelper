package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Eye;
import com.mkhelper.demo.models.Face;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IFaceRepository extends JpaRepository<Face, Long> {
    Optional<Face> findFaceByType(String type);
}
