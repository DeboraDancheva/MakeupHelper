package com.mkhelper.demo.services;

import com.mkhelper.demo.Constants;
import com.mkhelper.demo.FacePart;
import com.mkhelper.demo.factory.FacePartRepositoryFactory;
import com.mkhelper.demo.models.Eye;
import com.mkhelper.demo.models.Face;
import com.mkhelper.demo.models.Mouth;
import com.mkhelper.demo.models.Nose;
import com.mkhelper.demo.repositories.IEyeRepository;
import com.mkhelper.demo.repositories.IFaceRepository;
import com.mkhelper.demo.repositories.IMouthRepository;
import com.mkhelper.demo.repositories.INoseRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.mkhelper.demo.FacePart.*;

@Data
@RequiredArgsConstructor
@Service
public class FacePartsService {

    private final FacePartRepositoryFactory facePartRepositoryFactory;

    public  List<String> getFaceShapesByFacePart(String facePart) {
        FacePart fp = FacePart.valueOf(facePart.toUpperCase());
        List<String> faceShapes = new ArrayList<>();
        switch (fp) {
            case EYES:
                faceShapes = getAllEyesShapes();
                break;
            case NOSE:
                faceShapes = getAllNoseShapes();
                break;
            case FACE:
                faceShapes = getAllFaceShapes();
                break;
            case MOUTH:
                faceShapes = getAllMouthShapes();
                break;
        }
        return faceShapes;
    }

    private List<String> getAllMouthShapes() {
      return ((IMouthRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(MOUTH))
                .findAll()
                .stream()
                .map(Mouth::getType)
                .collect(Collectors.toList());
    }

    private List<String> getAllFaceShapes() {
        return ((IFaceRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(FACE))
                .findAll()
                .stream()
                .map(Face::getType)
                .collect(Collectors.toList());
    }

    private List<String> getAllNoseShapes() {
        return ((INoseRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(NOSE))
                .findAll()
                .stream()
                .map(Nose::getType)
                .collect(Collectors.toList());
    }

    private List<String> getAllEyesShapes() {
        return ((IEyeRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(EYES))
                .findAll()
                .stream()
                .map(Eye::getType)
                .collect(Collectors.toList());
    }

    public Optional<? extends com.mkhelper.demo.models.FacePart> getFacePartByNameAndType(FacePart facePart, String shapeType) {
        switch (facePart) {
            case EYES:
              return  ((IEyeRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findEyeByType(shapeType);
            case NOSE:
                return  ((INoseRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findNoseByType(shapeType);
            case MOUTH:
                return  ((IMouthRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findMouthByType(shapeType);
            case FACE:
                return  ((IFaceRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findFaceByType(shapeType);
            default:
                return null;
        }
    }

    public Long getCommonFacePartIdByFacePart(FacePart facePart) {
        switch (facePart) {
            case EYES:
                return  ((IEyeRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findEyeByType(Constants.COMMON).get().getId();
            case NOSE:
                return  ((INoseRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findNoseByType(Constants.COMMON).get().getId();
            case MOUTH:
                return  ((IMouthRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findMouthByType(Constants.COMMON).get().getId();
            case FACE:
                return  ((IFaceRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).findFaceByType(Constants.COMMON).get().getId();
            default:
                return null;
        }
    }
}
