package com.dca.proxyService;

import org.springframework.stereotype.Component;

@Component("proxyService")
public class ProxyServiceImpl implements Proxyservice {

	public ProxyIP getProxy() {
		// TODO Auto-generated method stub
		return ProxyRpcClient.getInstance().getProxy();
	}
}
