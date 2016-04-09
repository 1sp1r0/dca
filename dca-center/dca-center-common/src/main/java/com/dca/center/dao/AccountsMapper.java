package com.dca.center.dao;

import com.dca.center.model.Accounts;

public interface AccountsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Accounts record);

    int insertSelective(Accounts record);

    Accounts selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Accounts record);

    int updateByPrimaryKey(Accounts record);
}