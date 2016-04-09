package com.dca.proxyService;

import java.net.MalformedURLException;
import java.net.URL;

import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.client.XmlRpcClient;
import org.apache.xmlrpc.client.XmlRpcClientConfigImpl;
import org.apache.xmlrpc.client.XmlRpcCommonsTransportFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProxyRpcClient {
	static final int CONNECTION_TIME=60 * 1000;
	static final int REPLY_TIME=60 * 1000;
	private static ProxyRpcClient rcpClient = null;
	private String strRpcURL = "";
	private XmlRpcClientConfigImpl mConfig = null;
	public  boolean bConnSucess = true;
	private XmlRpcClient mClient = null;
	static final String rpcUrl="http://127.0.0.1:9091/proxyServer";

	private ProxyRpcClient() {
		initConnect(rpcUrl);
	}

	public static ProxyRpcClient getInstance() {
		if (rcpClient == null) {
			rcpClient = new ProxyRpcClient();
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
			mConfig.setConnectionTimeout(CONNECTION_TIME);
			mConfig.setReplyTimeout(REPLY_TIME);
			mClient = new XmlRpcClient();
			mClient.setTransportFactory(new XmlRpcCommonsTransportFactory(mClient));
			mClient.setConfig(mConfig);
		} catch (MalformedURLException e) {
			System.err.println("initConnect error with rpcUrl:"+strRpcURL);
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
			e.printStackTrace();
		}
		return objRet;
	}

	public ProxyIP getProxy() {
		Object[] objParams = new Object[] {};
		return (ProxyIP) execute("RpcInterface.getProxy", objParams);
	}

	public static void main(String[] args) {
		ProxyRpcClient.getInstance().getProxy();
	}
}
