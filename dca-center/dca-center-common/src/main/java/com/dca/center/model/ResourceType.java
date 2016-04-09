package com.dca.center.model;

public class ResourceType {
    private Long id;

    private String resName;

    private String resShort;

    private String resSign;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResName() {
        return resName;
    }

    public void setResName(String resName) {
        this.resName = resName == null ? null : resName.trim();
    }

    public String getResShort() {
        return resShort;
    }

    public void setResShort(String resShort) {
        this.resShort = resShort == null ? null : resShort.trim();
    }

    public String getResSign() {
        return resSign;
    }

    public void setResSign(String resSign) {
        this.resSign = resSign == null ? null : resSign.trim();
    }
}