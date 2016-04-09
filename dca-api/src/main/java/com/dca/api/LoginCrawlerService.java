package com.dca.api;

public interface LoginCrawlerService {
	public boolean bindCompany(String company_name,String site_url,String encode);
	
	public boolean bindUser(String user_name);
}
