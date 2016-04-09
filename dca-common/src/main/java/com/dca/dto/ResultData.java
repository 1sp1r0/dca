package com.dca.dto;

import java.io.Serializable;

public class ResultData implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 163169309404593743L;
	
	public long getUseId() {
		return useId;
	}
	public void setUseId(long useId) {
		this.useId = useId;
	}
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	private long useId;
	private long companyId;
	private String userName;
	private String companyName;
	private String result;
	private String status;

}
