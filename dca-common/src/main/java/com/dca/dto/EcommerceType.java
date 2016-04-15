package com.dca.dto;
import java.util.HashMap;
import java.util.Map;
/**
 * 电商类型
 * @author admin
 *
 */
public enum EcommerceType {
	JingD(1,"jingdong", "京东"),TaoB(2,"taobao", "淘宝"),Vip(3,"vip","唯品会");
	private static final Map<Long, EcommerceType> EcommerceIdMap = new HashMap<Long, EcommerceType>();
	private static final Map<String, EcommerceType> EcommerceNameMap = new HashMap<String, EcommerceType>();

	static {
		EcommerceType[] fundTypes = EcommerceType.values();
		for (EcommerceType fundType : fundTypes) {
			EcommerceIdMap.put(fundType.getId(), fundType);
			EcommerceNameMap.put(fundType.getName(), fundType);
		}
	}
	private final long id;
	private final String nickName;
	private final String name;

	private EcommerceType(long id,String nickName, String name) {
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
	public static EcommerceType getEcommerceTypeById(long id) {
		return EcommerceIdMap.get(id);
	}
	
	public static EcommerceType getEcommerceTypeByName(String name) {
		return EcommerceNameMap.get(name);
	}
}
