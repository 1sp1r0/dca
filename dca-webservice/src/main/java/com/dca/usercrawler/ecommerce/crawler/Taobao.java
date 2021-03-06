package com.dca.usercrawler.ecommerce.crawler;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.dca.exceptions.CrawlerException;
import com.dca.htmlutil.HtmlAnalyze;
import com.dca.usercrawler.ecommerce.BaseEcommerceComplexCrawler;
import com.dca.util.DateUtil;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.HttpMethod;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebResponseData;
import com.gargoylesoftware.htmlunit.html.HtmlButton;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlPasswordInput;
import com.gargoylesoftware.htmlunit.html.HtmlTextInput;
import com.gargoylesoftware.htmlunit.util.NameValuePair;
import com.gargoylesoftware.htmlunit.util.WebConnectionWrapper;

@Component("taobao")
public class Taobao extends BaseEcommerceComplexCrawler {

	private static final String LOGIN_PAGE = "https://login.taobao.com/member/login.jhtml";

	private Map<String, String> javascripts = new HashMap<String, String>();

	protected BrowserVersion getBrowserVersion() {
		BrowserVersion browserVersion = BrowserVersion.FIREFOX_38.clone();
		browserVersion.setUserAgent(
				"Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5");
		return browserVersion;
	}

	@PostConstruct
	protected void postConstruct() {
		final String pathPrefix = "classpath:taobao/";
		Map<String, String> jsMappings = new HashMap<String, String>();
		jsMappings.put("https://g.alicdn.com/kissy/k/1.4.4/seed-min.js", pathPrefix + "seed-min.js");
		jsMappings.put("https://g.alicdn.com/tb/login/0.5.11/js/login/nlogin.js?t=20151220",
				pathPrefix + "nlogin-0.5.11.js");
		jsMappings.put("https://g.alicdn.com/sd/ncpc/nc.js?t=" + DateUtil.getYYMMDDdate(new Date(), "yyyyMMddhh"),
				pathPrefix + "ncpc-nc.js");
		jsMappings.put("https://g.alicdn.com/alilog/mlog/aplus_v2.js", pathPrefix + "aplus_v2.js");
		jsMappings.put("https://af.alicdn.com/js/uac.js?_t=202764", pathPrefix + "uac.js");
		jsMappings.put("https://g.alicdn.com/security/umscript/3.2.1/um.js", pathPrefix + "um-3.2.1.js");
		jsMappings.put("https://g.alicdn.com/tb/login/0.5.11/js/??client.js,atp.js?t=20130528",
				pathPrefix + "client-atp.js");
		jsMappings.put("https://g.alicdn.com/sd/pointman/js/pt2.js?_=405528", pathPrefix + "pt2.js");
		jsMappings.put(
				"https://g.alicdn.com/kissy/k/1.4.4/??node-min.js,dom/base-min.js,event/dom/base-min.js,event/base-min.js,event/dom/shake-min.js,event/dom/focusin-min.js,anim-min.js,anim/base-min.js,promise-min.js,anim/timer-min.js,anim/transition-min.js",
				pathPrefix + "node-min.js");
		jsMappings.put("https://g.alicdn.com/kissy/k/1.4.4/??event-min.js,event/custom-min.js",
				pathPrefix + "event-min.js");
		jsMappings.put("https://g.alicdn.com/alilog/s/6.1.5/aplus_v2.js", pathPrefix + "alilog-aplus_v2.js");
		jsMappings.put("https://af.alicdn.com/js/cj/61.js", pathPrefix + "cj-61.js");
		jsMappings.put("https://g.alicdn.com/security/umscript/3.2.2/um.js", pathPrefix + "umscript-um.js");
		jsMappings.put("https://g.alicdn.com/pecdn/mlog/agp_heat.min.js?t=202764", pathPrefix + "agp_heat.min.js");
		jsMappings.put("https://g.alicdn.com/kissy/k/1.4.4/??io-min.js,cookie-min.js",
				pathPrefix + "io-min-cookie-min.js");
		jsMappings.put("https://g.alicdn.com/kg/??rsa/2.0.1/index-min.js?t=1358514278.js",
				pathPrefix + "index-min-1358514278-2.0.1.js");
		jsMappings.put("https://g.alicdn.com/kg/??slide/2.0.2/index-min.js?t=1358514278.js",
				pathPrefix + "index-min-1358514278-2.0.2.js");

		jsMappings.put("https://g.alicdn.com/security/umscript/3.2.1/um.js#2", pathPrefix + "um_2.js");
		jsMappings.put("https://g.alicdn.com/security/umscript/3.2.2/um.js#2", pathPrefix + "um-3.2.2_2.js");

		jsMappings.put("https://g.alicdn.com/secdev/entry/index.js?t=202764", pathPrefix + "index-202764.js");
		jsMappings.put("https://g.alicdn.com/sd/data_sufei/1.5.1/aplus/index.js", pathPrefix + "aplus-index-1.5.1.js");
		jsMappings.put("https://g.alicdn.com/kissy/k/1.4.2/seed-min.js", pathPrefix + "seed-min-1.4.2.js");
		jsMappings.put("https://g.alicdn.com/tb/login/0.4.7/js/login/synchavana.js?t=20131120",
				pathPrefix + "synchavana.js");
		jsMappings.put("https://g.alicdn.com/alilog/mlog/xwj_heat.js?v=151116b", pathPrefix + "xwj_heat.js");
		jsMappings.put("https://g.alicdn.com/??kissy/k/1.4.14/seed-min.js,tb/global/3.5.30/global-min.js",
				pathPrefix + "seed-min-global.js");
		jsMappings.put("https://g.alicdn.com/tb/mtbframe/1.0.3/components/common/base.js",
				pathPrefix + "components-common-base.js");

		jsMappings.put(
				"https://g.alicdn.com/tb/??mytaobao/2016.02.14/components/common/package-config.js,mytaobao/2016.02.14/deps.js",
				pathPrefix + "package-config.js");
		try {
			for (Map.Entry<String, String> entry : jsMappings.entrySet()) {
				File jsFile = ResourceUtils.getFile(entry.getValue());

				javascripts.put(entry.getKey(), FileUtils.readFileToString(jsFile, "utf-8"));
			}
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		}
	}

