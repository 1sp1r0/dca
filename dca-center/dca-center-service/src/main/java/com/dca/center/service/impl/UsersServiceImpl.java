package com.dca.center.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.dao.UsersMapper;
import com.dca.center.model.Users;
import com.dca.center.service.UsersService;
@Service("UsersService")
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersMapper usersMapper;
	
	public Users selectById(Long id) {
		// TODO Auto-generated method stub
		return usersMapper.selectByPrimaryKey(id);
	}

	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return usersMapper.deleteByPrimaryKey(id);
	}

	public int insert(Users record) {
		// TODO Auto-generated method stub
		return usersMapper.insert(record);
	}

	public int update(Users record) {
		// TODO Auto-generated method stub
		return usersMapper.updateByPrimaryKey(record);
	}

}
