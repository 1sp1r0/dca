package com.dca.demo;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.ws.commons.util.Base64.DecodingException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.util.ResourceUtils;

import com.dca.exceptions.CrawlerException;
import com.dca.htmlutil.HtmlAnalyze;
import com.dca.http.CrawlerClient;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.util.NameValuePair;

/**
 * 杭州公积金
 * 
 * @author admin
 *
 */
public class Jd {
	protected static final List<NameValuePair> JAVASCRIPT_HEADERS = new ArrayList<NameValuePair>();
	private String user;// 用户名
	private String pwd;// 密码
	private CrawlerClient client;
	private String uuid;
	private String _t;
	private String token_key;
	private String token_value;
	private String verify_code_url;
	private UUID imguuid = UUID.randomUUID();

	public Jd(String user, String pwd) {
		this.user = user;
		this.pwd = pwd;
		createCrawlerClient();
	}

	private Map<String, String> javascripts = new HashMap<String, String>();
	static {
		NameValuePair contentType = new NameValuePair("content-type", "application/javascript");
		JAVASCRIPT_HEADERS.add(contentType);
	}

	protected BrowserVersion getBrowserVersion() {
		BrowserVersion browserVersion = BrowserVersion.FIREFOX_38.clone();
		browserVersion.setUserAgent(
				"Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5");
		return browserVersion;
	}

	protected void postConstruct() {
		final String pathPrefix = "E:/project/data-crawler-architecture/dca-demo/Js/Jingdong/";
		Map<String, String> jsMappings = new HashMap<String, String>();
		jsMappings.put("http://misc.360buyimg.com/user/myjd-2015/js/page/order/payOrderList.js",
				pathPrefix + "payOrderList.js");
		jsMappings.put("http://wl.jd.com/wl.js", pathPrefix + "wl.js");
		jsMappings.put("http://misc.360buyimg.com/jdf/1.0.0/unit/??base/1.0.0/base.js,basePatch/1.0.0/basePatch.js",
				pathPrefix + "basePatch.js");
		jsMappings.put("http://misc.360buyimg.com/jdf/lib/jquery-1.6.4.js", pathPrefix + "jquery-1.6.4.js");
		jsMappings.put("http://misc.360buyimg.com/user/myjd-2015/??widget/common/common.js", pathPrefix + "common.js");
		jsMappings.put(
				"http://misc.360buyimg.com/user/myjd-2015/js/page/??recommend-base.js,order/order.js,order/base64.js,order/popOrderService.js,order/odo/OrderToolBar.js",
				pathPrefix + "OrderToolBar.js");
		jsMappings.put("http://static.360buyimg.com/im/js/im_icon_v5.js?sign=20131111", pathPrefix + "im_icon_v5.js");
		jsMappings.put("http://misc.360buyimg.com/jdf/1.0.0/ui/ui/1.0.0/ui.js", pathPrefix + "ui.js");
		jsMappings.put(
				"http://misc.360buyimg.com/jdf/1.0.0/unit/??globalInit/2.0.0/globalInit.js,hotwords/1.0.0/hotwords.js",
				pathPrefix + "node-min.js");
		jsMappings.put("https://g.alicdn.com/kissy/k/1.4.4/??event-min.js,event/custom-min.js",
				pathPrefix + "hotwords.js");
		jsMappings.put("http://misc.360buyimg.com/user/myjd-2015/js/fas.js", pathPrefix + "fas.js");
		jsMappings.put("http://misc.360buyimg.com/user/myjd-2015/js/page/order/list-service.js",
				pathPrefix + "list-service.js");

		try {
			for (Map.Entry<String, String> entry : jsMappings.entrySet()) {
				File jsFile = ResourceUtils.getFile(entry.getValue());

				javascripts.put(entry.getKey(), FileUtils.readFileToString(jsFile, "utf-8"));
			}
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		}
	}

	/**
	 * 初始化HttpClient
	 */
	protected void createCrawlerClient() {
		// TODO Auto-generated method stub
		CrawlerClient.ConstructParams params = new CrawlerClient.ConstructParams(true);
		params.setAutoRedirect(true);
		params.setAllowCircularRedirect(true);
		params.setSSLProtocols(true);
		client = new CrawlerClient(params);
	}

