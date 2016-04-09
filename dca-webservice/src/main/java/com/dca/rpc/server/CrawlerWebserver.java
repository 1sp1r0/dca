package com.dca.rpc.server;

import java.io.IOException;

import org.apache.xmlrpc.XmlRpcException;
import org.apache.xmlrpc.server.PropertyHandlerMapping;
import org.apache.xmlrpc.server.XmlRpcServer;
import org.apache.xmlrpc.server.XmlRpcServerConfigImpl;
import org.apache.xmlrpc.webserver.WebServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CrawlerWebserver{
	private static final Logger LOGGER = LoggerFactory.getLogger(CrawlerWebserver.class);
	private WebServer webServer;
	private XmlRpcServer xmlRpcServer;
	private PropertyHandlerMapping phm;
	private	XmlRpcServerConfigImpl serverConfig;
	private int port;
	private static CrawlerWebserver rpcServer=null;
	
	public CrawlerWebserver(int port,String server_name){
		this.port=port;
		init(port);
		try {
			regeditMethod("COLLECT", com.dca.rpc.server.RpcHanlder.class);
			startRpcServer();
			LOGGER.debug("Webservice server_name:{},port:{},start success",server_name,port);
		} catch (XmlRpcException e) {
			LOGGER.error("Webservice server_name:{},port:{},start fail",server_name,port,e);
			e.printStackTrace();
		} catch (IOException e) {
			LOGGER.error("Webservice server_name:{},port:{},start fail",server_name,port,e);
			e.printStackTrace();
		}
	}
	
	public static CrawlerWebserver getInstance(int port,String server_name){
		if(rpcServer==null){
			rpcServer = new CrawlerWebserver(port,server_name);
		}
		return rpcServer;
	}
	
	private void initServer(int port){
		this.webServer = new WebServer(port);
		this.xmlRpcServer = webServer.getXmlRpcServer();
		this.phm = new PropertyHandlerMapping ();
	}
	
	/**
	 * 初始化端口
	 * @param port
	 */
	private void init(int port){
		this.port = port;
		this.initServer(port);
	
	}
	
	/**
	 * 初始化端口
	 * @param port
	 */
	private void init(){
		this.initServer(port);
	}
	
	/**
	 * 注册执行类到rpc服务当中
	 * @param strExcuteClass
	 * @param arg1
	 * @throws XmlRpcException
	 */
	private void regeditMethod(String strExcuteClass,Class arg1 ) throws XmlRpcException{
		phm.addHandler(strExcuteClass,arg1);

		xmlRpcServer.setHandlerMapping(phm);
		serverConfig = (XmlRpcServerConfigImpl) xmlRpcServer.getConfig();
		
		serverConfig.setEnabledForExtensions(true);
		serverConfig.setContentLengthOptional(false);
	}
	
	/**
	 * 启动rpc的服务
	 * @throws IOException
	 */
	private void startRpcServer() throws IOException{
		webServer.start();
	}
	
	/**
	 * 关闭服务
	 * @throws IOException
	 */
	private void shutdownRpcServer() throws IOException{
		webServer.shutdown();
	}

	public static void main(String[] args) {
		if(args.length<1){
			System.out.println("参数个数不正确");
		}
		String strPort=args[0];
		String server_name = "webService";
		CrawlerWebserver.getInstance(Integer.parseInt(strPort),server_name);
	}
}
