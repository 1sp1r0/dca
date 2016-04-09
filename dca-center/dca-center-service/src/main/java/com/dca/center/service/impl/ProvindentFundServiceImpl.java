package com.dca.center.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.dao.ProvindentFundMapper;
import com.dca.center.model.ProvindentFund;
import com.dca.center.service.ProvindentFundService;

@Service("provindentFundsService")
public class ProvindentFundServiceImpl implements ProvindentFundService {

	@Autowired
	private ProvindentFundMapper provindentFundMapper;

	public ProvindentFund selectById(Long id) {
		// TODO Auto-generated method stub
		return provindentFundMapper.selectByPrimaryKey(id);
	}

	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return provindentFundMapper.deleteByPrimaryKey(id);
	}

	public int insert(ProvindentFund record) {
		// TODO Auto-generated method stub
		return provindentFundMapper.insert(record);
	}

	public int update(ProvindentFund record) {
		// TODO Auto-generated method stub
		return provindentFundMapper.updateByPrimaryKey(record);
	}

}
