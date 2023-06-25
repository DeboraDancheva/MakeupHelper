package com.mkhelper.demo.services;

import com.mkhelper.demo.Constants;
import com.mkhelper.demo.FacePart;
import com.mkhelper.demo.factory.FacePartRepositoryFactory;
import com.mkhelper.demo.models.*;
import com.mkhelper.demo.repositories.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

import static com.mkhelper.demo.FacePart.*;

@Data
@RequiredArgsConstructor
@Service
public class InitialUploadOfDataService {

    public static final String COMMON = "common";
    private final IEyeRepository eyeRepository;

    private final INoseRepository noseRepository;

    private final IFaceRepository faceRepository;

    private final IMouthRepository mouthRepository;

    private final IMakeupMediaRepository faceFormMediaRepository;

    private final IFaceConfigurationRepository facePartShapesMedia;

    private final IMediaRepository mediaRepository;

    private final FacePartRepositoryFactory facePartRepositoryFactory;

    @PostConstruct
    public void init() {
        initialUploadOfFacePartsTypesMedia();
    }

    public void initialUploadOfFacePartsTypesMedia() {
        File mediaFolder = new File(getMediaResourcesLocation() + File.separator + Constants.FACE_PARTS_TYPE_MEDIA_FOLDER);
        if (mediaFolder.exists() && mediaFolder.listFiles().length > 1 && getFacePartShapesMedia().findAll().size() < 1) {
            uploadFacePartsTypesMedia(mediaFolder);
            createGenericFacePartsTypes();
        } else {
            //TO DO
        }

    }

    protected void createGenericFacePartsTypes() {
        getEyeRepository().save(Eye.builder().type(COMMON).build());
        getNoseRepository().save(Nose.builder().type(COMMON).build());
        getMouthRepository().save(Mouth.builder().type(COMMON).build());
        getFaceRepository().save(Face.builder().type(COMMON).build());
    }

    private void uploadFacePartsTypesMedia(File mediaFolder) {
        for (File fileToUpload : mediaFolder.listFiles()) {
            if (!fileToUpload.isDirectory()) {
                String facePart = fileToUpload.getName().split("_")[0];
                String facePartType = fileToUpload.getName().substring(fileToUpload.getName().indexOf('_') + 1, fileToUpload.getName().lastIndexOf(".")).replace("_", " ");

                FacePart formType = FacePart.valueOf(facePart.toUpperCase());
                switch (formType) {
                    case EYES:
                        uploadEyesTypeMedia(EYES, facePartType, fileToUpload);
                        break;
                    case MOUTH:
                        uploadMouthTypeMedia(MOUTH, facePartType, fileToUpload);
                        break;
                    case NOSE:
                        uploadNoseTypeMedia(NOSE, facePartType, fileToUpload);
                        break;
                    case FACE:
                        uploadFaceTypeMedia(FACE, facePartType, fileToUpload);
                        break;
                    default:
                        //TO DO throw E
                        break;
                }
            }

        }
    }

    private void uploadFaceTypeMedia(FacePart facePart, String faceType, File fileToUpload) {
        Face face = ((IFaceRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).save(Face.builder().type(faceType).build());
        if (face != null) {
            saveFaceConfigMedia(facePart, faceType, fileToUpload, face.getId());
        } else {
            //To DO throw e
        }
    }

    private void uploadNoseTypeMedia(FacePart facePart, String noseType, File fileToUpload) {
        Nose nose = ((INoseRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).save(Nose.builder().type(noseType).build());
        if (nose != null) {
            saveFaceConfigMedia(facePart, noseType, fileToUpload, nose.getId());
        } else {
            //To DO throw e
        }
    }

    private void uploadMouthTypeMedia(FacePart facePart, String mouthType, File fileToUpload) {
        Mouth mouth = ((IMouthRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).save(Mouth.builder().type(mouthType).build());
        if (mouth != null) {
            saveFaceConfigMedia(facePart, mouthType, fileToUpload, mouth.getId());
        } else {
            //To DO throw e
        }
    }

    private void uploadEyesTypeMedia(FacePart facePart, String eyeType, File fileToUpload) {
        Eye eye = ((IEyeRepository) getFacePartRepositoryFactory().getRepositoryByFacePart(facePart)).save(Eye.builder().type(eyeType).build());
        if (eye != null) {
            saveFaceConfigMedia(facePart, eyeType, fileToUpload, eye.getId());
        } else {
            //To DO throw e
        }

    }

    private void saveFaceConfigMedia(FacePart facePart, String type, File fileToUpload, Long facePartId) {

        Media newMedia = getMediaRepository().save(Media.builder().description(facePart + " " + type)
                .type(FilenameUtils.getExtension(fileToUpload.getAbsolutePath()))
                .name(fileToUpload.getName()).content(getFileContent(fileToUpload))
                .build());

        FaceConfigurationMedia faceConfig = FaceConfigurationMedia.builder()
                .facePartId(facePartId)
                .facePart(facePart.value)
                .media(newMedia)
                .build();

        getFacePartShapesMedia().save(faceConfig);
    }

    private byte[] getFileContent(File fileToUpload) {
        byte[] media = null;
        try {
            media = FileUtils.readFileToByteArray(fileToUpload);
        } catch (IOException e) {
            //TO DO
        }
        return media;
    }

    private File getMediaResourcesLocation() {
        return new File(System.getProperty("user.dir") + Constants.MEDIA_LOCATION);
    }
}
