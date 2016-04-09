package com.dca.usercrawler;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.dca.http.CrawlerClient;

public abstract class BaseSimpleCrawler extends BaseCrawler {

	@Override
	protected LoginData tryLoginUser(long userId, String username, String password, Object client) throws Exception {
		return tryLoginUser(userId, username, password, (CrawlerClient) client);
	}

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, Object client) throws Exception {
		// TODO Auto-generated method stub
		return crawlAccountData(account, loginData, (CrawlerClient)client);
	}

	@Override
	protected CrawlerClient createCrawlerClient() {
		// TODO Auto-generated method stub
		return new CrawlerClient(getProxyService(), true);
	}

	protected abstract LoginData tryLoginUser(long userId,long companyId, String username, String password, CrawlerClient client)
			throws Exception;
	
	protected abstract ResultData crawlAccountData(Account account, LoginData loginData, CrawlerClient client) throws Exception;
}
