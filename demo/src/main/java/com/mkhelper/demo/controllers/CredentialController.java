package com.mkhelper.demo.controllers;

import com.mkhelper.demo.repositories.ICredentialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/app/roles")
@RequiredArgsConstructor
public class CredentialController {

    private final ICredentialRepository credentialRepository;



}
