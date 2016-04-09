package com.dca.center.dao;

import com.dca.center.model.CrawlersLog;

public interface CrawlersLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(CrawlersLog record);

    int insertSelective(CrawlersLog record);

    CrawlersLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(CrawlersLog record);

    int updateByPrimaryKey(CrawlersLog record);
}