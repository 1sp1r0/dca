package com.dca.dto;
import java.util.HashMap;
import java.util.Map;

public enum CategoryType {
	paf(1,"ProvidentFundType","公积金");

	private static final Map<Long, CategoryType> CompanyIdMap = new HashMap<Long, CategoryType>();
	private static final Map<String, CategoryType> CompanyNameMap = new HashMap<String, CategoryType>();

	static {
		CategoryType[] companyTypes = CategoryType.values();
		for (CategoryType companyType : companyTypes) {
			CompanyIdMap.put(companyType.getId(), companyType);
			CompanyNameMap.put(companyType.getName(), companyType);
		}
	}

	private final long id;
	private final String nickName;
	private final String name;

	private CategoryType(long id, String nickName, String name) {
		this.id = id;
		this.nickName = nickName;
		this.name = name;
	}

	public long getId() {
		return this.id;
	}

	public String getNickname() {
		return this.nickName;
	}

	public String getName() {
		return this.name;
	}

	public static CategoryType getCompanyType(long companyId) {
		return CompanyIdMap.get(companyId);
	}

	public static CategoryType getCompanyTypeByName(String name) {
		return CompanyNameMap.get(name);
	}
}
