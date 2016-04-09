package com.dca.http;

import java.io.File;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.net.ssl.SSLContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.NameValuePair;
import org.apache.http.client.RedirectStrategy;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.routing.HttpRoutePlanner;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.cookie.Cookie;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.impl.conn.BasicHttpClientConnectionManager;
import org.apache.http.impl.conn.DefaultProxyRoutePlanner;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.dca.exceptions.CrawlerException;
import com.dca.exceptions.UnaccessiblePageCrawlerException;
import com.dca.proxyService.ProxyIP;
import com.dca.proxyService.Proxyservice;

public class CrawlerClient {
	private static final Logger LOGGER = LoggerFactory.getLogger(CrawlerClient.class);

	private static final int CONNECT_TIMEOUT = 6 * 1000;
	private static final int SOCKET_TIMEOUT = 12 * 1000;
	private static final int CONNECTION_REQUEST_TIMEOUT = 6 * 1000;

	private CloseableHttpClient httpClient;
	private final Proxyservice proxyService;
	private DynamicProxyRoutePlanner proxyRoutePlanner;
	private Boolean SSLProtocols;

	private BasicCookieStore cookieStore;

	private RequestConfig requestConfig;
	
	private HttpClientConnectionManager connManager;

	private Map<String, String> headerParams = new HashMap<String, String>();

	public CrawlerClient(boolean cookieEnabled) {
		this(null,cookieEnabled, false, null);
	}
	public CrawlerClient(Proxyservice proxyService) {
		this(proxyService,false, false, null);
	}

	public CrawlerClient(Proxyservice proxyService,boolean cookieEnabled) {
		this(proxyService,cookieEnabled, false, null);
	}

	public CrawlerClient(Proxyservice proxyService,boolean cookieEnabled, Map<String, String> headers) {
		this(proxyService,cookieEnabled, false, headers);
	}

	public CrawlerClient(Proxyservice proxyService,boolean cookieEnabled, boolean poolingHttpManager,
			Map<String, String> headers) {
		this(new ConstructParams(proxyService,cookieEnabled, poolingHttpManager, headers));
	}

	public CrawlerClient(ConstructParams params) {
		this.proxyService = params.proxyService;
		this.SSLProtocols=params.SSLProtocols;
		Builder requestBuilder = RequestConfig
				.custom()
				.setSocketTimeout(params.socketTimeout == null ? SOCKET_TIMEOUT : params.socketTimeout)
				.setConnectTimeout(params.connectTimeout == null ? CONNECT_TIMEOUT : params.connectTimeout)
				.setConnectionRequestTimeout(
						params.connectionRequestTimeout == null ? CONNECTION_REQUEST_TIMEOUT
								: params.connectionRequestTimeout);
		if (params.allowCircularRedirect != null && params.allowCircularRedirect) {
			requestBuilder.setCircularRedirectsAllowed(true);
		}
		
		requestConfig = requestBuilder.build();
		

		HttpClientBuilder builder = HttpClients.custom();
		boolean cookieEnabled = params.cookieEnabled == null ? false : params.cookieEnabled;
		if (cookieEnabled) {
			cookieStore = new BasicCookieStore();
			builder.setDefaultCookieStore(cookieStore);
		}
		
		boolean poolingHttpManager = params.poolingHttpManager == null ? false : params.poolingHttpManager;
		
		if (poolingHttpManager) {
			PoolingHttpClientConnectionManager poolingConnManager = new PoolingHttpClientConnectionManager();
			poolingConnManager.setDefaultMaxPerRoute(10);
			poolingConnManager.setMaxTotal(10);
			connManager = poolingConnManager;
		} else {
			connManager = new BasicHttpClientConnectionManager();
		}
		if (this.proxyService != null) {
			proxyRoutePlanner = new DynamicProxyRoutePlanner();
			builder.setRoutePlanner(proxyRoutePlanner);
		}

		List<Header> newHeaders = (params.useDefaultHeaders != null && !params.useDefaultHeaders) ? new ArrayList<Header>()
				: new ArrayList<Header>(CrawlerHelper.getDefaultHeaders());

		if (params.headers != null && !params.headers.isEmpty()) {
			for (Map.Entry<String, String> entry : params.headers.entrySet()) {
				newHeaders.add(new BasicHeader(entry.getKey(), entry.getValue()));
			}
		}

		if (params.autoRedirect != null && params.autoRedirect) {
			builder.setRedirectStrategy(new LaxRedirectStrategy());
		}
		
		if (params.redirectStrategy != null) {
			builder.setRedirectStrategy(params.redirectStrategy);
		}

		if(SSLProtocols==null||SSLProtocols){
			httpClient = builder.setDefaultHeaders(newHeaders).setConnectionManager(connManager).setDefaultRequestConfig(requestConfig).build();
			
		}else{
			SSLContext sslContext = null;
			try {
				sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				    //信任所有
				    public boolean isTrusted(X509Certificate[] chain,String authType) throws CertificateException {
				        return true;
				    }
				}).build();
			} catch (KeyManagementException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (KeyStoreException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
	        httpClient = HttpClients.custom().setSSLSocketFactory(sslsf).setDefaultHeaders(newHeaders).setConnectionManager(connManager)
					.setDefaultRequestConfig(requestConfig).build();
		}
		if (this.proxyService != null) {
			changeProxy();
		}
	}

	

