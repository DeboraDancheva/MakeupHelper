package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.FaceConfigurationMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IFaceConfigurationRepository extends JpaRepository<FaceConfigurationMedia, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM face_configuration_media " +
            "WHERE face_part = 'eyes' " +
            "AND face_part_id IN (SELECT e.id FROM eye AS e WHERE type = :type)")
    List<FaceConfigurationMedia> findAllMediaByEyesType(String type);

//    List<FaceConfigurationMedia> findByMediaName();

    List<FaceConfigurationMedia> findFaceConfigurationsByFacePart(String facePart);

    Optional<FaceConfigurationMedia> findByMedia(Long mediaId);

}
