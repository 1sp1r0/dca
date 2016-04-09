package com.dca.dto;

import java.io.Serializable;

public class Account implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8050377984138900582L;
	private long companyId;
	private String companyName;
	private long userId;
	private String userName;
	private String userPwd;
	
	public Account(){};
	public Account(long userId,long companyId,String userName,String userPwd){
		this.userId=userId;
		this.companyId=companyId;
		this.userName=userName;
		this.userPwd=userPwd;
	}
	
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
}
