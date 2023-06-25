package com.mkhelper.demo.controllers;

import com.mkhelper.demo.models.Media;
import com.mkhelper.demo.models.pojo.MakeupProductPojo;
import com.mkhelper.demo.models.pojo.MediaPojo;
import com.mkhelper.demo.services.MediaService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/media/")
@RequiredArgsConstructor
@Data
public class MakeupDataController {

    private final MediaService mediaService;

    @GetMapping()
    public List<MediaPojo> getMedia() {
        return getMediaService().getAllMedia();
    }

    @PostMapping("upload/{facePart}/{facePartShape}/{description}")
    public String handleFileUpload(@RequestBody MultipartFile[] files, @PathVariable("facePart") String facePart, @PathVariable("facePartShape") String facePartShape, @PathVariable(value = "description", required = false) String description) {

        getMediaService().uploadMakeupMedia(facePart, facePartShape, description, files);
        return "";
    }

    @GetMapping("data/{facePart}")
    public List<MediaPojo> getMakeupMediaForFacePart(@PathVariable("facePart") String facePart) {
        return getMediaService().getAllMediaForUserConfiguredFacePart(facePart);
    }


    @PostMapping(path="change/favorite")
    public void addMakeupProduct(@RequestParam("mediaName") String mediaName, @RequestParam("favorite") String favorite) {
        getMediaService().changeMediaFavoriteState(mediaName, favorite);
    }

    @GetMapping("favorites")
    public ResponseEntity<List<MediaPojo>> getFavoriteProducts(){
        return new ResponseEntity<>(getMediaService().getUserFavoriteMedia(), HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteMediaByName(@PathVariable String name) {
        boolean deleted = mediaService.deleteMediaByName(name);

        if (deleted) {
            return ResponseEntity.ok("Media deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Media not found.");
        }
    }

}
