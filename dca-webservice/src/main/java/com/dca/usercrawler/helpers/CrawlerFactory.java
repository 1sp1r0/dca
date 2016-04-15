package com.dca.usercrawler.helpers;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.dca.dto.CategoryType;
import com.dca.usercrawler.Crawler;


@Component("crawlerFactory")
public class CrawlerFactory implements ApplicationContextAware {

	private ApplicationContext appContext;
	
	public CrawlerFactory() {}
	
	public Crawler createCrawler(long companyId) {
		CategoryType companyType = CategoryType.getCompanyType(companyId);
		
		return (Crawler) appContext.getBean(companyType.getNickname());

	}
	
	public Crawler createCrawler(String crawlerName) {
		
		return (Crawler) appContext.getBean(crawlerName);

	}
	
	public boolean hasCrawler(long companyId) {
	    CategoryType companyType = CategoryType.getCompanyType(companyId);
        if (companyType == null) {
            return false;
        }
        return appContext.containsBean(companyType.getNickname());
	}
	

    public void setApplicationContext(ApplicationContext appContext) throws BeansException {
        this.appContext = appContext;
    }
}
