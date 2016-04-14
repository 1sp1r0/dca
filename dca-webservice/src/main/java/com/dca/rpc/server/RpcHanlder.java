package com.dca.rpc.server;

import org.apache.commons.codec.binary.Base64;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dca.api.NewsCrawlerService;
import com.dca.spring.SpringContext;

public class RpcHanlder {
	private static final Logger LOGGER = LoggerFactory.getLogger(RpcHanlder.class);

	/**
	 * 
	 * @param userId
	 * @param accountId
	 * @param username
	 * @param password
	 * @param type
	 * @param area
	 * @return
	 */
	public String crawl(long userId, long accountId, String username, String password, String type, String area) {
		LOGGER.info("RPC server to crawl for userId:{},accountId:{},username:{}", userId, accountId, username);
		NewsCrawlerService service = (NewsCrawlerService) SpringContext.getInstance().getBean("newsCrawlerService");
		service.crawler(userId, accountId, username, password, type, area);
		return "ok";
	}

	@Test
	public void testProvidentFund(){
		crawl(2, 2, "082829007900", "435582","provident_fund","杭州");
	}
	
	@Test
	public void testEcommerce_jd(){
		crawl(1, 1, new String(Base64.decodeBase64("OTkyMzkxMzU3QHFxLmNvbQ==".getBytes())),new String(Base64.decodeBase64("eWFuZzEyNTg=".getBytes())),"e_commerce","京东");
	}
	
	@Test
	public void testEcommerce_tb(){
		crawl(1, 3, "15802489620","yang1258.","e_commerce","淘宝");
	}
	
	public static void main(String[] args) {
		new RpcHanlder().crawl(1, 3, "15802489620","yang1258.","e_commerce","淘宝");
	}
}
