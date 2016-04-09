package com.dca.proxyService;

import java.io.Serializable;

public class ProxyIP implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -917206606024687863L;
	private String host;
	private int port;
	
	public ProxyIP() {}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}
	
	
}
