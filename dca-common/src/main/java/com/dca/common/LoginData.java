package com.dca.common;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class LoginData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5681518128018474866L;
	private boolean successful;
    private String error;
    
    private String externalAccountId;
    private Object crawlerClient;
    private boolean wrongPassword; 
    private boolean needVerifyCode;
    
    private Map<String, Object> extraInfo;
    
    public LoginData() {}
    
    public LoginData(boolean successful) {
        this.successful = successful;
    }
    
    public LoginData(String error) {
        this.successful = false;
        this.error = error;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }
    
    

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Map<String, Object> getExtraInfo() {
        return extraInfo == null ? new HashMap<String, Object>() : extraInfo;
    }

    public void setExtraInfo(Map<String, Object> extraInfo) {
        this.extraInfo = extraInfo;
    }
    
    public void putExtraInfo(String name, Object value) {
        if (extraInfo == null) {
            extraInfo = new HashMap<String, Object>();
        }
        
        extraInfo.put(name, value);
    }
    
    public Object getCrawlerClient() {
		return crawlerClient;
	}

	public void setCrawlerClient(Object crawlerClient) {
		this.crawlerClient = crawlerClient;
	}

	public String getExtraInfoAsString(String name) {
        return extraInfo == null ? null : extraInfo.get(name) + "";
    }
    
    public Object getExtraInfoData(String name) {
    	return extraInfo.get(name);
    }
    

	public String getExternalAccountId() {
		return externalAccountId;
	}

	public void setExternalAccountId(String externalAccountId) {
		this.externalAccountId = externalAccountId;
	}

	public boolean isWrongPassword() {
		return wrongPassword;
	}

	public void setWrongPassword(boolean wrongPassword) {
		this.wrongPassword = wrongPassword;
	}

	public boolean isNeedVerifyCode() {
		return needVerifyCode;
	}

	public void setNeedVerifyCode(boolean needVerifyCode) {
		this.needVerifyCode = needVerifyCode;
	}
	
}
