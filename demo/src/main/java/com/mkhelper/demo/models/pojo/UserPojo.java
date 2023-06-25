package com.mkhelper.demo.models.pojo;

import com.mkhelper.demo.models.Credential;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPojo {
    private String username;

    private String email;

    private String firstName;

    private String lastName;

}
