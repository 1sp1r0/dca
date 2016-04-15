package com.dca.usercrawler.ecommerce.crawler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.dca.exceptions.CrawlerException;
import com.dca.htmlutil.HtmlAnalyze;
import com.dca.http.CrawlerClient;
import com.dca.usercrawler.ecommerce.BaseEcommerceSimpleCrawler;
import com.dca.usercrawler.helpers.RetryData;

@Component("jingdong")
public class Jingdong extends BaseEcommerceSimpleCrawler {
	public final static String FIRST_REFERER_URL = "https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fwww.jd.com%2F";

	//账户名与密码不匹配，请重新输入
	public final static String ERROR_MESSAGE="\"pwd\":\"\\u8d26\\u6237\\u540d\\u4e0e\\u5bc6\\u7801\\u4e0d\\u5339\\u914d\\uff0c\\u8bf7\\u91cd\\u65b0\\u8f93\\u5165\"";
	@Override
	protected CrawlerClient createCrawlerClient() {
		// TODO Auto-generated method stub
		CrawlerClient.ConstructParams params = new CrawlerClient.ConstructParams(true);
		params.setAutoRedirect(true);
		params.setAllowCircularRedirect(true);
		CrawlerClient client = new CrawlerClient(params);
		return client;
	}

	@Override
	protected LoginData tryLoginUser(long userId, long companyId, String username, String password,
			CrawlerClient client) throws Exception {
		// TODO Auto-generated method stub
		LoginData loginData = new LoginData();

		RetryData retryData = new RetryData(client, username, password, FIRST_REFERER_URL, null,null);
		retryLogin(retryData, 3);
		if (retryData.successful) {
			loginData = new LoginData(true);
		} else {
			String errorMsg = StringUtils.isBlank(retryData.errorMsg) ? "登录失败" : retryData.errorMsg;
			loginData = new LoginData(errorMsg);
			if (errorMsg.contains("用户名或密码错误")) {
				loginData.setWrongPassword(true);
			}
		}
		return loginData;
	}

	private void retryLogin(RetryData retryData, int retry) throws Exception {
		boolean isNeedCode=false;
		LinkedHashMap<String, String> postMap = new LinkedHashMap<String, String>();
		postMap.put("loginName", retryData.username);
		String pageContent = retryData.client.postPage("https://passport.jd.com/uc/rememberMeCheck?r=" + Math.random() + "&version=2015", postMap);
		pageContent = retryData.client.postPage("https://passport.jd.com/uc/showAuthCode?r=" + Math.random() + "&version=2015", postMap);
		if(pageContent.indexOf("\"verifycode\":false")==-1){
			isNeedCode=true;
		}
		pageContent = retryData.client.getPage(FIRST_REFERER_URL);
		Document doc = Jsoup.parse(pageContent);
		Elements input_elements = doc.select("form#formlogin input");
		String uuid = input_elements.get(0).attr("value");
		String _t = input_elements.get(6).attr("value");
		String token_key = input_elements.get(7).attr("name");
		String token_value = input_elements.get(7).attr("value");
		String verify_code_url = doc.select("img#JD_Verification1").attr("src2");
		// 获取验证码
		LinkedHashMap<String, String> parametersMap = new LinkedHashMap<String, String>();
		parametersMap.put("uuid", uuid);
		parametersMap.put("machineNet", "");
		parametersMap.put("machineCpu", "");
		parametersMap.put("machineDisk", "");
		parametersMap.put("eid", "46c4cfa561114e59af82f203abb5f6f692197026");
		parametersMap.put("fp", "37606e7c7e1701d3a30fc0312529c98d");
		parametersMap.put("_t", _t);
		parametersMap.put(token_key, token_value);
		parametersMap.put("loginname", retryData.username);
		parametersMap.put("nloginpwd", retryData.password);
		parametersMap.put("loginpwd", retryData.password);
		parametersMap.put("chkRememberMe", "on");
		parametersMap.put("authcode", "");
		if(isNeedCode){
			retryData.imgUrl=verify_code_url;
			String verifyCode = getValidateCode(retryData, 2);
			parametersMap.put("authcode", verifyCode);
		}
		String url = "https://passport.jd.com/uc/loginService?uuid=" + parametersMap.get("uuid")+ "&ReturnUrl=http%3A%2F%2Fwww.jd.com%2F&r=" + Math.random() + "&version=2015";
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		headerParams.put("Origin", "https://passport.jd.com");
		retryData.client.setHeaderParams(headerParams);
		pageContent = retryData.client.postPage(url, parametersMap);
		String avlidContent = "{\"success\":\"http://www.jd.com/\"}";
		boolean r = (pageContent.indexOf(avlidContent) > -1) ? Boolean.valueOf(true) : Boolean.valueOf(false);
		if (r) {
			retryData.successful = true;
		}else if(pageContent.indexOf(ERROR_MESSAGE) > -1){
			retryData.successful = false;
			retryData.errorMsg="用户名和密码不匹配";
		}else if(pageContent.indexOf("\\u9a8c\\u8bc1\\u7801")>-1){
			if (retry - 1 == 0) {
				throw new CrawlerException("验证码错误");
			}
			retryLogin(retryData, retry - 1);
		}else if(pageContent.indexOf("\\u8bf7\\u5237\\u65b0\\u9875\\u9762\\u540e\\u91cd\\u65b0\\u63d0\\u4ea4")>-1){
			retryData.successful = false;
			retryData.errorMsg="请刷新页面后重新提交";
		}
	}
	
