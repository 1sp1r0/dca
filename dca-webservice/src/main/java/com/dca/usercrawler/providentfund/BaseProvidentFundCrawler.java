package com.dca.usercrawler.providentfund;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.CrawlData;
import com.dca.dto.ResultData;
import com.dca.exceptions.CrawlerException;
import com.dca.http.CrawlerClient;
import com.dca.proxyService.Proxyservice;
import com.dca.usercrawler.Crawler;
import com.dca.usercrawler.helpers.RetryData;
import com.gargoylesoftware.htmlunit.WebClient;


public abstract class BaseProvidentFundCrawler implements Crawler{

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private Proxyservice proxyService;

	public BaseProvidentFundCrawler() {
	}
	
	protected abstract Object createCrawlerClient();

	public Proxyservice getProxyService() {
		return proxyService;
	}

	@Override
	public LoginData tryLogin(long userId, long companyId, String username, String password) throws Exception {
		// TODO Auto-generated method stub
		Object client = null;
		client = this.createCrawlerClient();
		LoginData loginData =this.tryLoginUser(userId,companyId,username,password,client);
		loginData.setCrawlerClient(client);
		logger.debug("retryLogin state: {} with error: {}", loginData.isSuccessful(), loginData.getError());
		return loginData;
	}

	@Override
	public CrawlData crawlAccountData(Account account,LoginData logindata) throws Exception{
		// TODO Auto-generated method stub
		Object client = logindata.getCrawlerClient();
		try {
			ResultData data=this.crawlAccountData(account,logindata,client);
			return new CrawlData(true, data);
		} finally {
			dispose(client);
		}
	}
	
	@Override
	public CrawlData crawlAccount(final Account account) throws Exception {
		Object client = null;

		try {
			client = this.createCrawlerClient();

			long beginTime = System.currentTimeMillis();
			// try login
			LoginData loginData = this.tryLoginUser(account.getUserId(), account.getCompanyId(),account.getUserName(), account.getUserPwd(), client);
			getLogger().debug("Takes {} ms to login for account: {}", System.currentTimeMillis() - beginTime, account.getUserName());

			getLogger().debug("Login state: {} with error: {}", loginData.isSuccessful(), loginData.getError());

			if (loginData.isSuccessful()) {
				loginData.setCrawlerClient(client);
				beginTime = System.currentTimeMillis();
				ResultData data=this.crawlAccountData(account, loginData,client);
				getLogger().debug("Takes {} ms to crawl data for account: {}", System.currentTimeMillis() - beginTime, account.getUserName());
				// getLogger().debug(CrawlerHelper.OBJECT_MAPPER.writeValueAsString(orders));

				return new CrawlData(true,data);

			} else {

				return new CrawlData((loginData.getError() == null) ? "登录失败" : loginData.getError());
			}
		} finally {
			dispose(client);
		}
	}
	
	private Logger getLogger() {
		// TODO Auto-generated method stub
		return logger;
	}

	private static void dispose(Object client) {
		if (client != null) {
			if (client instanceof CrawlerClient) {
				((CrawlerClient) client).dispose();
			} else if (client instanceof WebClient) {
				((WebClient) client).close();
			}
		}
	}
	
	protected String getValidateCode(RetryData retryData, int retry) throws Exception {

		String verify_code_url = retryData.imgUrl;
		// byte[] pictureData = retryData.client.getPicture(imgUrl);

		UUID uuid = UUID.randomUUID();
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", retryData.referer);
		File path = new File("Verify_Code_Image/");
		if (!path.exists()) {
			path.mkdirs();
		}
		File storeFile = new File("Verify_Code_Image/verify_" + uuid + ".jpg");
		retryData.client.savePicture(verify_code_url, storeFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String verifyCode = null;
		System.out.println("Type in Verification Code:");
		verifyCode = br.readLine();
		System.out.println("The Code is :" + verifyCode);
		storeFile.delete();
		if (!StringUtils.isBlank(verifyCode)) {
			return verifyCode;
		} else {
			getLogger().error("Validate Code Error: {}, account: {}", verifyCode, retryData.username);
			if (retry - 1 == 0) {
				throw new CrawlerException("无法获得验证码");
			}
			return getValidateCode(retryData, retry - 1);
		}
	}

	@Override
	public void checkVerifyCode(long userId, String username, String verifyCode, LoginData loginData) throws Exception {
		// TODO Auto-generated method stub
	}
	
	protected abstract LoginData tryLoginUser(long userId, long companyId,String username, String password, Object client)
			throws Exception;
	
	protected abstract ResultData crawlAccountData(final Account account, LoginData loginData, Object client) throws Exception;
	
}
