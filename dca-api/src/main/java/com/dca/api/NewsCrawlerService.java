package com.dca.api;

import com.dca.common.BindResult;




public interface NewsCrawlerService {
	
	public void crawler(long userId, long accountId, String username,String password,String type,String area);
	
	public BindResult tryLogin(long userId, long accountId, String username, String password);
}

