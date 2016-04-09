package com.dca.center.service;

import com.dca.center.model.Users;

public interface UsersService {
	/**
	 * 
	 * 查询（根据主键ID查询）
	 * 
	 **/
	Users selectById (Long id );

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
	int insert(Users record );
	
	/**
	 * 
	 * 修改
	 * 
	 **/
	int update (Users record );
}
