package com.dca.rpc.server;

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
		crawl(1, 1, "","","e_commerce","京东");
	}
	
	@Test
	public void testEcommerce_tb(){
		crawl(1, 3, "","","e_commerce","淘宝");
	}

	
	@Test
	public void testEcommerce_vip(){
		crawl(1, 3, "","","e_commerce","唯品会");
	}
	
	@Test
	public void testSocial_Insurance(){
		crawl(1, 4, "339005198712106210","xiaolan890310","social_insurance","杭州");
	}
	
	public static void main(String[] args) {
		new RpcHanlder().crawl(1, 4, "339005198712106210","xiaolan890310","social_insurance","杭州");
	}
}
