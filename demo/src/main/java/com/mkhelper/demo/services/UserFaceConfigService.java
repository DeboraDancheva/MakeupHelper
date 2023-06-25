package com.mkhelper.demo.services;

import com.mkhelper.demo.FacePart;
import com.mkhelper.demo.config.AppConfig;
import com.mkhelper.demo.factory.FacePartRepositoryFactory;
import com.mkhelper.demo.models.*;
import com.mkhelper.demo.models.pojo.FacePartConfigUIData;
import com.mkhelper.demo.models.pojo.UserFaceConfigPojo;
import com.mkhelper.demo.repositories.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.mkhelper.demo.FacePart.*;

@Data
@RequiredArgsConstructor
@Component
public class UserFaceConfigService {

    private final IFaceConfigurationRepository faceConfigurationRepository;

    private final IMediaRepository mediaRepository;

    private final FacePartRepositoryFactory facePartRepositoryFactory;

    private final AppConfig appConfig;

    private final IUserFaceConfigRepository userFaceConfigRepository;

    public boolean isUserFaceConfigSet() {
       Optional<UserFaceConfig> u = getUserFaceConfigRepository().findByUser(getAppConfig().getCurrentUser());
        if(u.isPresent()) {
            getAppConfig().setUserFaceConfig(u.get());
        }
        return u.isPresent();
    }

    public List<FacePartConfigUIData> getFaceConfigUIData() {
        List<FacePartConfigUIData> facePartConfigUIData = new ArrayList<>();
        for (FacePart facePart : FacePart.values()) {
            List<String> facePartMediaFileNames = getMediaFilesNamesByFacePartType(facePart.value);
            facePartConfigUIData.add(FacePartConfigUIData.builder().facePart(facePart.value).facePartMediaFileNames(facePartMediaFileNames).build());
        }
        return facePartConfigUIData;
    }


    public List<String> getMediaFilesNamesByFacePartType(String facePart) {
        return getFaceConfigurationRepository().findFaceConfigurationsByFacePart(facePart)
                .stream().
                map(faceConfig -> faceConfig.getMedia().getName())
                .collect(Collectors.toList());
    }

    public void setUserFaceConfigData(UserFaceConfigPojo[] selectedFaceConfigurations) {
        Eye eye = setUserEyesConfig(selectedFaceConfigurations);
        Mouth mouth = setUserMouthConfig(selectedFaceConfigurations);
        Nose nose = setUserNoseConfig(selectedFaceConfigurations);
        Face face = setUserFaceConfig(selectedFaceConfigurations);

        Optional<UserFaceConfig> userFaceConfigFromDb = getUserFaceConfigRepository().findByUser(getAppConfig().getCurrentUser());
        if(userFaceConfigFromDb.isPresent()) {
            getUserFaceConfigRepository().delete(userFaceConfigFromDb.get());
        }

        UserFaceConfig ufc = getUserFaceConfigRepository().save(UserFaceConfig.builder()
                .user(getAppConfig().getCurrentUser())
                .face(face)
                .eye(eye)
                .nose(nose)
                .mouth(mouth)
                .build());

        getAppConfig().setUserFaceConfig(ufc);
    }

    public Face setUserFaceConfig(UserFaceConfigPojo[] selectedFaceConfigurations) {
        Optional<UserFaceConfigPojo> selectedFace = Arrays.stream(selectedFaceConfigurations).filter(config -> config.getFacePart().equals(FacePart.FACE.value)).findFirst();
        String selectedFaceFileName = selectedFace.get().getFileName();
        Media media = getMediaRepository().findByName(selectedFaceFileName);
        String selectedFaceShape = media.getDescription().replace(FACE.toString() + " ", "");

        Optional<Face> face = ((IFaceRepository) facePartRepositoryFactory.getRepositoryByFacePart(FacePart.FACE)).findFaceByType(selectedFaceShape);
        return face.get();
    }

    public Mouth setUserMouthConfig(UserFaceConfigPojo[] selectedFaceConfigurations) {
        Optional<UserFaceConfigPojo> selectedMouth = Arrays.stream(selectedFaceConfigurations).filter(config -> config.getFacePart().equals(FacePart.MOUTH.value)).findFirst();
        String selectedMouthFileName = selectedMouth.get().getFileName();
        Media media = getMediaRepository().findByName(selectedMouthFileName);
        String selectedMouthShape = media.getDescription().replace(MOUTH.toString() + " ", "");

        Optional<Mouth> mouth = ((IMouthRepository) facePartRepositoryFactory.getRepositoryByFacePart(FacePart.MOUTH)).findMouthByType(selectedMouthShape);
        return mouth.get();
    }

    public Nose setUserNoseConfig(UserFaceConfigPojo[] selectedFaceConfigurations) {
        Optional<UserFaceConfigPojo> selectedNose = Arrays.stream(selectedFaceConfigurations).filter(config -> config.getFacePart().equals(FacePart.NOSE.value)).findFirst();
        String selectedNoseFileName = selectedNose.get().getFileName();
        Media media = getMediaRepository().findByName(selectedNoseFileName);
        String selectedNoseShape = media.getDescription().replace(NOSE.toString() + " ", "");

        Optional<Nose> nose = ((INoseRepository) facePartRepositoryFactory.getRepositoryByFacePart(FacePart.NOSE)).findNoseByType(selectedNoseShape);
        return nose.get();
    }

    public Eye setUserEyesConfig(UserFaceConfigPojo[] selectedFaceConfigurations) {
        Optional<UserFaceConfigPojo> selectedEyes = Arrays.stream(selectedFaceConfigurations).filter(config -> config.getFacePart().equals(EYES.value)).findFirst();
        String selectedEyesFileName = selectedEyes.get().getFileName();
        Media media = getMediaRepository().findByName(selectedEyesFileName);
        String selectedEyeShape = media.getDescription().replace(EYES.toString() + " ", "");

        Optional<Eye> eye = ((IEyeRepository) facePartRepositoryFactory.getRepositoryByFacePart(EYES)).findEyeByType(selectedEyeShape);
        return eye.get();
    }
}
