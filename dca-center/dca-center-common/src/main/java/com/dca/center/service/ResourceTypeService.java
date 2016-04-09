package com.dca.center.service;

import com.dca.center.model.ResourceType;

public interface ResourceTypeService {
	/**
	 * 
	 * 查询（根据主键ID查询）
	 * 
	 **/
	ResourceType selectById (Long id );

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
	int insert(ResourceType record );
	
	/**
	 * 
	 * 修改
	 * 
	 **/
	int update (ResourceType record );
}
