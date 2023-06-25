package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Mouth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMouthRepository extends JpaRepository<Mouth, Long> {

    Optional<Mouth> findMouthByType(String type);
}