	private void crawlerBuylist(CrawlerClient client, JSONObject data_json) {
		String listUrl = "http://order.jd.com/center/list.action?search=0&d=2015&s=4096";

		String pageContent = client.getPage(listUrl);
		Document doc = Jsoup.parse(pageContent);
		String referer = "http://order.jd.com/center/list.action";
		String orderWareIds = HtmlAnalyze.getTagInfo(pageContent, "ORDER_CONFIG['orderWareIds']='", "';");
		String orderWareTypes = HtmlAnalyze.getTagInfo(pageContent, "ORDER_CONFIG['orderWareTypes']='", "';");
		String orderIds = HtmlAnalyze.getTagInfo(pageContent, "ORDER_CONFIG['orderIds']='", "';");
		String orderTypes = HtmlAnalyze.getTagInfo(pageContent, "ORDER_CONFIG['orderTypes']='", "';");
		String orderSiteIds = HtmlAnalyze.getTagInfo(pageContent, "ORDER_CONFIG['orderSiteIds']='", "';");

		String OrderProductInfoUrl = "http://order.jd.com/lazy/getOrderProductInfo.action";
		// orderWareIds=1360763%2C11740734%2C11825528%2C1606798109%2C996967%2C1201234%2C1285569706&orderWareTypes=0%2C0%2C0%2C0%2C0%2C0%2C0&orderIds=12487807292%2C12012096677%2C12012096677%2C11983659005%2C11901151169%2C11850476585%2C11448927356&orderTypes=0%2C0%2C0%2C22%2C0%2C0%2C22&orderSiteIds=0%2C0%2C0%2C0%2C0%2C0%2C0
		LinkedHashMap<String, String> postMap = new LinkedHashMap<String, String>();
		postMap.put("orderWareIds", orderWareIds);
		postMap.put("orderWareTypes", orderWareTypes);
		postMap.put("orderIds", orderIds);
		postMap.put("orderTypes", orderTypes);
		postMap.put("orderSiteIds", orderSiteIds);
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", referer);
		client.setHeaderParams(headerParams);
		pageContent = client.postPage(OrderProductInfoUrl, postMap);
		JSONArray JSONArray = new JSONArray(pageContent);
		HashMap<String, JSONObject> productMap = new HashMap<String, JSONObject>();
		for (Object object : JSONArray) {
			JSONObject json = (JSONObject) object;
			JSONObject tempjson = new JSONObject();
			tempjson.put("name", json.getString("name"));
			tempjson.put("productId", json.getLong("productId"));
			tempjson.put("wareUrl", json.getString("wareUrl"));
			tempjson.put("imgPath", json.getString("imgPath"));
			productMap.put(String.valueOf(json.getLong("productId")), tempjson);
		}
		com.dca.util.FileUtils.writeStream("C:\\Users\\admin\\Desktop\\jd1.txt", pageContent, true);
		HashMap<Element, Elements> elementGroups = new HashMap<Element, Elements>();
		ArrayList<Element> groups = new ArrayList<Element>();
		Elements tbodys = doc.select("table.td-void tbody");
		for (Element element : tbodys) {
			if (element.attr("id").indexOf("parent") > -1) {
				groups.add(element);
			} else if (!element.hasAttr("class")) {
				groups.add(element);
			}
		}

		for (Element element : groups) {
			if (element.attr("id").indexOf("parent") > -1) {
				String id = element.attr("id");
				Elements childrenElements = new Elements();

				for (Element tempelement : tbodys) {
					if (tempelement.hasAttr("class") && tempelement.attr("class").indexOf(id) > -1) {
						childrenElements.add(tempelement);
					}
				}
				elementGroups.put(element, childrenElements);
			} else {
				elementGroups.put(element, null);
			}

		}

		Iterator<Entry<Element, Elements>> iter = elementGroups.entrySet().iterator();
		JSONArray buyArray = new JSONArray();
		while (iter.hasNext()) {
			JSONObject json = new JSONObject();
			Entry<Element, Elements> entry = iter.next();
			Element keyElement = (Element) entry.getKey();
			Elements valElements = (Elements) entry.getValue();
			//交易时间
			String dealtime = keyElement.select("tr.tr-th span.dealtime").first().attr("title").trim();
			json.put("dealtime", dealtime);
			// 交易号
			String number = keyElement.select("tr.tr-th span.number").first().text().replace("订单号：", "").trim();
			json.put("number", number);
			if("10700834171".equals(number)){
				System.out.println("11");
			}
			

			JSONArray buyChildrenArray = new JSONArray();
			if (valElements != null) {
				for (Element valElement : valElements) {
					Elements productElements = valElement.select("tr.tr-bd");
					
					for (Element tempElement : productElements) {
						String productId = HtmlAnalyze.getTagInfo(tempElement.toString(), "class=\"goods-item p-", "\">");
						if(StringUtils.isBlank(productId)){
							continue;
						}
						JSONObject jsonP = productMap.get(productId);
						//数量
						String quantity=tempElement.select("div.goods-number").text().trim().replace("x", "");
						jsonP.put("quantity", quantity);
						jsonP.put("dealtime", dealtime);
						jsonP.put("number", number);
						buyChildrenArray.put(jsonP);
					}
				}
				if(buyChildrenArray.length()>0){
					Element firstElement=valElements.first();
					//金额
					String amount ="";
					if (firstElement.select("div.amount span").first() != null) {
						amount = firstElement.select("div.amount span").first().text().replace("总额", "");
					}
					json.put("actualFee", amount);
					//支付方式
					String payment=firstElement.select("div.amount span.ftx-13").text().trim();
					json.put("payment", payment);
					// 收货人
					Elements consigneeEls = firstElement.select("div.consignee div.pc p");
					String consigner = firstElement.select("div.consignee div.pc strong").text().trim();
					String address = consigneeEls.get(0).text().trim();
					String phone = consigneeEls.get(1).text().trim();
					json.put("consigner", consigner);
					json.put("address", address);
					json.put("phone", phone);
					//订单状态
					String orderstatus=firstElement.select("span.order-status").text().trim();
					json.put("orderstatus", orderstatus);
				}
				json.put("productItems", buyChildrenArray);
			} else {
				Elements consigneeEls = keyElement.select("div.consignee div.pc p");
				// 收货人
				String consigner = keyElement.select("div.consignee div.pc strong").text().trim();
				String address = consigneeEls.get(0).text().trim();
				String phone = consigneeEls.get(1).text().trim();
				json.put("consigner", consigner);
				json.put("address", address);
				json.put("phone", phone);
				//金额
				String amount ="";
				if (keyElement.select("div.amount span").first() != null) {
					amount = keyElement.select("div.amount span").first().text().trim().replace("总额", "");
				}else{
					continue;
				}
				json.put("actualFee", amount);
				//支付方式
				String payment=keyElement.select("div.amount span.ftx-13").text().trim();
				json.put("payment", payment);
				//订单状态
				String orderstatus=keyElement.select("span.order-status").text();
				json.put("orderstatus", orderstatus);
				
				Elements productElements = keyElement.select("tr.tr-bd");
				
				for (Element valElement : productElements) {
					String productId = HtmlAnalyze.getTagInfo(valElement.toString(), "class=\"goods-item p-", "\">");
					if(StringUtils.isBlank(productId)){
						continue;
					}
					JSONObject jsonP = productMap.get(productId);
					jsonP.put("dealtime", dealtime);
					jsonP.put("number", number);
					//数量
					String quantity=valElement.select("div.goods-number").text().trim().replace("x", "");
					jsonP.put("quantity", quantity);
					buyChildrenArray.put(jsonP);
				}
				json.put("productItems", buyChildrenArray);
			}
			buyArray.put(json);
		}
		data_json.put("orderItems", buyArray);
		System.out.println(data_json);
	}

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, CrawlerClient client) throws Exception {
		// TODO Auto-generated method stub
		// 个人信息 http://i.jd.com/user/info
		Document doc = null;
		String pageContent = null;

		// 收货地址 http://easybuy.jd.com/address/getEasyBuyList.action
		pageContent = client.getPage("http://easybuy.jd.com/address/getEasyBuyList.action");
		doc = Jsoup.parse(pageContent);
		Elements address_elements = doc.select("div#addressList div.sm");
		/**
		 * consigner;//收货人 String location;//所在区域 String address;//地址 String
		 * phone;//手机 String fixed_phone;//固定电话 String email;//电子邮箱
		 */
		JSONArray address_array = new JSONArray();
		JSONObject detail = null;
		String[] headInfos = { "consigner", "location", "address", "phone", "fixed_phone", "email" };
		for (Element address_element : address_elements) {
			Elements details = address_element.select("div.item");
			System.out.println(details.last());
			detail = new JSONObject();
			for (int i = 0; i < details.size(); i++) {
				System.out.println(details.get(i));
				detail.put(headInfos[i], details.get(i).select("div.fl").first().text());
			}
			if (detail.has("consigner"))
				address_array.put(detail);
		}

		JSONObject data_json = new JSONObject();
		data_json.put("type", "JD");
		data_json.put("addressList", address_array);
		System.out.println(data_json);
		crawlerBuylist(client, data_json);
		System.out.println(data_json);
		ResultData data = new ResultData();
		data.setResult(data_json.toString());
		return data;
	}
}
