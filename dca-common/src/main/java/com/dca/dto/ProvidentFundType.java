package com.dca.dto;
import java.util.HashMap;
import java.util.Map;
/**
 * 公积金 区域
 * @author admin
 *
 */
public enum ProvidentFundType {
	hangzhou(1,"hangzhou_fund", "杭州");
	private static final Map<Long, ProvidentFundType> FundIdMap = new HashMap<Long, ProvidentFundType>();
	private static final Map<String, ProvidentFundType> FundNameMap = new HashMap<String, ProvidentFundType>();

	static {
		ProvidentFundType[] fundTypes = ProvidentFundType.values();
		for (ProvidentFundType fundType : fundTypes) {
			FundIdMap.put(fundType.getId(), fundType);
			FundNameMap.put(fundType.getName(), fundType);
		}
	}
	private final long id;
	private final String nickName;
	private final String name;

	private ProvidentFundType(long id,String nickName, String name) {
		this.id=id;
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
	public static ProvidentFundType getProvidentFundTypeById(long id) {
		return FundIdMap.get(id);
	}
	
	public static ProvidentFundType getProvidentFundByName(String name) {
		return FundNameMap.get(name);
	}
}
