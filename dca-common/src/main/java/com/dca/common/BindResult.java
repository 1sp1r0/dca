package com.dca.common;

import java.io.Serializable;

public class BindResult implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8267181355202810282L;
	private boolean successful;
	private String message;
	private boolean validAccount;
	private boolean needVerifyCode;

	public BindResult() {
	}

	public BindResult(boolean successful, String message) {
		this.successful = successful;
		this.message = message;
	}

	public BindResult(boolean successful, boolean needVerifyCode) {
		this.successful = successful;
		this.needVerifyCode = needVerifyCode;
	}

	public BindResult(boolean successful, String message, boolean validAccount) {
		this.successful = successful;
		this.message = message;
		this.validAccount = validAccount;
	}

	public boolean isSuccessful() {
		return successful;
	}

	public void setSuccessful(boolean successful) {
		this.successful = successful;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isValidAccount() {
		return validAccount;
	}

	public void setValidAccount(boolean validAccount) {
		this.validAccount = validAccount;
	}

	public boolean isNeedVerifyCode() {
		return needVerifyCode;
	}

	public void setNeedVerifyCode(boolean needVerifyCode) {
		this.needVerifyCode = needVerifyCode;
	}

}
