package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.MakeupMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMakeupMediaRepository extends JpaRepository<MakeupMedia, Long> {

     List<MakeupMedia> findMakeupMediaByFacePartId(Long facePartId);
}
