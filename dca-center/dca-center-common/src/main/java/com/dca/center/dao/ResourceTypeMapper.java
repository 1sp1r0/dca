package com.dca.center.dao;

import com.dca.center.model.ResourceType;

public interface ResourceTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(ResourceType record);

    int insertSelective(ResourceType record);

    ResourceType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ResourceType record);

    int updateByPrimaryKey(ResourceType record);
}