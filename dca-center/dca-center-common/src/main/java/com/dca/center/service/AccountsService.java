package com.dca.center.service;

import com.dca.center.model.Accounts;

public interface AccountsService {
	/**
	 * 
	 * 查询（根据主键ID查询）
	 * 
	 **/
	Accounts selectById (Long id );

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
	int insert(Accounts record );
	
	/**
	 * 
	 * 修改
	 * 
	 **/
	int update (Accounts record );
}
