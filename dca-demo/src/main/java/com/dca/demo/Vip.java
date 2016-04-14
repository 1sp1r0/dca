package com.dca.demo;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.imageio.ImageReader;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.impl.cookie.BasicClientCookie;
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
import com.dca.util.DateUtil;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.HttpMethod;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebResponseData;
import com.gargoylesoftware.htmlunit.html.HtmlAnchor;
import com.gargoylesoftware.htmlunit.html.HtmlImage;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlPasswordInput;
import com.gargoylesoftware.htmlunit.html.HtmlTextInput;
import com.gargoylesoftware.htmlunit.util.Cookie;
import com.gargoylesoftware.htmlunit.util.NameValuePair;
import com.gargoylesoftware.htmlunit.util.WebConnectionWrapper;

/**
 * 唯品会
 * 
 * @author admin
 *
 */
public class Vip {
	protected static final List<NameValuePair> JAVASCRIPT_HEADERS = new ArrayList<NameValuePair>();

	private static final String LOGIN_PAGE = "http://www.vip.com/";
	private CrawlerClient client;

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

	protected void postConstruct() {
		final String pathPrefix = "E:/project/data-crawler-architecture/dca-demo/Js/vip/";
		Map<String, String> jsMappings = new HashMap<String, String>();
		jsMappings.put("http://s2.vipstatic.com/js/public/jquery-1.10.2.js?12016041201",
				pathPrefix + "jquery-1.10.2.js");
		jsMappings.put("http://s2.vipstatic.com/js/public/core3.js?12016041201", pathPrefix + "core3.js");
		jsMappings.put("http://s2.vipstatic.com/js/public/te/4_1/index_a.js?12016041201", pathPrefix + "index_a.js");
		jsMappings.put("http://s2.vipstatic.com/js/public/te/4_1/index.js?12016041201", pathPrefix + "index.js");
		jsMappings.put("http://shop.vipstatic.com/js/public/common/header_com.js?12016041101",
				pathPrefix + "header_com.js");
		jsMappings.put(
				"http://shop.vipstatic.com/js/public/plugins/perfect-scrollbar-0.4.8.with-mousewheel.min.js?12016041101",
				pathPrefix + "mousewheel.min.js");
		jsMappings.put("http://s2.vipstatic.com/js/public/te/1/inf.js?12016041201", pathPrefix + "inf.js");
		jsMappings.put("http://shop.vipstatic.com/js/public/common/sidebar.js?12016041101", pathPrefix + "sidebar.js");

		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/vtm.js", pathPrefix + "vtm.js");
		// jsMappings.put("https://3rd.vipstatic.com/mars/mars.js",
		// pathPrefix + "mars.js");
		jsMappings.put("http://ms.vipstatic.com/vtm/jquery.md5.min.js", pathPrefix + "jquery.md5.min.js");
		jsMappings.put("https://user.vipstatic.com/passport/js/ads.js?20160309-014204", pathPrefix + "ads.js");

		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1428025414396_js_core.js",
				pathPrefix + "1428025414396_js_core.js");
		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1440739530222_js_core.js",
				pathPrefix + "1440739530222_js_core.js");
		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1440739651257_js_core.js",
				pathPrefix + "1440739651257_js_core.js");
		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1443422475906_js_core.js",
				pathPrefix + "1443422475906_js_core.js");
		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1443422475906_js_core.js",
				pathPrefix + "1443422475906_js_core.js");
		jsMappings.put("https://ms.vipstatic.com/vtm/vtm_config_res/prod/1447035324925_js_core.js",
				pathPrefix + "1447035324925_js_core.js");
		jsMappings.put("http://ms.vipstatic.com/vtm/vtm_config_res/prod/1460441353102_js_core.js",
				pathPrefix + "1460441353102_js_core.js");
		jsMappings.put("http://ms.vipstatic.com/vtm/vtm_config_res/prod/1458804564111_js_core.js",
				pathPrefix + "1458804564111_js_core.js");
		jsMappings.put("http://ms.vipstatic.com/vtm/vtm_config_res/prod/1458804145435_js_core.js",
				pathPrefix + "1458804145435_js_core.js");
		jsMappings.put("http://ms.vipstatic.com/vtm/vtm_config_res/prod/1442299649565_js_core.js",
				pathPrefix + "1442299649565_js_core.js");

		jsMappings.put("https://user.vipstatic.com/passport/js/jquery-1.10.2.min.js?20160309-014204",
				pathPrefix + "jquery-1.10.2.min.js");
		jsMappings.put("https://user.vipstatic.com/passport/js/core.js?20160309-014204",
				pathPrefix + "20160309core.js");
		jsMappings.put("https://user.vipstatic.com/js/helpers/placeholder.js?20160309-014204",
				pathPrefix + "placeholder.js");
		jsMappings.put("https://user.vipstatic.com/js/messenger.js?20160309-014204", pathPrefix + "messenger.js");
		jsMappings.put("https://member-ssl.vipstatic.com/js/public/safe/1/bind-phone-component.js?20160309-014204",
				pathPrefix + "bind-phone-component.js");

		jsMappings.put("https://member-ssl.vipstatic.com/js/public/jquery-1.10.2-hash-bdce12c9.js",
				pathPrefix + "jquery-1.10.2-hash-bdce12c9.js");
		jsMappings.put("https://member-ssl.vipstatic.com/js/public/core3-hash-fdf39e75.js",
				pathPrefix + "core3-hash-fdf39e75.js");
		jsMappings.put("http://member.vipstatic.com/js/public/order/1/list-hash-bdc2d1e7.js",
				pathPrefix + "list-hash-bdc2d1e7.js");
		jsMappings.put("http://order.vip.com/js/jsconstants.jsp?20160324",
				pathPrefix + "jsconstants.js");

		try {
			for (Map.Entry<String, String> entry : jsMappings.entrySet()) {
				File jsFile = ResourceUtils.getFile(entry.getValue());

				javascripts.put(entry.getKey(), FileUtils.readFileToString(jsFile, "utf-8"));
			}
		} catch (Exception ex) {
			throw new CrawlerException(ex.getMessage(), ex);
		}
	}

	protected void tryLoginUser(long userId, String username, String password, WebClient webClient) throws Exception {

		CustomWebConnectionWrapper webConnWrapper = new CustomWebConnectionWrapper(webClient);
		webClient.setWebConnection(webConnWrapper);
		HtmlPage loginPage = webClient.getPage(LOGIN_PAGE);
		int jobs = webClient.waitForBackgroundJavaScript(10000);
		loginPage = webClient.getPage("https://passport.vip.com/login?src=http%3A%2F%2Fwww.vip.com%2F");
		//get verifyCode and verify it
		Document doc=Jsoup.parse(loginPage.asXml());
		String vipc=doc.select("input#J_L_vipc").attr("value");
		HtmlImage valiCodeImg = (HtmlImage) loginPage.getElementById("verify_image");
		ImageReader imageReader = valiCodeImg.getImageReader();
		BufferedImage bufferedImage = imageReader.read(0);
		JFrame f2 = new JFrame();
		JLabel l = new JLabel();
		l.setIcon(new ImageIcon(bufferedImage));
		f2.getContentPane().add(l);
		f2.setSize(100, 100);
		f2.setTitle("验证码");
		f2.setVisible(true);

		String valicodeStr = JOptionPane.showInputDialog("请输入验证码：");
		System.out.println(valicodeStr);
		f2.setVisible(false);
		String VERIFY_CODE_URL="https://passport.vip.com/captcha/ajaxCheckCaptcha?captcha="+valicodeStr+"&vipc="+vipc+"&anticache="+System.currentTimeMillis()+"&type=0";
		WebRequest verifyCodeRequest =new WebRequest(new URL(VERIFY_CODE_URL), HttpMethod.GET);
        
        WebResponse verifyCodeResponse = webClient.loadWebResponse(verifyCodeRequest);
        String response = verifyCodeResponse.getContentAsString();
        if (!response.contains("true")) {
        	System.out.println("验证码验证成功");
           // return new LoginData("登录失败");
        }

//		HtmlTextInput nameInput = (HtmlTextInput) loginPage.querySelector("#J_L_name");
//		nameInput.focus();
//		nameInput.setValueAttribute(username);
//		nameInput.blur();
//
//		HtmlPasswordInput pwdInput = (HtmlPasswordInput) loginPage.querySelector("#J_L_psw");
//		pwdInput.focus();
//		pwdInput.setValueAttribute(password);
//		pwdInput.blur();
//
//		HtmlTextInput verifyInput = (HtmlTextInput) loginPage.querySelector("#J_L_code");
//		verifyInput.focus();
//		verifyInput.setValueAttribute(valicodeStr);
//		verifyInput.blur();
//
//		HtmlAnchor buttonInput = (HtmlAnchor) loginPage.querySelector("#btnLogin");
//		HtmlPage mainPage = buttonInput.click();
        //vipc=xtxqI3RzUN3jahXLulWrKJ2rw8yYMU8t&loginName=15088777366&password=fangxiao19900916&captcha=j4n2&remUser=1
        List<NameValuePair> loginParams = new ArrayList<NameValuePair>();
        loginParams.add(new NameValuePair("vipc", vipc));
        loginParams.add(new NameValuePair("loginName", username));
        loginParams.add(new NameValuePair("password", password));
        loginParams.add(new NameValuePair("captcha",valicodeStr ));
        loginParams.add(new NameValuePair("remUser", "1"));
        
        WebRequest loginRequest = new WebRequest(new URL("https://passport.vip.com/login?v="+System.currentTimeMillis()), HttpMethod.POST);
        loginRequest.setRequestParameters(loginParams);
        
        WebResponse loginResponse = webClient.loadWebResponse(loginRequest);
        String loginresponse = loginResponse.getContentAsString();
        JSONObject jsonResult = null;
        try {
			System.out.println("---------------");

			jsonResult = new JSONObject(loginresponse);
			if (jsonResult.getString("result").equals("success")) {
				String reurl=((JSONObject)jsonResult.get("data")).getString("signedApiUrl");
				webClient.getPage(reurl);
				
				System.out.println("登陆成功！");
			} else {
				System.out.println("登陆失败！");
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("登陆异常");
			e.printStackTrace();
		}
        webClient.getPage("http://www.vip.com/");
		webClient.waitForBackgroundJavaScript(10000);
		crawlerData(webClient);
	}

	/**
	 * 数据采集解析（具体实施过程中要细分 降耦）
	 * 
	 * @throws Exception
	 */
	protected void crawlerData(WebClient webClient) throws Exception {
		//收货地址
		WebRequest addressRequest =new WebRequest(new URL("http://myi.vip.com/api/address?"+System.currentTimeMillis()), HttpMethod.GET);
		WebResponse addressResponse = webClient.loadWebResponse(addressRequest);
	    String addressContent = addressResponse.getContentAsString();
	    JSONObject addressJson=new JSONObject(addressContent);
	    JSONArray addrArry=addressJson.getJSONArray("data");
	    JSONArray address_array = new JSONArray();
	    JSONObject tempJson=null;
	    for (Object object : addrArry) {
	    	tempJson=new JSONObject();
	    	JSONObject addrjson=(JSONObject) object;
	    	tempJson.put("consigner", addrjson.getString("consignee"));
	    	tempJson.put("location", addrjson.getString("area_name"));
	    	tempJson.put("address", addrjson.getString("address"));
	    	tempJson.put("phone", addrjson.getString("mobile"));
	    	tempJson.put("fixed_phone", addrjson.getString("telephone"));
	    	tempJson.put("email", "");
	    	//默认？
	    	tempJson.put("is_default", addrjson.getLong("is_default"));
	    	if (tempJson.has("consigner"))
				address_array.put(tempJson);
		}
	    JSONObject data_json = new JSONObject();
	    data_json.put("addressList", address_array);
	    crawlerBuylist(webClient, data_json);
	
	}
	private void crawlerBuylist(WebClient webClient, JSONObject data_json) throws FailingHttpStatusCodeException, MalformedURLException, IOException {
		//订单数据
		HtmlPage orderPage = webClient.getPage("http://order.vip.com/order/getOrderListTab?tabChannel=all&=http://order.vip.com/order/orderlist");
		Document doc=Jsoup.parse(orderPage.asXml());
		
		Elements tbodyElements= doc.select("table.m-table tbody");
		JSONArray buyArray = new JSONArray();
		for (Element tbodyElement : tbodyElements) {
			if(!tbodyElement.hasAttr("data-orderid")){
				continue;
			}
			String ordersn=tbodyElement.attr("data-ordersn");
			if(StringUtils.isBlank(ordersn)){
				continue;
			}
			//收货人
			String consigner =tbodyElement.attr("data-receiver");
			WebRequest orderDetailRequest =new WebRequest(new URL("http://order.vip.com/detail/info?ordersn="+ordersn), HttpMethod.GET);
	        
	        WebResponse orderDetailResponse = webClient.loadWebResponse(orderDetailRequest);
	        String response = orderDetailResponse.getContentAsString();
			com.dca.util.FileUtils.writeByCharStream("C:\\Users\\admin\\Desktop\\数据\\电商\\11.txt",response,
					"utf-8", true);
			JSONObject orderJson=new JSONObject(response);
			JSONObject json = new JSONObject();
			//交易时间
			String dealtime=DateUtil.format(new Date(Long.parseLong(orderJson.getString("order_create_time"))*1000l), "yyyy-MM-dd HH:mm:ss");
			json.put("dealtime", dealtime);
			// 交易号
			json.put("number", orderJson.get("orderID"));
			
			JSONObject basicInfoObj= orderJson.getJSONObject("orderSummary").getJSONObject("result").getJSONObject("object");
			// 交易号
			String number = basicInfoObj.getString("sn");
			String address=basicInfoObj.getString("address");
			json.put("address", address);
			
			json.put("consigner", consigner);
			//金额
			String amount=basicInfoObj.getString("amount");
			json.put("actualFee", amount);
			//支付方式
			String payment=basicInfoObj.getString("carryType");
			json.put("payment",payment);
			//phone
			String phone=basicInfoObj.getString("mobile");
			//状态
			json.put("orderstatus", basicInfoObj.getString("status_name"));
			json.put("phone", phone);
			JSONArray buyChildrenArray = new JSONArray();
			JSONArray orderArray=orderJson.getJSONObject("goodsList").getJSONObject("result").getJSONObject("object").getJSONArray("goods_list");
			for (Object object : orderArray) {
				JSONObject buyChildjson=(JSONObject) object;
				JSONObject jsonP =new JSONObject();
				
				jsonP.put("number", number);
				dealtime=DateUtil.format(new Date(buyChildjson.getLong("sell_time_from")*1000l), "yyyy-MM-dd HH:mm:ss");
				jsonP.put("dealtime", dealtime);
				jsonP.put("name", buyChildjson.getString("good_name")+" "+buyChildjson.getString("sku_name"));
				jsonP.put("wareUrl", buyChildjson.getString("goodsURL"));
				//数量
				jsonP.put("quantity", buyChildjson.getString("piece"));
				jsonP.put("imgPath", buyChildjson.getString("realImagePath"));
				jsonP.put("productId", buyChildjson.getString("goods_id"));
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

			// try load js locally
			String localScript = javascripts.get(requestURL);
			if (localScript != null) {
				WebResponseData data = new WebResponseData(localScript.getBytes("utf-8"), 200, "", JAVASCRIPT_HEADERS);
				return new UTF8WebResponse(data, request, 0);
			}

			// retry and get actual response
			WebResponse response = null;
			IOException ioe = null;
			final int RETRY = 3;
			for (int i = 0; i < RETRY; ++i) {
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

			// if (requestURL.contains("verifyId.json")) {
			// getLogger().debug(response.getContentAsString());
			// } else if (requestURL.contains("verifyCheckCode.json")) {
			// getLogger().debug(response.getContentAsString());
			// }

			return response;
		}
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

	public static void main(String[] args) throws Exception {
		Vip tb = new Vip();
		tb.postConstruct();
		WebClient webClient = new WebClient(tb.getBrowserVersion());
		webClient.getOptions().setJavaScriptEnabled(true);
		webClient.getOptions().setCssEnabled(false);
		webClient.getOptions().setActiveXNative(true);
		webClient.getOptions().setRedirectEnabled(true);
		webClient.getOptions().setThrowExceptionOnScriptError(false);
		webClient.getOptions().setThrowExceptionOnFailingStatusCode(true);
		webClient.getOptions().setTimeout(15000);
		webClient.getOptions().setSSLClientProtocols(new String[] { "SSLv3", "TLSv1" });
		tb.tryLoginUser(12, "15088777366", "fangxiao19900916", webClient);
		
		
//		String content=com.dca.util.FileUtils.readFileByCharStream("C:\\Users\\admin\\Desktop\\数据\\电商\\11.txt").replace("﻿{\"sort\":", "{\"sort\":");
//		System.out.println(content);
//		JSONObject orderJson=new JSONObject(content);
//		JSONObject json = new JSONObject();
//		//交易时间
//		json.put("dealtime", DateUtil.format(new Date(Long.parseLong(orderJson.getString("order_create_time"))), "yyyy-MM-dd HH:mm:ss"));
//		// 交易号
//		json.put("number", orderJson.get("orderID"));
//		
//		JSONObject basicInfoObj= orderJson.getJSONObject("orderSummary").getJSONObject("result").getJSONObject("object");
//		// 交易号
//		String number = basicInfoObj.getString("sn");
//		String address=basicInfoObj.getString("address");
//		json.put("address", address);
//		// 收货人
//		String consigner="";
//		json.put("consigner", consigner);
//		//金额
//		String amount=basicInfoObj.getString("amount");
//		json.put("actualFee", amount);
//		//支付方式
//		String payment=basicInfoObj.getString("carryType");
//		json.put("payment",payment);
//		//phone
//		String phone=basicInfoObj.getString("mobile");
//		json.put("phone", phone);
//		JSONArray buyChildrenArray = new JSONArray();
//		JSONArray orderArray=orderJson.getJSONObject("goodsList").getJSONObject("result").getJSONObject("object").getJSONArray("goods_list");
//		for (Object object : orderArray) {
//			JSONObject buyChildjson=(JSONObject) object;
//			JSONObject jsonP =new JSONObject();
//			
//			jsonP.put("number", number);
//			jsonP.put("name", buyChildjson.getString("good_name")+" "+buyChildjson.getString("sku_name"));
//			jsonP.put("wareUrl", buyChildjson.getString("goodsURL"));
//			//数量
//			jsonP.put("quantity", buyChildjson.getString("piece"));
//			jsonP.put("imgPath", buyChildjson.getString("realImagePath"));
//			jsonP.put("productId", buyChildjson.getString("goods_id"));
//			buyChildrenArray.put(jsonP);
//		}
//		json.put("productItems", buyChildrenArray);
//		System.out.println(json);
	}

}