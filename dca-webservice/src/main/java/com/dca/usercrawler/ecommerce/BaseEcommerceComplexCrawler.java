package com.dca.usercrawler.ecommerce;

import java.util.ArrayList;
import java.util.List;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.NicelyResynchronizingAjaxController;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebResponseData;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.util.NameValuePair;

public abstract class BaseEcommerceComplexCrawler extends BaseEcommerceCrawler {

	protected static final List<NameValuePair> JAVASCRIPT_HEADERS = new ArrayList<NameValuePair>();
	static {
		NameValuePair contentType = new NameValuePair("content-type", "application/javascript");
		JAVASCRIPT_HEADERS.add(contentType);
	}

	@Override
	protected WebClient createCrawlerClient() {
		WebClient webClient = new WebClient(getBrowserVersion());
		webClient.getOptions().setJavaScriptEnabled(true);
		webClient.getOptions().setCssEnabled(false);
		webClient.getOptions().setRedirectEnabled(true);
		webClient.getOptions().setThrowExceptionOnScriptError(false);
		webClient.getOptions().setThrowExceptionOnFailingStatusCode(true);
		webClient.getOptions().setTimeout(15000);
		webClient.getOptions().setSSLClientProtocols(new String[] { "SSLv3", "TLSv1" });
		// webClient.setAjaxController(new SynchronousAjaxController());

		return webClient;
	}

	protected BrowserVersion getBrowserVersion() {
		return BrowserVersion.FIREFOX_38;
	}

	protected static class UTF8WebResponse extends WebResponse {
		/**
		 * 
		 */
		private static final long serialVersionUID = -2083193339842636605L;

		public UTF8WebResponse(WebResponseData data, WebRequest request, long loadTime) {
			super(data, request, loadTime);
		}

		public String getContentCharset() {
			return "utf-8";
		}
	}

	@SuppressWarnings("unused")
	private static class SynchronousAjaxController extends NicelyResynchronizingAjaxController {
		/**
		 * 
		 */
		private static final long serialVersionUID = 8534352436729961735L;

		public boolean processSynchron(final HtmlPage page, final WebRequest settings, final boolean async) {
			return true;
		}
	}

	@Override
	protected LoginData tryLoginUser(long userId, long companyId, String username, String password, Object client)
			throws Exception {
		return tryLoginUser(userId, companyId, username, password, (WebClient) client);
	}

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, Object client) throws Exception {
		// TODO Auto-generated method stub
		return crawlAccountData(account, loginData, (WebClient) client);
	}

	protected abstract LoginData tryLoginUser(long userId, long companyId, String username, String password,
			WebClient client) throws Exception;

	protected abstract ResultData crawlAccountData(Account account, LoginData loginData, WebClient client)
			throws Exception;
}