	@Override
	protected LoginData tryLoginUser(long userId, long companyId, String username, String password, WebClient client)
			throws Exception {

		LoginData loginData=new LoginData();
		CustomWebConnectionWrapper webConnWrapper = new CustomWebConnectionWrapper(client);
		client.setWebConnection(webConnWrapper);

		HtmlPage loginPage = client.getPage(LOGIN_PAGE);

		int jobs = client.waitForBackgroundJavaScript(10000);
		Document doc = Jsoup.parse(loginPage.asXml());
		String ua = doc.select("input#UA_InputId").attr("value");
		List<NameValuePair> verifyCodeParams = new ArrayList<NameValuePair>();
		verifyCodeParams.add(new NameValuePair("username", username));
		verifyCodeParams.add(new NameValuePair("ua", ua));

		WebRequest isneedverifyCodeRequest = new WebRequest(
				new URL("https://login.taobao.com/member/request_nick_check.do?_input_charset=utf-8"), HttpMethod.POST);
		WebResponse isneedverifyCodeResponse = client.loadWebResponse(isneedverifyCodeRequest);
		String response = isneedverifyCodeResponse.getContentAsString();
		if ("eyJuZWVkY29kZSI6dHJ1ZX0=".equals(response)) {
			// {"needcode":true}
			System.out.println("需要验证码");
			loginData.setSuccessful(false);
			loginData.setError("需要验证码");
			return loginData;
		}

		HtmlForm loginForm = (HtmlForm) loginPage.querySelector("form#J_Form");
		// getLogger().debug("The login form: {}", loginForm);

		// now enter username & pwd to login
		HtmlTextInput nameInput = (HtmlTextInput) loginPage.querySelector("#TPL_username_1");
		nameInput.focus();
		nameInput.setValueAttribute(username);
		nameInput.blur();

		HtmlPasswordInput pwdInput = (HtmlPasswordInput) loginPage.querySelector("#TPL_password_1");
		pwdInput.focus();
		pwdInput.setValueAttribute(password);
		pwdInput.blur();

		HtmlButton buttonInput = (HtmlButton) loginPage.querySelector("#J_SubmitStatic");

		client.waitForBackgroundJavaScript(10000);
		HtmlPage mainPage = buttonInput.click();

		System.out.println(mainPage.asXml());
		if (mainPage.asXml().toString().indexOf("gotoURL:\"") > -1) {
			loginData.setSuccessful(true);
			return loginData;
		} else {
			loginData.setSuccessful(false);
			loginData.setError("验证失败");
			return loginData;
		}
	}

