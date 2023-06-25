package com.mkhelper.demo.factory;

import com.mkhelper.demo.FacePart;
import com.mkhelper.demo.repositories.IEyeRepository;
import com.mkhelper.demo.repositories.IFaceRepository;
import com.mkhelper.demo.repositories.IMouthRepository;
import com.mkhelper.demo.repositories.INoseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Component;

import static com.mkhelper.demo.FacePart.EYES;

@Component
@RequiredArgsConstructor
public class FacePartRepositoryFactory {

    private final IEyeRepository eyeRepository;

    private final INoseRepository noseRepository;

    private final IFaceRepository faceRepository;

    private final IMouthRepository mouthRepository;

    public Repository<?, ?> getRepositoryByFacePart(FacePart facePart) {
        switch (facePart) {
            case EYES:
                return eyeRepository;
            case NOSE:
                return noseRepository;
            case FACE:
                return faceRepository;
            case MOUTH:
                return mouthRepository;
            default:
                throw new IllegalArgumentException("Invalid face part: " + facePart);
        }
    }


}
