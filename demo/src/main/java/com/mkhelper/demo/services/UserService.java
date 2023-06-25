package com.mkhelper.demo.services;

import com.mkhelper.demo.models.User;
import com.mkhelper.demo.models.pojo.UserPojo;
import com.mkhelper.demo.repositories.IUserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Data
public class UserService {
    private final IUserRepository userRepository;
    public Optional<User> findUserByUsername(String username) {
     return getUserRepository().findByUsername(username);
    }

    public List<UserPojo> getAllUsers(){
        List<User> users = getUserRepository().findAll();
        List<UserPojo> pojos = new ArrayList<>();
        for (User u:users) {
            UserPojo pojo = UserPojo.builder().firstName(u.getFirstName()).lastName(u.getLastName()).username(u.getUsername()).email(u.getEmail()).build();
            pojos.add(pojo);
        }
        return pojos;
    }


    public boolean deleteUserByUsername(String username) {
        var user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            userRepository.delete(user.get());
            return true;
        }

        return false;
    }

}
