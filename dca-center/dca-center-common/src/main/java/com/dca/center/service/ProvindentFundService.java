package com.dca.center.service;

import com.dca.center.model.ProvindentFund;

public interface ProvindentFundService {
	/**
	 * 
	 * 查询（根据主键ID查询）
	 * 
	 **/
	ProvindentFund selectById (Long id );

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
	int insert(ProvindentFund record );

	/**
	 * 
	 * 修改
	 * 
	 **/
	int update (ProvindentFund record );
}
