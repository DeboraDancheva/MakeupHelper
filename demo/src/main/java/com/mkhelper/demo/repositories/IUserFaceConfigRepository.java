package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.User;
import com.mkhelper.demo.models.UserFaceConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserFaceConfigRepository extends JpaRepository<UserFaceConfig, Long> {

    public Optional<UserFaceConfig> findByUser(User user);
}
