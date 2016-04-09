package com.dca.usercrawler.helpers;

import java.util.LinkedHashMap;

import com.dca.http.CrawlerClient;

public class RetryData {
	
	public RetryData(CrawlerClient client, String username, String password, String referer, String imgUrl,LinkedHashMap<String, String> parametersMap) {
		this.client = client;
		this.username = username;
		this.password = password;
		this.imgUrl  = imgUrl;
		this.referer = referer; 
		this.parametersMap=parametersMap;
	}

	public CrawlerClient client;
	public String username;
	public String password;
	public String uid;
	
	public boolean successful;
	public String imgUrl;
	public String referer;
	public String loginPageContent;
	public String errorMsg;
	public LinkedHashMap<String, String> parametersMap;
}