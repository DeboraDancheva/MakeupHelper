package com.mkhelper.demo.repositories;

import com.mkhelper.demo.models.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICredentialRepository extends JpaRepository<Credential, Long> {
    Optional<Credential> findByDescription(String credentialDescription);
}
