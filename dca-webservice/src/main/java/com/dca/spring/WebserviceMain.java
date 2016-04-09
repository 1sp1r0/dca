package com.dca.spring;

import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.dca.api.NewsCrawlerService;


public class WebserviceMain {
//	@Autowired
//	private static LoginCrawlerService loginCrawlerService;
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("dispatcher-servlet.xml");
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
		NewsCrawlerService service=(NewsCrawlerService) beanFactory.getBean("newsCrawlerService");
		System.out.println(service);
	}
}
