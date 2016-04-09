package com.dca.center.model;

import java.util.Date;

public class CrawlersLog {
    private Long id;

    private Long userid;

    private Long accountid;

    private String resSign;

    private String loginstatus;

    private String loginerrormessage;

    private String crawlerstatus;

    private String crawlererrormessage;

    private Date createtime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getAccountid() {
        return accountid;
    }

    public void setAccountid(Long accountid) {
        this.accountid = accountid;
    }

    public String getResSign() {
        return resSign;
    }

    public void setResSign(String resSign) {
        this.resSign = resSign == null ? null : resSign.trim();
    }

    public String getLoginstatus() {
        return loginstatus;
    }

    public void setLoginstatus(String loginstatus) {
        this.loginstatus = loginstatus == null ? null : loginstatus.trim();
    }

    public String getLoginerrormessage() {
        return loginerrormessage;
    }

    public void setLoginerrormessage(String loginerrormessage) {
        this.loginerrormessage = loginerrormessage == null ? null : loginerrormessage.trim();
    }

    public String getCrawlerstatus() {
        return crawlerstatus;
    }

    public void setCrawlerstatus(String crawlerstatus) {
        this.crawlerstatus = crawlerstatus == null ? null : crawlerstatus.trim();
    }

    public String getCrawlererrormessage() {
        return crawlererrormessage;
    }

    public void setCrawlererrormessage(String crawlererrormessage) {
        this.crawlererrormessage = crawlererrormessage == null ? null : crawlererrormessage.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }
}