	public void addCookie(Cookie cookie) {
		this.cookieStore.addCookie(cookie);
	}

	public void printCookies() {
		StringBuilder text = new StringBuilder();
		List<Cookie> cookies = this.cookieStore.getCookies();
		for (Cookie cookie : cookies) {
			text.append(cookie.getName() + "=" + cookie.getValue() + ";");
		}
		LOGGER.debug("The cookies are: {}", cookieStore.toString());
	}

	public List<Cookie> getCookies() {
		return this.cookieStore.getCookies();
	}

	public ProxyIP changeProxy() {
		if (this.proxyService == null)
			return null;

		LOGGER.debug("Start to get proxy.");
		ProxyIP proxyIP = proxyService.getProxy();
		System.out.println("proxyIP:"+proxyIP);
		LOGGER.debug("Retrieved proxy: {}:{}", proxyIP.getHost(), proxyIP.getPort());
		HttpHost proxy = new HttpHost(proxyIP.getHost(), proxyIP.getPort(), "http");
		proxyRoutePlanner.setProxy(proxy);
		return proxyIP;
	}
	public String getPageInner(String pageUrl, String encoding) {
		LOGGER.debug("Crawl getPage: {}", pageUrl);
		HttpGet httpGet = new HttpGet(pageUrl);

		if (this.getHeaderParams() != null)
			pushParamsToHeader(httpGet);

		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(httpGet);
			CrawlerHelper.checkResponseStatus(response);

			String page = EntityUtils.toString(response.getEntity(), StringUtils.isBlank(encoding) ? CrawlerHelper.CHARSET : encoding);
			if(StringUtils.isBlank(page)){
				throw new CrawlerException("Error to get webPage by url");
			}
			return page;
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(response);
		}
	}

	public String getPage(String pageUrl, String encoding) {
		int maxRetry = 3;
		CrawlerException cause = null;
		int i = 0;
		do {

			try {
				return getPageInner(pageUrl, encoding);
			} catch (UnaccessiblePageCrawlerException ex) {
				maxRetry = 1;
				cause = ex;
				if (this.proxyService != null) {
					ProxyIP proxyIP = changeProxy();
					LOGGER.error("Retry {} with {}:{} to get page: {}", (i + 1), proxyIP.getHost(), proxyIP.getPort(),
							pageUrl, ex);
				}else
					LOGGER.error("Retry {}  to get page: {}", (i + 1), pageUrl, ex);
			} catch (CrawlerException ex) {
				maxRetry = 3;
				cause = ex;
				if (this.proxyService != null) {
					ProxyIP proxyIP = changeProxy();
					LOGGER.error("Retry {} with {}:{} to get page: {}", (i + 1), proxyIP.getHost(), proxyIP.getPort(),
							pageUrl, ex);
				}else
					LOGGER.error("Retry {}  to get page: {}", (i + 1), pageUrl, ex);
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	public String getPage(String pageUrl) {
		return getPage(pageUrl, CrawlerHelper.CHARSET);
	}

	public void savePicture(String pictureUrl, File newFile) {
		LOGGER.debug("Save picture: {} to {}", pictureUrl, newFile.getName());
		int maxRetry = 5;
		CrawlerException cause = null;
		int i = 0;
		do {
			try {
				savePictureInner(pictureUrl, newFile);
				return;
			} catch (CrawlerException ex) {
				cause = ex;
				
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	private void savePictureInner(String pictureUrl, File newFile) {

		HttpGet httpGet = new HttpGet(pictureUrl);

		CloseableHttpResponse response = null;
		InputStream input = null;
		try {
			response = httpClient.execute(httpGet);
			CrawlerHelper.checkResponseStatus(response);
			input = response.getEntity().getContent();
			FileUtils.copyInputStreamToFile(input, newFile);
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(input);
			CrawlerHelper.close(response);
		}
	}

	public byte[] getPicture(String pictureUrl) {
		LOGGER.debug("Get picture: {} to {}", pictureUrl);
		int maxRetry = 5;
		CrawlerException cause = null;
		int i = 0;
		do {
			try {
				return getPictureInner(pictureUrl);
			} catch (CrawlerException ex) {
				cause = ex;
				LOGGER.error("Retry {}  to get page: {}", (i + 1), pictureUrl, ex);
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	private byte[] getPictureInner(String pictureUrl) {
		HttpGet httpGet = new HttpGet(pictureUrl);

		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(httpGet);
			CrawlerHelper.checkResponseStatus(response);
			return EntityUtils.toByteArray(response.getEntity());
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(response);
		}
	}

	public String postPage(String pageUrl, Map<String, String> parameters, String encoding) {
		LOGGER.debug("Crawl postPage: {}", pageUrl);
		int maxRetry = 5;
		int i = 0;
		CrawlerException cause = null;
		do {
			try {
				return postPageInner(pageUrl, parameters, encoding);
			} catch (CrawlerException ex) {
				cause = ex;

				if (this.proxyService != null) {
					ProxyIP proxyIP = changeProxy();
					LOGGER.error("Retry {} with {}:{} to get page: {}", (i + 1), proxyIP.getHost(), proxyIP.getPort(),
							pageUrl, ex);
				}
				
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	public String postPage(String pageUrl, Map<String, String> parameters) {
		return postPage(pageUrl, parameters, CrawlerHelper.CHARSET);
	}

	public String postPageBody(String pageUrl, String requestBody) {
		int maxRetry = 5;
		int i = 0;
		CrawlerException cause = null;
		do {
			try {
				return postPageBodyInner(pageUrl, requestBody);
			} catch (CrawlerException ex) {
				cause = ex;
				if (this.proxyService != null) {
					ProxyIP proxyIP = changeProxy();
					LOGGER.error("Retry {} with {}:{} to get page: {}", (i + 1), proxyIP.getHost(), proxyIP.getPort(),
							pageUrl, ex);
				}
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	public String getPage(String pageUrl, Map<String, String> parameters) {
		int maxRetry = 5;
		int i = 0;
		CrawlerException cause = null;
		do {
			try {
				return getPageInner(pageUrl, parameters);
			} catch (CrawlerException ex) {
				cause = ex;
				if (this.proxyService != null) {
					ProxyIP proxyIP = changeProxy();
					LOGGER.error("Retry {} with {}:{} to get page: {}", (i + 1), proxyIP.getHost(), proxyIP.getPort(),
							pageUrl, ex);
				}
			}
			i++;
		} while (i < maxRetry);

		throw cause;
	}

	private String getPageInner(String pageUrl, Map<String, String> parameters) {
		StringBuilder params = new StringBuilder();
		int i = 1;
		for (Map.Entry<String, String> entry : parameters.entrySet()) {
			if (i == parameters.size()) {
				params.append(entry.getKey())
				.append("=")
				.append(entry.getValue());
				
			} else {
				params.append(entry.getKey())
				.append("=")
				.append(entry.getValue())
				.append("&");
			}
			i++;
		}
		HttpGet httpGet = new HttpGet(pageUrl + "?" + params);

		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(httpGet);
			CrawlerHelper.checkResponseStatus(response);

			String page = response.getEntity() == null ? "" : EntityUtils.toString(response.getEntity(), CrawlerHelper.CHARSET);
			
			return page;
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(response);
		}
	}

	public String postPageInner(String pageUrl, Map<String, String> parameters) {
		return postPage(pageUrl, parameters, CrawlerHelper.CHARSET);
	}

	public String postPageInner(String pageUrl, Map<String, String> parameters, String encoding) {

		List<NameValuePair> postParams = new ArrayList<NameValuePair>();
		if (parameters != null) {
			for (Map.Entry<String, String> entry : parameters.entrySet()) {
				postParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
			}
		}
		return postPageInner(pageUrl, postParams, encoding);
	}

	public String postPageInner(String pageUrl, List<NameValuePair> postParams, String encoding) {
		// create post request
		HttpPost httpPost = new HttpPost(pageUrl);
		if (this.getHeaderParams() != null)
			pushParamsToHeader(httpPost);
		String myEncoding = StringUtils.isBlank(encoding) ? CrawlerHelper.CHARSET : encoding;
		CloseableHttpResponse response = null;
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(postParams, myEncoding));
			response = httpClient.execute(httpPost);
			CrawlerHelper.checkResponseStatus(response);
			String page = response.getEntity() == null ? "" : EntityUtils.toString(response.getEntity(), myEncoding);
			return page;
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(response);
		}
	}

	private String postPageBodyInner(String pageUrl, String requestBody) {
		HttpPost httpPost = new HttpPost(pageUrl);

		CloseableHttpResponse response = null;
		try {
			httpPost.setEntity(new StringEntity(requestBody, CrawlerHelper.CHARSET));
			response = httpClient.execute(httpPost);
			CrawlerHelper.checkResponseStatus(response);

			String page = EntityUtils.toString(response.getEntity(), CrawlerHelper.CHARSET);
			return page;
		} catch (CrawlerException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		} finally {
			CrawlerHelper.close(response);
		}
	}

	public void dispose() {
		CrawlerHelper.close(httpClient);
		if (connManager != null) {
			try {
				connManager.shutdown();
			} catch (Exception ex) {
				// ignore
			}
		}
	}

	public void pushParamsToHeader(HttpGet httpGet) {
		Map<String, String> param = this.getHeaderParams();
		for (Map.Entry<String, String> entry : param.entrySet()) {
			httpGet.addHeader(entry.getKey(), entry.getValue());
		}
	}

	public void pushParamsToHeader(HttpPost httpPost) {
		Map<String, String> param = this.getHeaderParams();
		for (Map.Entry<String, String> entry : param.entrySet()) {
			httpPost.addHeader(entry.getKey(), entry.getValue());
		}
	}
	
	private static class DynamicProxyRoutePlanner implements HttpRoutePlanner {

		private DefaultProxyRoutePlanner defaultProxyRoutePlanner = null;

		public DynamicProxyRoutePlanner() {
		}

		public void setProxy(HttpHost host) {
			this.defaultProxyRoutePlanner = new DefaultProxyRoutePlanner(host);
		}

		public HttpRoute determineRoute(HttpHost target, HttpRequest request, HttpContext context) throws HttpException {
			return this.defaultProxyRoutePlanner.determineRoute(target, request, context);
		}
	}

	public Map<String, String> getHeaderParams() {
		return headerParams;
	}

	public void setHeaderParams(Map<String, String> headerParams) {
		this.headerParams = headerParams;
	}

	public static class ConstructParams {
		private Proxyservice proxyService;
		private Boolean cookieEnabled;
		private Map<String, String> headers;
		private Boolean poolingHttpManager;
		private Integer connectTimeout;
		private Integer socketTimeout;
		private Integer connectionRequestTimeout;
		private RedirectStrategy redirectStrategy;
		private Boolean allowCircularRedirect;
		private Boolean autoRedirect;
		private Boolean useDefaultHeaders;
		private Boolean SSLProtocols;

		public ConstructParams() {
		}

		public ConstructParams(boolean cookieEnabled) {
			this.cookieEnabled = cookieEnabled;
		}
		
		public ConstructParams(Proxyservice proxyService,boolean cookieEnabled) {
			this.proxyService=proxyService;
			this.cookieEnabled = cookieEnabled;
		}

		public ConstructParams(Proxyservice proxyService,boolean cookieEnabled, boolean poolingHttpManager,
				Map<String, String> headers) {
			this.proxyService=proxyService;
			this.cookieEnabled = cookieEnabled;
			this.poolingHttpManager = poolingHttpManager;
			this.headers = headers;
		}

		public Proxyservice getProxyService() {
			return proxyService;
		}

		public void setProxyService(Proxyservice proxyService) {
			this.proxyService = proxyService;
		}

		public Boolean getCookieEnabled() {
			return cookieEnabled;
		}

		public void setCookieEnabled(Boolean cookieEnabled) {
			this.cookieEnabled = cookieEnabled;
		}

		public Map<String, String> getHeaders() {
			return headers;
		}

		public void setHeaders(Map<String, String> headers) {
			this.headers = headers;
		}

		public Boolean getPoolingHttpManager() {
			return poolingHttpManager;
		}

		public void setPoolingHttpManager(Boolean poolingHttpManager) {
			this.poolingHttpManager = poolingHttpManager;
		}

		public Integer getConnectTimeout() {
			return connectTimeout;
		}

		public void setConnectTimeout(Integer connectTimeout) {
			this.connectTimeout = connectTimeout;
		}

		public Integer getSocketTimeout() {
			return socketTimeout;
		}

		public void setSocketTimeout(Integer socketTimeout) {
			this.socketTimeout = socketTimeout;
		}

		public Integer getConnectionRequestTimeout() {
			return connectionRequestTimeout;
		}

		public void setConnectionRequestTimeout(Integer connectionRequestTimeout) {
			this.connectionRequestTimeout = connectionRequestTimeout;
		}

		public Boolean getAutoRedirect() {
			return autoRedirect;
		}

		public void setAutoRedirect(Boolean autoRedirect) {
			this.autoRedirect = autoRedirect;
		}

		public Boolean getUseDefaultHeaders() {
			return useDefaultHeaders;
		}

		public void setUseDefaultHeaders(Boolean useDefaultHeaders) {
			this.useDefaultHeaders = useDefaultHeaders;
		}

		public Boolean getAllowCircularRedirect() {
			return allowCircularRedirect;
		}

		public void setAllowCircularRedirect(Boolean allowCircularRedirect) {
			this.allowCircularRedirect = allowCircularRedirect;
		}

		public RedirectStrategy getRedirectStrategy() {
			return redirectStrategy;
		}

		public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
			this.redirectStrategy = redirectStrategy;
		}

		public Boolean getSSLProtocols() {
			return SSLProtocols;
		}

		public void setSSLProtocols(Boolean sSLProtocols) {
			SSLProtocols = sSLProtocols;
		}

	}
}
