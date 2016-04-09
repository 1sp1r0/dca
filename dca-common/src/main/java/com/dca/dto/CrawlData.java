package com.dca.dto;

import java.io.Serializable;
import java.util.Date;

public class CrawlData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8495099991030603376L;
	private String errMessage;
	private Date startDate;
	private Date endDate;
	private boolean isSuccess;
	private Object crawlerClient;
	private boolean wrongPassword;
	private ResultData resultData;

	public CrawlData() {

	}

	public CrawlData(String errMessage, boolean wrongPassword) {
		this.isSuccess = false;
		this.errMessage = errMessage;
		this.wrongPassword = wrongPassword;
	}

	public CrawlData(boolean isSuccess, ResultData resultData) {
		this.isSuccess = isSuccess;
		this.resultData = resultData;
	}

	public CrawlData(String errMessage) {
		this.isSuccess = false;
		this.errMessage = errMessage;
	}

	public String getErrMessage() {
		return errMessage;
	}

	public void setErrMessage(String errMessage) {
		this.errMessage = errMessage;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}


	public boolean isSuccess() {
		return isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public Object getCrawlerClient() {
		return crawlerClient;
	}

	public void setCrawlerClient(Object crawlerClient) {
		this.crawlerClient = crawlerClient;
	}

	public boolean isWrongPassword() {
		return wrongPassword;
	}

	public void setWrongPassword(boolean wrongPassword) {
		this.wrongPassword = wrongPassword;
	}

	public ResultData getResultData() {
		return resultData;
	}

	public void setResultData(ResultData resultData) {
		this.resultData = resultData;
	}
}
