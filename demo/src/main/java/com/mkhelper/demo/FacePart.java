package com.mkhelper.demo;

public enum FacePart {
    EYES("eyes"),
    MOUTH("mouth"),
    NOSE("nose"),
    FACE("face");

    public final String value;

    private FacePart(String value) {
        this.value = value;
    }
}
