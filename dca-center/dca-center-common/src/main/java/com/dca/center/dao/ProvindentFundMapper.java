package com.dca.center.dao;

import com.dca.center.model.ProvindentFund;

public interface ProvindentFundMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ProvindentFund record);

    int insertSelective(ProvindentFund record);

    ProvindentFund selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ProvindentFund record);

    int updateByPrimaryKeyWithBLOBs(ProvindentFund record);

    int updateByPrimaryKey(ProvindentFund record);
}