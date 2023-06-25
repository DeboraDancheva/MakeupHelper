package com.mkhelper.demo.services;

import com.mkhelper.demo.Constants;
import com.mkhelper.demo.FacePart;
import com.mkhelper.demo.config.AppConfig;
import com.mkhelper.demo.models.*;
import com.mkhelper.demo.models.pojo.MediaPojo;
import com.mkhelper.demo.repositories.IMakeupMediaRepository;
import com.mkhelper.demo.repositories.IMediaRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.mkhelper.demo.FacePart.*;

@Data
@RequiredArgsConstructor
@Service
public class MediaService {

    private final FacePartsService facePartsService;

    private final IMediaRepository mediaRepository;

    private final IMakeupMediaRepository makeupMediaRepository;

    private final AppConfig appConfig;

    public void uploadMakeupMedia(String facePart, String faceShape, String description, MultipartFile[] files) {
        try {

            for (MultipartFile file : files) {
                switch (FacePart.valueOf(facePart.toUpperCase())) {
                    case EYES:
                        saveFileForEye(facePart, faceShape, description, file);
                        break;
                    case MOUTH:
                        saveFileForMouth(facePart, faceShape, description, file);
                        break;
                    case NOSE:
                        saveFileForNose(facePart, faceShape, description, file);
                        break;
                    case FACE:
                        saveFileForFace(facePart, faceShape, description, file);
                        break;
                }
            }

        } catch (Exception e) {
        }
    }

    public List<MediaPojo> getUserFavoriteMedia() {
        List<Media> media = getAppConfig().getCurrentUser().getFavouriteMedia();
        return generateMakupMediaPojo(media);
    }

    @Transactional
    public void changeMediaFavoriteState(String mediaName, String favorite) {
        Media m = getMediaRepository().findByName(mediaName);
        var user = getAppConfig().getCurrentUser();
        if (favorite.equals(Boolean.TRUE.toString())) {
            user.getFavouriteMedia().add(m);
        } else {
            user.getFavouriteMedia().removeIf(media -> media.getName().equals(m.getName()));
        }
    }

    @Transactional
    public List<MediaPojo> generateMakupMediaPojo(List<Media> media) {
        List<MediaPojo> pojos = new ArrayList<>();
        for (Media m : media) {
            Hibernate.initialize(appConfig.getCurrentUser());
            Optional<Media> favorite = getAppConfig().getCurrentUser().getFavouriteMedia().stream().filter(x->x.getName().equals(m.getName())).findFirst();
            MediaPojo p = MediaPojo.builder().content(m.getContent()).description(m.getDescription()).name(m.getName()).type(m.getType()).favorite(favorite.isPresent()).build();
            pojos.add(p);
        }
        return pojos;
    }

    @Transactional
    public List<MediaPojo> getAllMediaForUserConfiguredFacePart(String facePart) {
        List<Media> media = new ArrayList<>();
        FacePart facePartEnum = valueOf(facePart.toUpperCase());
        Long commonFacePartId = getFacePartsService().getCommonFacePartIdByFacePart(facePartEnum);

        switch (facePartEnum) {
            case EYES:
                media = getMakeupMediaRepository().findMakeupMediaByFacePartId(getAppConfig().getUserFaceConfig().getEye().getId()).stream().map(makeupMedia -> makeupMedia.getMedia_id()).collect(Collectors.toList());

                break;
            case NOSE:
                media = getMakeupMediaRepository().findMakeupMediaByFacePartId(getAppConfig().getUserFaceConfig().getNose().getId()).stream().map(makeupMedia -> makeupMedia.getMedia_id()).collect(Collectors.toList());
                break;
            case MOUTH:
                media = getMakeupMediaRepository().findMakeupMediaByFacePartId(getAppConfig().getUserFaceConfig().getMouth().getId()).stream().map(makeupMedia -> makeupMedia.getMedia_id()).collect(Collectors.toList());
                break;
            case FACE:
                media = getMakeupMediaRepository().findMakeupMediaByFacePartId(getAppConfig().getUserFaceConfig().getFace().getId()).stream().map(makeupMedia -> makeupMedia.getMedia_id()).collect(Collectors.toList());
                break;

        }
        List<Media> commonMedia = getMakeupMediaRepository().findMakeupMediaByFacePartId(commonFacePartId).stream().map(m -> m.getMedia_id()).collect(Collectors.toList());
        media.addAll(commonMedia);
        return generateMakupMediaPojo(media);

    }

