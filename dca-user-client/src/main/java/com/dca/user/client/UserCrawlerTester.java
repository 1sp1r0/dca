package com.dca.user.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

import com.dca.api.NewsCrawlerService;


@Component
public class UserCrawlerTester {


	@Autowired
	private NewsCrawlerService crawlerWebservice;

	

	public void crawl(long userId, long companyId, String username,String password) {
		System.out.println("start to crawl");
		//crawlerWebservice.crawler(userId, companyId, username, password);
		//tryLogin(userId, companyId, username,password);
	}


	public void tryLogin(long userId, long companyId, String username, String password) {
		crawlerWebservice.tryLogin(userId, companyId, username, password);
	}


	@SuppressWarnings("resource")
	public static void main(String[] args) throws Exception {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
		context.register(UserCrawlerJobConfiguration.class);
		context.refresh();

		UserCrawlerTester job = context.getBean(UserCrawlerTester.class);
		job.crawl(1, 1, "hzbsc888","zt8771779");
		System.out.println("DONE");
	}
}
