package com.dca.webservice.impl;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.api.NewsCrawlerService;
import com.dca.center.service.DataLoaderService;
import com.dca.common.BindResult;
import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.CrawlData;
import com.dca.usercrawler.Crawler;
import com.dca.usercrawler.helpers.BaseFactory;
import com.dca.usercrawler.helpers.CrawlerFactory;
import com.dca.usercrawler.helpers.EnumHelper;
import com.dca.usercrawler.helpers.TaskEnum;

@Service("crawlerWebservice")
public class BaseCrawlerServiceImpl implements NewsCrawlerService {
	private static final Logger LOGGER = LoggerFactory.getLogger(BaseCrawlerServiceImpl.class);
	@Autowired
	private CrawlerFactory crawlerFactory;
	
	@Autowired
	private DataLoaderService dataLoaderService;
	
	
	static HashMap<String,String> resourceShortMap=new HashMap<String,String>();
	static{
		resourceShortMap.put("provident_fund", "PFD");
		resourceShortMap.put("social_insurance", "SIS");
		resourceShortMap.put("e_commerce", "ECE");
	}
	

	public void crawler(long userId, long accountId, String username, String password, String type, String area) {
		// TODO Auto-generated method stub
		long start = System.currentTimeMillis();
		String resSign=resourceShortMap.get(type);
		TaskEnum taskEnum = EnumHelper.translateByLabel(TaskEnum.class, type);
		BaseFactory task = taskEnum.getTask();
		Crawler crawler = task.createCrawler(area);
		LoginData loginData = null;
		try {
			loginData = crawler.tryLogin(userId, accountId, username, password);
			if (!loginData.isSuccessful()) {//登陆失败
				logCrawlActivity(userId,accountId,resSign,"失败",loginData.getError(),"","");
				return;
			}
			LOGGER.info("Login state: {} with error: {},Total times:{}", loginData.isSuccessful(), loginData.getError(),System.currentTimeMillis() - start);
		} catch (Exception ex) {
			LOGGER.error("Fail to tryLogin,Total times:{}", System.currentTimeMillis() - start, ex);
			logCrawlActivity(userId,accountId,resSign,"失败",ex.getMessage(),"","");
			return;
		}
		start = System.currentTimeMillis();
		try {
			Account account = new Account(userId, accountId, username, password);
			CrawlData data = crawler.crawlAccountData(account, loginData);
//			dataLoaderService.dataLoader(userId, username, data, type);
			logCrawlActivity(userId,accountId,resSign,"成功","","成功","");
			LOGGER.info("CrawlerData state: {} with error: {},Total times:{}", data.isSuccess(),data.getErrMessage(),System.currentTimeMillis() - start);
		} catch (Exception e) {
			// TODO: handle exception
			LOGGER.error("Fail to CrawlerData,Total times:{}", System.currentTimeMillis() - start, e);
			logCrawlActivity(userId,accountId,resSign,"成功","","失败",e.getMessage());
		}
	}

	private void logCrawlActivity(long userId, long accountId, String resSign, String loginStatus, String loginErr,String crawlerStatus, String crawlerErr) {
		try {
			dataLoaderService.insertCrawlerLog(userId, accountId, resSign, loginStatus, loginErr,crawlerStatus, crawlerErr);
		} catch (Exception ex) {
			// ignore
		}
	}
	

	public BindResult tryLogin(long userId, long accountId, String username, String password) {
		// TODO Auto-generated method stub
		Crawler crawler = crawlerFactory.createCrawler(accountId);
		LoginData loginData = null;
		try {
			loginData = crawler.tryLogin(userId, accountId, username, password);
			LOGGER.info("Login state: {} with error: {}", loginData.isSuccessful(), loginData.getError());
		} catch (Exception ex) {
			LOGGER.error("Fail to tryLogin: ", ex);
		}
		return new BindResult();
	}

}
