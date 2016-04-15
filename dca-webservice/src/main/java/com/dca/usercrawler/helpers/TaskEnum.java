package com.dca.usercrawler.helpers;

public enum TaskEnum {
	PROVIDENT_FUND("provident_fund", "com.dca.usercrawler.helpers.ProvidentFundFactory", "公积金",
			"fund"), SOCIAL_INSURANCE("social_insurance", "com.dca.usercrawler.helpers.SocialInsuranceFactory", "社会保险", "social"),
	E_COMMERCE("e_commerce", "com.dca.usercrawler.helpers.EcommerceFactory", "电商", "ecommerce");

	private String label;// 标签

	private String taskClass;// 类名

	private String description;// 描述

	private String for_short;// 简称

	private TaskEnum(String label, String taskClass, String description, String forshort) {
		this.label = label;
		this.taskClass = taskClass;
		this.description = description;
		this.for_short = forshort;
	}

	public String getLabel() {
		return label;
	}

	public String getTaskClass() {
		return taskClass;
	}
	public String getDescription() {
		return description;
	}

	public String getFor_short() {
		return for_short;
	}

	public BaseFactory getTask() {
		BaseFactory task = null;
		try {
			task = (BaseFactory) Class.forName(this.getTaskClass()).newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return task;
	}

}
