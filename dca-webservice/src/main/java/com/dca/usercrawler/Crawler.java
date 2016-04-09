package com.dca.usercrawler;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.CrawlData;

public interface Crawler {
	

	/**
	 * 尝试利用账号登陆
	 * @param userId
	 * @param companyId
	 * @param username
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public LoginData tryLogin(long userId,long companyId,String username,String password) throws Exception;
	
	/**
	 * 登陆并采集数据
	 * @param account
	 * @return
	 * @throws Exception
	 */
	public CrawlData crawlAccount(Account account) throws Exception;
	
	/**
	 * 登陆成功后再进行采集动作
	 * @param account
	 * @param loginData
	 * @return
	 * @throws Exception
	 */
	public CrawlData crawlAccountData(Account account,LoginData loginData) throws Exception;
	
	public void checkVerifyCode(long userId, String username, String verifyCode, LoginData loginData) throws Exception;
	
}
