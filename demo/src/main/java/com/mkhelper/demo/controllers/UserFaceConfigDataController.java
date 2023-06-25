package com.mkhelper.demo.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.mkhelper.demo.models.pojo.FacePartConfigUIData;
import com.mkhelper.demo.models.pojo.UserFaceConfigPojo;
import com.mkhelper.demo.services.UserFaceConfigService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/faceConfigData")
@RequiredArgsConstructor
@Data
public class UserFaceConfigDataController {

    final UserFaceConfigService userFaceConfigService;


    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<FacePartConfigUIData>> getUserUIFaceConfigImages() {
        return ResponseEntity.status(HttpStatus.OK).body(getUserFaceConfigService().getFaceConfigUIData());
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> isUserFaceConfigSet() {
        return ResponseEntity.status(HttpStatus.OK).body(getUserFaceConfigService().isUserFaceConfigSet());
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> setUserFaceConfigData(@RequestBody UserFaceConfigPojo[] selectedFaceConfigurations) {
        // Process the received data
        // You can access the data using the 'data' parameter
        getUserFaceConfigService().setUserFaceConfigData(selectedFaceConfigurations);
        // Example response
        String response = "Data received successfully";

        // Return a response with a status code
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
