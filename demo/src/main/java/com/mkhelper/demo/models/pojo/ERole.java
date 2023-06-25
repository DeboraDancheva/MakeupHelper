package com.mkhelper.demo.models.pojo;

public enum ERole {
    ROLE_ADMIN("Admin"),
    ROLE_NORMAL_USER("User");

    public String role;

    ERole(String role){
        this.role = role;
    }
}
