package com.dca.center.service;

import com.dca.dto.CrawlData;

/**
 * 数据入库
 * @author admin
 *
 */
public interface DataLoaderService {
	
	boolean dataLoader(long userId,String username,CrawlData crawlerData,String sign);
	
	int insertCrawlerLog(long userId, long accountId, String resSign, String loginStatus, String loginErr,String crawlerStatus, String crawlerErr);
}
