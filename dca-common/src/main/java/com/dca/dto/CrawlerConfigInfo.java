package com.dca.dto;

import java.io.Serializable;

public class CrawlerConfigInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2488273903243068042L;
	private String crawlerUrl;
	private String type;
	
	
	public String getCrawlerUrl() {
		return crawlerUrl;
	}
	public void setCrawlerUrl(String crawlerUrl) {
		this.crawlerUrl = crawlerUrl;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