	/**
	 * 模拟登陆过程
	 * 
	 * @param verifyCode
	 * @return
	 * @throws Exception
	 */
	protected boolean doVerify(String verifyCode) throws Exception {

		LinkedHashMap<String, String> postMap = new LinkedHashMap<String, String>();
		postMap.put("loginName", user);
		String pageContent = client
				.postPage("https://passport.jd.com/uc/rememberMeCheck?r=" + Math.random() + "&version=2015", postMap);
		pageContent = client.postPage("https://passport.jd.com/uc/showAuthCode?r=" + Math.random() + "&version=2015",
				postMap);
		String url = "https://passport.jd.com/uc/loginService?uuid=" + uuid + "&ReturnUrl=http%3A%2F%2Fwww.jd.com%2F&r="
				+ Math.random() + "&version=2015";
		// uuid=67912812-6c32-4d01-9d29-fdf5aba6281d&machineNet=&machineCpu=&machineDisk=&eid=56c4cfa561114e59af82f203abb5f6f692197026&fp=44222ecd68bb328e25ccad8ea4dd93d2&_t=_ntcAHes&xiSfFygZYh=YrGan&loginname=992391357%40qq.com&nloginpwd=yang1258&loginpwd=yang1258&authcode=
		postMap.clear();
		postMap.put("uuid", uuid);
		postMap.put("machineNet", "");
		postMap.put("machineCpu", "");
		postMap.put("machineDisk", "");
		postMap.put("eid", "46c4cfa561114e59af82f203abb5f6f692197026");
		postMap.put("fp", "37606e7c7e1701d3a30fc0312529c98d");
		postMap.put("_t", _t);
		postMap.put(token_key, token_value);
		postMap.put("loginname", user);
		postMap.put("nloginpwd", pwd);
		postMap.put("loginpwd", pwd);
		postMap.put("chkRememberMe", "on");
		postMap.put("authcode", verifyCode);
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", "https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fwww.jd.com%2F");
		headerParams.put("Origin", "https://passport.jd.com");
		client.setHeaderParams(headerParams);
		pageContent = client.postPage(url, postMap);
		String avlidContent = "{\"success\":\"http://www.jd.com/\"}";
		boolean r = (pageContent.indexOf(avlidContent) > -1) ? Boolean.valueOf(true) : Boolean.valueOf(false);
		return r;
	}

	/**
	 * 数据采集解析（具体实施过程中要细分 降耦）
	 * 
	 * @throws Exception
	 */
	protected void crawlerData() throws Exception {
		// 个人信息 http://i.jd.com/user/info
		Document doc = null;
		String pageContent = null;
		// String pageContent=client.getPage("http://i.jd.com/user/info");
		// System.out.println(pageContent);

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
			//默认？
			if(address_element.toString().indexOf("默认地址")>-1){
				detail.put("is_default","1");
			}else{
				detail.put("is_default","0");
			}
			if (detail.has("consigner"))
				address_array.put(detail);
		}

		JSONObject data_json = new JSONObject();
		data_json.put("addressList", address_array);
		System.out.println(data_json);
		crawlerBuylist(client, data_json);
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

	protected void doGetCookie() throws HttpException, IOException {
		String pageContent = client.getPage("https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fwww.jd.com%2F");
		Document doc = Jsoup.parse(pageContent);
		Elements input_elements = doc.select("form#formlogin input");
		uuid = input_elements.get(0).attr("value");
		_t = input_elements.get(6).attr("value");
		token_key = input_elements.get(7).attr("name");
		token_value = input_elements.get(7).attr("value");
		verify_code_url = doc.select("img#JD_Verification1").attr("src2");
		File path = new File("Verify_Code_Image/");
		if (!path.exists()) {
			path.mkdirs();
		}
		File storeFile = new File("Verify_Code_Image/verify_" + imguuid + ".jpg");
		client.savePicture(verify_code_url, storeFile);
		// https://authcode.jd.com/verify/image?a=1&acid=ca66a7ac-f627-40f0-a7e1-e9b34518bbc5&uid=ca66a7ac-f627-40f0-a7e1-e9b34518bbc5&yys=1459501507623
	}

	public static void main(String[] args) throws DecodingException {
		Jd engine = new Jd(new String(Base64.decodeBase64("OTkyMzkxMzU3QHFxLmNvbQ==".getBytes())),
				new String(Base64.decodeBase64("eWFuZzEyNTg=".getBytes())));
		try {
			engine.doGetCookie();
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			String verifyCode = null;
			System.out.println("Type in Verification Code:");
			verifyCode = br.readLine();
			System.out.println("The Code is :" + verifyCode);
			new File("Verify_Code_Image/verify_" + engine.imguuid + ".jpg").delete();
			if (engine.doVerify(verifyCode)) {
				engine.crawlerData();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	// public static void main(String[] args) {
	// String
	// pageContent=FileUtils.readFileByLines("C:\\Users\\admin\\Desktop\\jd.txt",
	// "gb2312");
	// Document doc=Jsoup.parse(pageContent);
	// Elements tbodys=doc.select("table.td-void tbody");
	// for (int i = 0; i < args.length; i++) {
	// //交易时间
	// String dealtime=tbodys.select("span.dealtime").first().attr("title");
	// //订单编号
	// String orderId=tbodys.select("span.number").first().attr("title");
	// }
	// }
}
