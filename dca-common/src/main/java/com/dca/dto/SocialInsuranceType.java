package com.dca.dto;
import java.util.HashMap;
import java.util.Map;
/**
 * 社保类型
 * @author admin
 *
 */
public enum SocialInsuranceType {
	Hangzhou(1,"hangzhou_social", "杭州");
	private static final Map<Long, SocialInsuranceType> SocialInsuranceIdMap = new HashMap<Long, SocialInsuranceType>();
	private static final Map<String, SocialInsuranceType> SocialInsuranceNameMap = new HashMap<String, SocialInsuranceType>();

	static {
		SocialInsuranceType[] fundTypes = SocialInsuranceType.values();
		for (SocialInsuranceType fundType : fundTypes) {
			SocialInsuranceIdMap.put(fundType.getId(), fundType);
			SocialInsuranceNameMap.put(fundType.getName(), fundType);
		}
	}
	private final long id;
	private final String nickName;
	private final String name;

	private SocialInsuranceType(long id,String nickName, String name) {
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
	public static SocialInsuranceType getSocialInsuranceTypeById(long id) {
		return SocialInsuranceIdMap.get(id);
	}
	
	public static SocialInsuranceType getSocialInsuranceTypeByName(String name) {
		return SocialInsuranceNameMap.get(name);
	}
}
