package com.dca.http;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicHeader;

import com.dca.exceptions.UnaccessiblePageCrawlerException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class CrawlerHelper {
	public static final String CHARSET = "utf-8";
	
	public static final SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("yyyy-MM-dd");
	
	public static ObjectMapper OBJECT_MAPPER = new ObjectMapper();
	
	static {
	    OBJECT_MAPPER.setDateFormat(DATE_FORMATTER);
	}
	
	private CrawlerHelper() {}
	
	public static void close(InputStream input) {
		if (input != null) {
			try {
				input.close();
			} catch (Exception ex) {
				// ignore
			}
		}
	}
	
	public static void close(CloseableHttpResponse response) {
	    if (response != null) {
	    	try {
	    		HttpEntity httpEntity = response.getEntity();
	    		if (httpEntity != null) {
	    			InputStream in = httpEntity.getContent();
	    			if (in != null) {
	    				in.close();
	    			}
	    		}
	    	} catch (Exception ex) {
	    		// ignore
	    	}
	        
	        try {
	            response.close();
	        } catch (Exception ex) {
	            // ignore
	        }
	    }
	}
	
	public static void close(CloseableHttpClient httpClient) {
		if (httpClient != null) {
			try {
				httpClient.close();
			} catch (Exception ex) {
				// ignored
			}
		}
	}
	
	public static String getNewFilename(String oldFilename, String newName) {
		String extension = FilenameUtils.getExtension(oldFilename);
		return (extension != null && extension.trim().length() > 0) ?
				(newName + "." + extension) : newName;
	}
	
	public static PoolingHttpClientConnectionManager createPoolingHttpClientConnectionManager(int maxConnections) {
		PoolingHttpClientConnectionManager poolingConnManager = new PoolingHttpClientConnectionManager(); 
        poolingConnManager.setMaxTotal(maxConnections);
        poolingConnManager.setDefaultMaxPerRoute(maxConnections);
        
        return poolingConnManager;
	}
	
	public static List<Header> getDefaultHeaders() {
		List<Header> headers = new ArrayList<Header>();
		headers.add(new BasicHeader("Accept-Language", "en,zh-CN;q=0.8,zh;q=0.6"));
		headers.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36"));
		headers.add(new BasicHeader("Accept", "*/*"));
		headers.add(new BasicHeader("Accept-Encoding", "gzip, deflate"));
		//headers.add(new BasicHeader("Cache-Control", "private, max-age=0, no-cache"));
		
		return headers;
	}
	
	public static void checkResponseStatus(CloseableHttpResponse response) {
	    int statusCode = response.getStatusLine().getStatusCode();
		if (statusCode != 200 && statusCode != 302 && statusCode != 205 && statusCode != 301) {
			throw new UnaccessiblePageCrawlerException("Http response failed: " + response.getStatusLine());
		}		
	}

	public static int compareDate(Date d1, Date d2) {
		if (d1.getTime() > d2.getTime()) {//d1>d2
			return 1;
		} else if (d1.getTime() < d2.getTime()) {//d1<d2
			return -1;
		} else {// 相等
			return 0;
		}
	}
	
	public static void printCookie(List<Cookie> cookieList){
		if(cookieList==null){
			return;
		}
		for (Cookie cookie : cookieList) {
			System.out.println(cookie.getName()+"="+cookie.getValue()+" "+cookie.getDomain());
		}
		System.out.println();
	}

	public static byte getByteByboolean(boolean bval){
		return bval?(byte)1:0;
	}
}

