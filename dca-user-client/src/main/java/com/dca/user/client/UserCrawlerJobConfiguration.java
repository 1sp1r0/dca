package com.dca.user.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.remoting.caucho.HessianProxyFactoryBean;

import com.dca.api.NewsCrawlerService;


@Configuration
@PropertySource(value = "classpath:config.properties")
@ComponentScan("com.prcsteel")
public class UserCrawlerJobConfiguration {
	
	@Autowired
	private Environment env;
	
	public UserCrawlerJobConfiguration() {
	}
	
	@Bean
	public HessianProxyFactoryBean crawlerWebservice() {
	    HessianProxyFactoryBean factory = new HessianProxyFactoryBean();
	    factory.setServiceUrl(env.getProperty("commonCrawlerWebservice.serviceUrl"));
	    factory.setServiceInterface(NewsCrawlerService.class);
	    return factory;
	}
	
	
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}
}
