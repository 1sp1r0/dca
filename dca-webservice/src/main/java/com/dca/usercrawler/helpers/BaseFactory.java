package com.dca.usercrawler.helpers;

import org.springframework.stereotype.Component;
@Component("baseFactory")
public abstract class BaseFactory{
	public abstract <T> T createCrawler(long id);
	
	public abstract <T> T createCrawler(String name);
}
