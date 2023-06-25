package com.mkhelper.demo.controllers;

import com.mkhelper.demo.SecurityConfig.JwtUtils;
import com.mkhelper.demo.SecurityConfig.UserDetailsImpl;
import com.mkhelper.demo.config.AppConfig;
import com.mkhelper.demo.models.Credential;
import com.mkhelper.demo.models.User;
import com.mkhelper.demo.models.pojo.ERole;
import com.mkhelper.demo.models.pojo.JwtResponse;
import com.mkhelper.demo.models.pojo.LoginRequest;
import com.mkhelper.demo.models.pojo.SignUpRequest;
import com.mkhelper.demo.repositories.ICredentialRepository;
import com.mkhelper.demo.repositories.IUserRepository;
import com.mkhelper.demo.services.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    ICredentialRepository credentialRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private final AppConfig appConfig;

    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication=null;
        ResponseEntity<?> response;
       try{ authentication = authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));}
       catch(BadCredentialsException e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect user credentials!");
       } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("A problem occurred while authenticating user.");
       }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        setCurrentUser(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }
        encoder = new BCryptPasswordEncoder(16);
        // Create new user's account
        User user = User.builder().firstName(signUpRequest.getFirstname()).lastName(signUpRequest.getLastname()).username(signUpRequest.getUsername()).email(signUpRequest.getEmail()).password( encoder.encode(signUpRequest.getPassword())).build();

        Set<String> strRoles = signUpRequest.getRole();
        Set<Credential> credentials = new HashSet<>();

        if (strRoles == null) {
            Credential userCredential = credentialRepository.findByDescription(ERole.ROLE_NORMAL_USER.role)
                    .orElseThrow(() -> new RuntimeException("Error: Roles is not found."));
            credentials.add(userCredential);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Credential adminRole = credentialRepository.findByDescription(ERole.ROLE_NORMAL_USER.role)
                                .orElseThrow(() -> new RuntimeException("Error: Roles is not found."));
                        credentials.add(adminRole);

                        break;
                    default:
                        Credential userRole = credentialRepository.findByDescription(ERole.ROLE_ADMIN.role)
                                .orElseThrow(() -> new RuntimeException("Error: Roles is not found."));
                        credentials.add(userRole);
                }
            });
        }

        user.setCredential(credentials.iterator().next());
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

//    @GetMapping("signout")
//    public ResponseEntity signout(){
//        this.removeCurrentUser();
//        return ResponseEntity.ok();
//    }

    private void setCurrentUser(UserDetailsImpl userDetails) {
       getAppConfig().setCurrentUser(getUserService().findUserByUsername(userDetails.getUsername()).get());
    }

    private void removeCurrentUser(){
        getAppConfig().setCurrentUser(null);
    }
}
