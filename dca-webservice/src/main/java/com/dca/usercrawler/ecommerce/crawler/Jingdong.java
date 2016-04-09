package com.dca.usercrawler.ecommerce.crawler;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.dca.exceptions.CrawlerException;
import com.dca.http.CrawlerClient;
import com.dca.usercrawler.ecommerce.BaseEcommerceSimpleCrawler;
import com.dca.usercrawler.helpers.RetryData;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Component("jingdong")
public class Jingdong extends BaseEcommerceSimpleCrawler {
	public final static String FIRST_REFERER_URL = "https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fwww.jd.com%2F";

	//账户名与密码不匹配，请重新输入
	public final static String ERROR_WORD="\"pwd\":\"\\u8d26\\u6237\\u540d\\u4e0e\\u5bc6\\u7801\\u4e0d\\u5339\\u914d\\uff0c\\u8bf7\\u91cd\\u65b0\\u8f93\\u5165\"";
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
		}else if(pageContent.indexOf(ERROR_WORD) > -1){
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

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, CrawlerClient client) throws Exception {
		// TODO Auto-generated method stub
		//个人信息 http://i.jd.com/user/info
		Document doc=null;
		String pageContent=null;
//		String pageContent=client.getPage("http://i.jd.com/user/info");
//		System.out.println(pageContent);
		
		//收货地址 http://easybuy.jd.com/address/getEasyBuyList.action
		pageContent=client.getPage("http://easybuy.jd.com/address/getEasyBuyList.action");
		doc=Jsoup.parse(pageContent);
		Elements address_elements=doc.select("div#addressList div.sm");
		/**consigner;//收货人
		String location;//所在区域
		String address;//地址
		String phone;//手机
		String fixed_phone;//固定电话
		String email;//电子邮箱
		*/
		JSONArray address_array=new JSONArray();
		JSONObject detail=null;
		String[] headInfos={"consigner","location","address","phone","fixed_phone","email"};
		for (Element address_element : address_elements) {
			Elements details=address_element.select("div.item");
			detail=new JSONObject();
			for (int i = 0; i < details.size(); i++) {
				detail.put(headInfos[i],details.get(i).select("div.fl").first().text());
			}
			if(!detail.isEmpty())
				address_array.add(detail);
		}
		
		JSONObject data_json=new JSONObject();
		data_json.put("addressList", address_array);
		System.out.println(data_json);
		ResultData data = new ResultData();
		data.setResult(data_json.toString());
		return data;
	}
}
