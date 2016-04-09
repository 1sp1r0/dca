package com.dca.spring;

public class SpringSupport {
    public SpringSupport() {
        SpringContext.getInstance().autowire(this);
    }
}
