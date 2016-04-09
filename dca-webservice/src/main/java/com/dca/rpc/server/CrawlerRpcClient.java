package com.dca.rpc.server;

import java.net.MalformedURLException;
import java.net.URL;

import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.client.XmlRpcClient;
import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;
import org.apache.xmlrpc.client.XmlRpcCommonsTransportFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CrawlerRpcClient {
	private static final Logger LOGGER = LoggerFactory.getLogger(CrawlerRpcClient.class);
	static final int CONNECTION_TIME=60 * 1000;
	static final int REPLY_TIME=60 * 1000;
	private static CrawlerRpcClient rcpClient = null;
	private String strRpcURL = "";
	private XmlRpcClientConfigImpl mConfig = null;
	public  boolean bConnSucess = true;
	private XmlRpcClient mClient = null;
	static final String rpcUrl="http://192.168.0.21:8085/webService";

	private CrawlerRpcClient() {
		initConnect(rpcUrl);
	}

	public static CrawlerRpcClient getInstance() {
		if (rcpClient == null) {
			rcpClient = new CrawlerRpcClient();
			return rcpClient;
		} else {
			return rcpClient;
		}
	}

	public boolean initConnect(Object objParam) {
		strRpcURL = (String) objParam;
		if (strRpcURL == null || strRpcURL.length() == 0)
			return false;
		mConfig = new XmlRpcClientConfigImpl();
		try {
			mConfig.setServerURL(new URL(strRpcURL));
			mConfig.setEnabledForExtensions(true);
//			mConfig.setConnectionTimeout(CONNECTION_TIME);
//			mConfig.setReplyTimeout(REPLY_TIME);
			mClient = new XmlRpcClient();
			mClient.setTransportFactory(new XmlRpcCommonsTransportFactory(mClient));
			mClient.setConfig(mConfig);
		} catch (MalformedURLException e) {
			LOGGER.error("initConnect error with rpcUrl:{}" ,strRpcURL);
			return false;
		}
		return true;
	}

	public Object execute(String strMethod, Object[] args) {

		if (strMethod == null || strMethod.length() == 0)
			return null;
		if (mClient == null)
			return null;
		Object objRet = null;
		try {
			objRet = mClient.execute(strMethod, args);
		} catch (XmlRpcException e) {
			LOGGER.error("Rpcservice for Method:{}",strMethod,e);
		}
		return objRet;
	}

	public Object crawl(long userId, long companyId, String username, String password) {
		LOGGER.debug("crawl for userId:{},companyId:{},username:{}" ,userId,companyId,username);
		Object[] objParams = new Object[] {userId,companyId,username,password};
		return execute("COLLECT.crawl", objParams);
	}
	
	public Object collect(String info) {
		Object[] objParams = new Object[] {info};
		return execute("COLLECT.collect", objParams);
	}
	
	public Object sprider(long company_id, String url, int depth, int maxThreads, String regexp, String type) {
		LOGGER.debug("sprider for company_id:{},url:{},depth:{}" ,company_id,url,depth);
		Object[] objParams = new Object[] {company_id,url,depth,maxThreads,regexp,type};
		return execute("COLLECT.sprider", objParams);
	}
	public static void main(String[] args) {
//		CrawlerRpcClient.getInstance().collect("{\"channel_id\":0,\"company_id\":1,\"user_id\":1,\"type\":\"新闻\",\"url\":\"http://list1.mysteel.com/article/p-585-------------1.html\",\"username\":\"hzbsc888\",\"password\":\"zt8771779\",\"index\":\"4\",\"batch\":\"11452627115925\"}");
//		CrawlerRpcClient.getInstance().collect("{\"channel_id\":9,\"company_id\":1,\"user_id\":1,\"type\":\"新闻\",\"url\":\"http://list1.mysteel.com/article/p-12----0101---------1.html\",\"username\":\"hzbsc888\",\"password\":\"zt8771779\",\"batch\":\"11452029888206\"}");
		CrawlerRpcClient.getInstance().crawl(1, 1, "hzbsc888","zt8771779");
//		String result=(String) CrawlerRpcClient.getInstance().sprider(1,"http://www.mysteel.com/", 2, 5, ".*?mysteel.com/article/.*?\\--------1.html", "新闻");
//		System.out.println(result);
	}
}
