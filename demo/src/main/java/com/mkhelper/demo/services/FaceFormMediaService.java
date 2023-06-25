package com.mkhelper.demo.services;

import com.mkhelper.demo.repositories.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Data
@RequiredArgsConstructor
@Service
public class FaceFormMediaService {

    private final IEyeRepository eyeFormRepository;

    private final INoseRepository noseFormRepository;

    private final IFaceRepository faceFormRepository;

    private final IMouthRepository mouthFormRepository;

    private final IMakeupMediaRepository faceFormMediaRepository;

    private final IFaceConfigurationRepository facePartShapesMedia;

    private final IMediaRepository mediaRepository;




}
