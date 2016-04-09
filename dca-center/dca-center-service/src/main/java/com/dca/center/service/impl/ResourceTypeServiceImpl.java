package com.dca.center.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.dao.ResourceTypeMapper;
import com.dca.center.model.ResourceType;
import com.dca.center.service.ResourceTypeService;
@Service("ResourceTypeService")
public class ResourceTypeServiceImpl implements ResourceTypeService {

	@Autowired
	private ResourceTypeMapper resourceTypeMapper;
	
	public ResourceType selectById(Long id) {
		// TODO Auto-generated method stub
		return resourceTypeMapper.selectByPrimaryKey(id);
	}

	public int deleteById(Long id) {
		// TODO Auto-generated method stub
		return resourceTypeMapper.deleteByPrimaryKey(id);
	}

	public int insert(ResourceType record) {
		// TODO Auto-generated method stub
		return resourceTypeMapper.insert(record);
	}

	public int update(ResourceType record) {
		// TODO Auto-generated method stub
		return resourceTypeMapper.updateByPrimaryKey(record);
	}

}
