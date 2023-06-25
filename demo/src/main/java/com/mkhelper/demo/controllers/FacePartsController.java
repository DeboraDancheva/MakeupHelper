package com.mkhelper.demo.controllers;

import com.mkhelper.demo.models.pojo.FacePartConfigUIData;
import com.mkhelper.demo.services.FacePartsService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/faceParts")
@RequiredArgsConstructor
@Data
public class FacePartsController {

    private final FacePartsService facePartsService;

    @GetMapping(path = "/facePartShapes/{facePart}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<String>> getFaceShapesByFacePart(@PathVariable("facePart") String facePart) {
        return ResponseEntity.status(HttpStatus.OK).body(getFacePartsService().getFaceShapesByFacePart(facePart));
    }
}
