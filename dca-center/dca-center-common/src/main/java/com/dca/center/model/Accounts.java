package com.dca.center.model;

import java.util.Date;

public class Accounts {
    private Long id;

    private Long userid;

    private String jdAccount;

    private String jdPwd;

    private String tbAccount;

    private String tbPwd;

    private String telephone;

    private String telephonePwd;

    private String provindentfundAccount;

    private String provindentfundPwd;

    private String socialInsuranceAccount;

    private String socialInsurancePwd;

    private Date createtime;

    private Date updatetime;

    private Date modifytime;

    private Boolean delstatus;

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

    public String getJdAccount() {
        return jdAccount;
    }

    public void setJdAccount(String jdAccount) {
        this.jdAccount = jdAccount == null ? null : jdAccount.trim();
    }

    public String getJdPwd() {
        return jdPwd;
    }

    public void setJdPwd(String jdPwd) {
        this.jdPwd = jdPwd == null ? null : jdPwd.trim();
    }

    public String getTbAccount() {
        return tbAccount;
    }

    public void setTbAccount(String tbAccount) {
        this.tbAccount = tbAccount == null ? null : tbAccount.trim();
    }

    public String getTbPwd() {
        return tbPwd;
    }

    public void setTbPwd(String tbPwd) {
        this.tbPwd = tbPwd == null ? null : tbPwd.trim();
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone == null ? null : telephone.trim();
    }

    public String getTelephonePwd() {
        return telephonePwd;
    }

    public void setTelephonePwd(String telephonePwd) {
        this.telephonePwd = telephonePwd == null ? null : telephonePwd.trim();
    }

    public String getProvindentfundAccount() {
        return provindentfundAccount;
    }

    public void setProvindentfundAccount(String provindentfundAccount) {
        this.provindentfundAccount = provindentfundAccount == null ? null : provindentfundAccount.trim();
    }

    public String getProvindentfundPwd() {
        return provindentfundPwd;
    }

    public void setProvindentfundPwd(String provindentfundPwd) {
        this.provindentfundPwd = provindentfundPwd == null ? null : provindentfundPwd.trim();
    }

    public String getSocialInsuranceAccount() {
        return socialInsuranceAccount;
    }

    public void setSocialInsuranceAccount(String socialInsuranceAccount) {
        this.socialInsuranceAccount = socialInsuranceAccount == null ? null : socialInsuranceAccount.trim();
    }

    public String getSocialInsurancePwd() {
        return socialInsurancePwd;
    }

    public void setSocialInsurancePwd(String socialInsurancePwd) {
        this.socialInsurancePwd = socialInsurancePwd == null ? null : socialInsurancePwd.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public Date getModifytime() {
        return modifytime;
    }

    public void setModifytime(Date modifytime) {
        this.modifytime = modifytime;
    }

    public Boolean getDelstatus() {
        return delstatus;
    }

    public void setDelstatus(Boolean delstatus) {
        this.delstatus = delstatus;
    }
}