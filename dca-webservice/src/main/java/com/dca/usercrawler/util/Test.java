package com.dca.usercrawler.util;

import com.dca.api.NewsCrawlerService;
import com.dca.spring.SpringContext;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		NewsCrawlerService service = (NewsCrawlerService) SpringContext.getInstance().getBean("newsCrawlerService");
		System.out.println(service);
//		TaskEnum taskEnum = EnumHelper.translateByLabel(TaskEnum.class, "provident_fund");
//		BaseFactory task = taskEnum.getTask();
//		System.out.println(task.createCrawler("杭州"));
	
	}

}
