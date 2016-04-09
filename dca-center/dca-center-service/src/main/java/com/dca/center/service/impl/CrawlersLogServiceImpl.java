package com.dca.center.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.dao.CrawlersLogMapper;
import com.dca.center.model.CrawlersLog;
import com.dca.center.service.CrawlersLogService;
@Service("crawlersLogService")
public class CrawlersLogServiceImpl implements CrawlersLogService {

	@Autowired
	private CrawlersLogMapper crawlersLogMapper;
	
	public CrawlersLog selectById(Long id) {
		// TODO Auto-generated method stub
		return crawlersLogMapper.selectByPrimaryKey(id);
	}

	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return crawlersLogMapper.deleteByPrimaryKey(id);
	}

	public int insert(CrawlersLog record) {
		// TODO Auto-generated method stub
		return crawlersLogMapper.insert(record);
	}

	public int update(CrawlersLog record) {
		// TODO Auto-generated method stub
		return crawlersLogMapper.updateByPrimaryKey(record);
	}

}
