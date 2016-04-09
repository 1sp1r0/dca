package com.dca.center.service;

import com.dca.center.model.CrawlersLog;
import com.dca.center.model.ProvindentFund;

public interface CrawlersLogService {
	/**
	 * 
	 * 查询（根据主键ID查询）
	 * 
	 **/
	CrawlersLog selectById (Long id );

	/**
	 * 
	 * 删除（根据主键ID删除）
	 * 
	 **/
	int deleteById (Long id );

	/**
	 * 
	 * 添加
	 * 
	 **/
	int insert(CrawlersLog record );
	
	/**
	 * 
	 * 修改
	 * 
	 **/
	int update (CrawlersLog record );

}
