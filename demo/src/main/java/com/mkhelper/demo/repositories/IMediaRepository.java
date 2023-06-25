package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMediaRepository extends JpaRepository<Media, Long> {

    Media findByName(String fileName);
}
