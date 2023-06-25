package com.mkhelper.demo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mkhelper.demo.models.User;
import com.mkhelper.demo.models.pojo.UserPojo;
import com.mkhelper.demo.repositories.ICredentialRepository;
import com.mkhelper.demo.repositories.IUserRepository;
import com.mkhelper.demo.services.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Data
public class  UserController {

    private final IUserRepository userRepository;

    private final ICredentialRepository credentialRepository;

    private final UserService userService;


    @GetMapping()
    public ResponseEntity<List<UserPojo>> getUsers() {
        return ResponseEntity.ok(getUserService().getAllUsers());
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String userId) {
        return userRepository.findById(Long.parseLong(userId));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody String userAsJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        User user;
        try {
            user = objectMapper.readValue(userAsJson, User.class);
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUserByUsername(@PathVariable String username) {
        boolean deleted = userService.deleteUserByUsername(username);

        if (deleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
}
