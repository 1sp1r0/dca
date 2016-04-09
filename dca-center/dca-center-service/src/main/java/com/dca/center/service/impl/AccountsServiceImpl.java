package com.dca.center.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.dao.AccountsMapper;
import com.dca.center.model.Accounts;
import com.dca.center.service.AccountsService;
@Service("accountsService")
public class AccountsServiceImpl implements AccountsService {
	
	@Autowired
	private AccountsMapper accountsMapper;

	public Accounts selectById(Long id) {
		// TODO Auto-generated method stub
		return accountsMapper.selectByPrimaryKey(id);
	}

	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return accountsMapper.deleteByPrimaryKey(id);
	}

	public int insert(Accounts record) {
		// TODO Auto-generated method stub
		return accountsMapper.insert(record);
	}

	public int update(Accounts record) {
		// TODO Auto-generated method stub
		return accountsMapper.updateByPrimaryKey(record);
	}

}
