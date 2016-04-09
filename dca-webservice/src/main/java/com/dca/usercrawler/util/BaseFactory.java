package com.dca.usercrawler.util;

import org.springframework.stereotype.Component;
@Component("baseFactory")
public abstract class BaseFactory{
	public abstract <T> T createCrawler(long id);
	
	public abstract <T> T createCrawler(String name);
}
