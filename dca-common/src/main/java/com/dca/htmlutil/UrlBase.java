package com.dca.htmlutil;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class UrlBase {
	
	public  static URL getBaseUrl(String strHtml){
		final String regex = "<base.*>?";
		final Pattern pt = Pattern.compile(regex);
		final Matcher mt = pt.matcher(strHtml);
		if (mt.find()) {
			String strAtoA = mt.group();
			final Matcher urlMatcher = Pattern.compile("href=[\'|\"].*?[\'|\"]").matcher(strAtoA);
			if (urlMatcher.find()) {
				String strUrl = urlMatcher.group();
				strUrl = strUrl.replace("href=", "");
				strUrl = strUrl.replace("\"", "");
				strUrl = strUrl.replace("\'", "");
				URL url;
				try {
					url = new URL(strUrl);
					return url;
				} catch (MalformedURLException e) {
					e.printStackTrace();
					return null;
				}
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
	
	/**
	 * 将相对路径转绝对路径
	 * @param urlWeb
	 * @param url
	 * @param netUrl
	 * @return
	 */
	public static String webUrl(URL urlWeb,String url,String netUrl){
		String strUrl="";
		URL absoluteUrl;
		try {
			strUrl = makeAbsoluteURL(urlWeb, url.trim(), netUrl.trim());
		} catch (Exception e) {
			try {
				absoluteUrl = new URL(netUrl);
				URL parseUrl = new URL(absoluteUrl, url);
				strUrl = parseUrl.toString().trim();
			} catch (MalformedURLException e1) {
				return null;
			}
		}
		if(!strUrl.contains("http://")&&!strUrl.contains("https://")){
			if(strUrl.startsWith("/")){
				if(netUrl.contains("http://"))
					strUrl=netUrl.substring(0,netUrl.indexOf("/","http://".length()))+url;
				else if(netUrl.contains("https://"))
					strUrl=netUrl.substring(0,netUrl.indexOf("/","https://".length()))+url;
			}else{
				if(netUrl.contains("http://"))
					strUrl=netUrl.substring(0,netUrl.indexOf("/","http://".length()))+"/"+url;
				else if(netUrl.contains("https://"))
					strUrl=netUrl.substring(0,netUrl.indexOf("/","https://".length()))+"/"+url;
			}
		}
		strUrl=strUrl.replace("\\", "/");
		strUrl=strUrl.replace("&amp;", "&");
		return strUrl.trim();
	}
	
	public static String parseUrl(String relativePath,String absolutePath){
		try {
			URL absoluteUrl = new URL(absolutePath);  
			URL parseUrl = new URL(absoluteUrl ,relativePath );  
			return parseUrl.toString();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	
	/**
     *<br>方法说明：相对路径转绝对路径
     *<br>输入参数：strWeb 网页地址; innerURL 相对路径链接; strBaseUrl base地址
     *<br>返回类型：绝对路径链接
	 * @throws  
     */
	public static String makeAbsoluteURL(URL strWeb, String innerURL,String strBaseUrl) {
		if (innerURL != null && innerURL.toLowerCase().indexOf("http") == 0) {
			return innerURL;
		}
		if (innerURL.indexOf("#") != -1) {
			innerURL = innerURL.substring(0, innerURL.indexOf("#"));
		}
		if (innerURL.indexOf("?") == 0) {
			int pos = strBaseUrl.indexOf("?");
			if (pos != -1) {
				return strBaseUrl.substring(0, pos) + innerURL;
			}
		}
		int start = innerURL.indexOf("&PHPSESSID=");
		if (start != -1) {
			int end = innerURL.indexOf("&", start + 2);
			if (end == -1)
				end = innerURL.length();
			String SESSID = innerURL.substring(start, end);
			innerURL = innerURL.replace(SESSID, "");
		}
		if (strWeb == null) {
			int pos = strBaseUrl.indexOf("?");
			if (pos != -1) {
				strBaseUrl = strBaseUrl.substring(0, pos);
			}
			try {
				strWeb = new URL(strBaseUrl);
			} catch (Exception e) {
				e.printStackTrace();
				return innerURL;
			}
		}
		try {
			int pos = innerURL.indexOf("?");
			String hzURL = "";
			if (pos != -1) {
				hzURL = innerURL.substring(pos, innerURL.length());
				innerURL = innerURL.substring(0, pos);
			}
			URI base = strWeb.toURI();
			URI abs = base.resolve(innerURL);// 解析于上述网页的相对URL，得到绝对URI
			URL absURL = abs.toURL();
			String strABSURL = absURL.toString() + hzURL;
			strABSURL = strABSURL.replace(Matcher.quoteReplacement("../"), "");
			return strABSURL;
		} catch (Exception e) {
			return innerURL;
		}
	}
}