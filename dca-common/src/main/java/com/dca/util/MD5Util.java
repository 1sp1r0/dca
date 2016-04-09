package com.dca.util;

import java.security.MessageDigest;

/**
 * 
 * @Author: yangdekun
 * @Date: 2016年1月11日 上午10:17:41
 * @Description:
 */
public class MD5Util {
	/***
	 * MD5加码 生成32位md5码
	 */
	public static String string2MD5(String inStr) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (Exception e) {
			System.out.println(e.toString());
			e.printStackTrace();
			return "";
		}
		char[] charArray = inStr.toCharArray();
		byte[] byteArray = new byte[charArray.length];

		for (int i = 0; i < charArray.length; i++)
			byteArray[i] = (byte) charArray[i];
		byte[] md5Bytes = md5.digest(byteArray);
		StringBuffer hexValue = new StringBuffer();
		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16)
				hexValue.append("0");
			hexValue.append(Integer.toHexString(val));
		}
		return hexValue.toString();

	}

	public static String getPath(String md5, String root) {
		StringBuffer path = new StringBuffer();
		for (int i = 0, len = md5.length(); i < len; i += 4) {
			path.append(md5.substring(i, i + 4)).append("/");
		}
		return root + path.substring(0, path.toString().length() - 1) + ".txt";
	}
	
	
	// 测试主函数
	public static void main(String args[]) {
		String s = new String("tangfuqiang");
		System.out.println("原始：" + s);
		System.out.println("MD5后：" + string2MD5(s));
		String sourceStr = string2MD5(s);
		String result=getPath(sourceStr, "d:/data/");
		System.out.println(result);
	}
}