    private void saveFileForEye(String facePart, String faceShape, String description, MultipartFile file) {
        Eye eye = (Eye) getFacePartsService().getFacePartByNameAndType(EYES, faceShape).get();
        Media media = null;
        try {
            media = saveFile(facePart, faceShape, description, file);
        } catch (IOException e) {
            throw new RuntimeException(e);//TODO
        }

        getMakeupMediaRepository().save(MakeupMedia.builder()
                .facePartId(eye.getId())
                .media_id(media)
                .facePartType(EYES.value)
                .build());
    }

    private void saveFileForMouth(String facePart, String faceShape, String description, MultipartFile file) {
        Mouth mouth = (Mouth) getFacePartsService().getFacePartByNameAndType(MOUTH, faceShape).get();
        Media media = null;
        try {
            media = saveFile(facePart, faceShape, description, file);
        } catch (IOException e) {
            throw new RuntimeException(e);//TODO
        }

        getMakeupMediaRepository().save(MakeupMedia.builder()
                .facePartId(mouth.getId())
                .media_id(media)
                .facePartType(NOSE.value)
                .build());
    }

    private void saveFileForNose(String facePart, String faceShape, String description, MultipartFile file) {
        Nose nose = (Nose) getFacePartsService().getFacePartByNameAndType(NOSE, faceShape).get();
        Media media = null;
        try {
            media = saveFile(facePart, faceShape, description, file);
        } catch (IOException e) {
            throw new RuntimeException(e);//TODO
        }

        getMakeupMediaRepository().save(MakeupMedia.builder()
                .facePartId(nose.getId())
                .media_id(media)
                .facePartType(NOSE.value)
                .build());
    }

    private void saveFileForFace(String facePart, String faceShape, String description, MultipartFile file) {
        Face face = (Face) getFacePartsService().getFacePartByNameAndType(FACE, faceShape).get();
        Media media = null;
        try {
            media = saveFile(facePart, faceShape, description, file);
        } catch (IOException e) {
            throw new RuntimeException(e);//TODO
        }

        getMakeupMediaRepository().save(MakeupMedia.builder()
                .facePartId(face.getId())
                .media_id(media)
                .facePartType(FACE.value)
                .build());
    }

    private Media saveFile(String facePart, String faceShape, String description, MultipartFile file) throws IOException {
        String contentType = file.getContentType();
        byte[] content = file.getBytes();
        String fileExtension = getFileExtension(file.getOriginalFilename());

        String mediaType = isVideo(contentType, fileExtension) ? "video" : "image";
        String fileName = generateFileName(facePart, faceShape, fileExtension);

        File destFile = new File(getLocationToSave() + File.separator + fileName);
        file.transferTo(destFile);

        return saveMedia(mediaType, content, fileName, description);
    }

    public Media saveMedia(String mediaType, byte[] content, String fileName, String description) {
        return getMediaRepository().save(Media.builder().type(mediaType).content(content).name(fileName).description(description).build());
    }

    public String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < filename.length() - 1) {
            return filename.substring(dotIndex + 1);
        }
        return "";
    }

    private String generateFileName(String facePart, String faceShape, String fileExtension) {
        return facePart + "_" + faceShape + "_" + UUID.randomUUID() + "." + fileExtension;
    }

    File getLocationToSave() {
        return new File(System.getProperty("user.dir") + Constants.MEDIA_LOCATION + Constants.MAKEUP_MEDIA_FOLDER);
    }

    public boolean isVideo(String contentType, String fileExtension) {
        // Check if the content type or file extension indicates a video
        return contentType != null && contentType.startsWith("video/") ||
                fileExtension.equalsIgnoreCase("mp4") ||
                fileExtension.equalsIgnoreCase("mov") ||
                fileExtension.equalsIgnoreCase("avi");
    }

    public List<MediaPojo> getAllMedia() {
        List<Media> media = getMediaRepository().findAll();
        return generateMakupMediaPojo(media);
    }

    public boolean deleteMediaByName(String name) {
        var media = mediaRepository.findByName(name);

        if (media != null) {
            mediaRepository.delete(media);
            return true;
        }

        return false;
    }
}