	/**
	 * 数据采集解析（具体实施过程中要细分 降耦）
	 * 
	 * @throws Exception
	 */
	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, WebClient client) throws Exception {
		// https://member1.taobao.com/member/fresh/deliver_address.htm
		JSONObject data_json = new JSONObject();
		data_json.put("type", "TB");
		HtmlPage addressPage = client.getPage("https://member1.taobao.com/member/fresh/deliver_address.htm");
		Document doc = Jsoup.parse(addressPage.asXml());
		Elements addElements = doc.select("div.tbl-deliver-address table.tbl-main tr");
		if (addElements == null) {
			data_json.put("addressList", new JSONArray());
		} else {
			String[] headInfos = { "consigner", "location", "address", "", "phone" };
			JSONObject detail = null;
			JSONArray address_array = new JSONArray();
			for (int i = 1; i < addElements.size(); i++) {
				Elements details = addElements.get(i).select("td");
				detail = new JSONObject();
				for (int j = 0; j < headInfos.length; j++) {
					if (j == 3) {
						continue;
					}
					detail.put(headInfos[j], details.get(j).text().trim());
				}
				// 默认？
				if (details.toString().indexOf("默认地址") > -1) {
					detail.put("is_default", "1");
				} else {
					detail.put("is_default", "0");
				}
				detail.put("fixed_phone", "");
				detail.put("email", "");
				if (detail.has("consigner"))
					address_array.put(detail);
			}
			data_json.put("addressList", address_array);
		}

		crawlerBuylist(client, data_json);
		return null;
	}

	private void crawlerBuylist(WebClient webClient, JSONObject data_json)
			throws FailingHttpStatusCodeException, MalformedURLException, IOException {
		HtmlPage mainPage = webClient.getPage("https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm");
		String avalidContent = HtmlAnalyze.getTagInfo(mainPage.asXml(), "var data =", "</script>");
		JSONObject conentJson = new JSONObject(avalidContent);
		//获取订单信息
		JSONArray orderArray = conentJson.getJSONArray("mainOrders");
		JSONArray buyArray = new JSONArray();
		for (Object object : orderArray) {
			JSONObject orderObject = (JSONObject) object;
			JSONObject json = new JSONObject();
			// 交易时间
			JSONObject orderInfo = orderObject.getJSONObject("orderInfo");
			String dealtime = orderInfo.getString("createTime");
			json.put("dealtime", dealtime);
			// 交易号
			String number = orderObject.getString("id");
			json.put("number", number);
			// 实际支付
			String actualFee = orderObject.getJSONObject("payInfo").getString("actualFee");
			json.put("actualFee", actualFee);

			if (orderObject.getJSONObject("payInfo").has("postFees")) {
				// 实体订单
				String orderDetailUrl = "http:" + orderObject.getJSONObject("statusInfo").getJSONArray("operations")
						.getJSONObject(0).getString("url");
				WebRequest orderDetailRequest = new WebRequest(new URL(orderDetailUrl), HttpMethod.GET);

				WebResponse orderDetailResponse = webClient.loadWebResponse(orderDetailRequest);
				String orderdetailPage = orderDetailResponse.getContentAsString();
				String content = HtmlAnalyze.getTagInfo(orderdetailPage, "收货地址：</td>", "</td>");
				String[] addressInfos = HtmlAnalyze.deleteTag(content).split("，");
				if (addressInfos.length > 3) {
					json.put("consigner", addressInfos[0].trim());
					json.put("address", addressInfos[3].trim());
					json.put("phone", addressInfos[1].trim());
				} else {
					json.put("consigner", "");
					json.put("address", "");
					json.put("phone", "");
				}
			} else {
				//虚拟订单
				json.put("consigner", "");
				json.put("address", "");
				json.put("phone", "");
			}
			// 状态
			String orderstatus = ((JSONObject) orderObject.get("statusInfo")).getString("text").trim();
			json.put("orderstatus", orderstatus);
			JSONArray buyChildrenArray = new JSONArray();
			JSONArray subOrdersArray = orderObject.getJSONArray("subOrders");
			for (Object object2 : subOrdersArray) {
				JSONObject buyChildjson = (JSONObject) object2;
				if (!buyChildjson.has("id") || buyChildjson.getLong("id") == -1) {
					continue;
				}
				JSONObject jsonP = new JSONObject();
				// 交易号
				number = String.valueOf(buyChildjson.getLong("id"));
				jsonP.put("number", number);
				JSONObject itemInfo = (JSONObject) buyChildjson.get("itemInfo");
				jsonP.put("productId", itemInfo.getLong("id"));
				jsonP.put("name", itemInfo.getString("title"));
				jsonP.put("dealtime", dealtime);
				if (!itemInfo.has("itemUrl")) {
					jsonP.put("wareUrl", "");
				} else {
					jsonP.put("wareUrl", "http:" + itemInfo.getString("itemUrl"));
				}

				jsonP.put("imgPath", "http:" + itemInfo.getString("pic"));
				// 数量
				jsonP.put("quantity", buyChildjson.getString("quantity"));
				buyChildrenArray.put(jsonP);
			}
			json.put("productItems", buyChildrenArray);
			buyArray.put(json);
		}
		data_json.put("orderItems", buyArray);
		System.out.println(data_json);
	}

	private class CustomWebConnectionWrapper extends WebConnectionWrapper {

		private WebClient webClient;
		
		public CustomWebConnectionWrapper(WebClient webClient) {
			super(webClient);
			this.webClient = webClient;
		}

		public WebResponse getResponse(WebRequest request) throws IOException {
			String requestURL = request.getUrl().toExternalForm();
			String localScript = javascripts.get(requestURL);
			if (localScript != null) {
				WebResponseData data = new WebResponseData(localScript.getBytes("utf-8"), 200, "", JAVASCRIPT_HEADERS);
				return new UTF8WebResponse(data, request, 0);
			}
			WebResponse response = null;
			IOException ioe = null;
			final int RETRY_TIME = 3;
			for (int i = 0; i < RETRY_TIME; ++i) {
				try {
					response = super.getResponse(request);
					ioe = null;
					break;
				} catch (IOException ex) {
					ioe = ex;
				}
			}
			if (ioe != null) {
				throw ioe;
			}
			return response;
		}
	}

}
