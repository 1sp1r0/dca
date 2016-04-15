package com.dca.usercrawler.socialinsurance.crawler;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

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
import com.dca.http.CrawlerClient;
import com.dca.usercrawler.helpers.RetryData;
import com.dca.usercrawler.socialinsurance.BaseSocialInsuranceSimpleCrawler;
@Component("hangzhou_social")
public class HangzhouSocial extends BaseSocialInsuranceSimpleCrawler {
	public final static String FIRST_REFERER_URL="http://wsbs.zjhz.hrss.gov.cn/index.html";
	public final static String VERIFY_CODE_URL="http://wsbs.zjhz.hrss.gov.cn/captcha.svl";
	
	@Override
	protected CrawlerClient createCrawlerClient() {
		// TODO Auto-generated method stub
		CrawlerClient.ConstructParams params=new CrawlerClient.ConstructParams(true);
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
		client.getPage(FIRST_REFERER_URL);
		RetryData retryData = new RetryData(client, username, password, FIRST_REFERER_URL, VERIFY_CODE_URL,null);
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
		String verifyCode = getValidateCode(retryData, 2);
		String auth_login_url="http://wsbs.zjhz.hrss.gov.cn/loginvalidate.html?logintype=1&captcha="+verifyCode;
		LinkedHashMap<String, String> postMap=new LinkedHashMap<String, String>();
		Map<String, String> headerParams=new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		retryData.client.setHeaderParams(headerParams);
		//type=01&persontype=03&account=339005198712106210&password=xiaolan890310&captcha1=mwpq
		postMap.put("type","01");
		postMap.put("persontype","03");
		postMap.put("account",retryData.username);
		postMap.put("password",retryData.password);
		postMap.put("captcha1",verifyCode);
		String pageContent=retryData.client.postPage(auth_login_url,postMap);
		if(pageContent.indexOf("'success'")>-1){
			retryData.successful = true;
		}else if(pageContent.indexOf("用户信息不匹配或密码错误") > -1){
			retryData.successful = false;
			retryData.errorMsg="用户名或密码不正确";
		}else if(pageContent.indexOf("校验码")>-1){
			if (retry - 1 == 0) {
				throw new CrawlerException("验证码错误或过期");
			}
			retryLogin(retryData, retry - 1);
		}else{
			retryData.successful = false;
			retryData.errorMsg="登陆失败";
		}
	}

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, CrawlerClient client) throws Exception {
		// TODO Auto-generated method stub
		ResultData data = new ResultData();
		String personInfoUrl="http://wsbs.zjhz.hrss.gov.cn/person/personInfo/index.html";
		String pageContent=client.getPage(personInfoUrl);
		JSONObject jsonData=new JSONObject();
		Document doc=Jsoup.parse(pageContent);
		Element baseInfoElement=doc.select("table.form").first();
		Element statusInfoElement=doc.select("table.grid").first();
		//基本信息为空的情况直接返回
		if(baseInfoElement==null){
			data.setResult(jsonData.toString());
			return data;
		}
		Elements base_trs=baseInfoElement.select("tr");
		for (int i = 0; i < base_trs.size(); i++) {
			Elements base_tds=base_trs.get(i).select("td");
			for (int j = 0; j < base_tds.size(); j+=2) {
				jsonData.put(base_tds.get(j).text().replaceAll(":|：", ""), base_tds.get(j+1).text());
			}
			
		}
		//参保状态数据为空时返回json
		if(statusInfoElement==null){
			System.out.println(jsonData);
			data.setResult(jsonData.toString());
			return data;
		}
		Elements status_trs=statusInfoElement.select("tr");
		if(status_trs==null||status_trs.size()<=1){
			System.out.println(jsonData);
			data.setResult(jsonData.toString());
			return data;
		}
		Elements head_status=status_trs.first().select("td");
		int len=head_status.size();
		String[] heads=new String[len];
		for (int i = 0; i < len; i++) {
			heads[i]=head_status.get(i).text().trim().replaceAll(":|：", "");
		}
		JSONArray jsonArray=new JSONArray();
		for (int i = 1; i < status_trs.size(); i++) {
			JSONObject singleData=new JSONObject();
			Elements status_tds=status_trs.get(i).select("td");
			for (int j = 0; j < status_tds.size(); j++) {
				singleData.put(heads[j], status_tds.get(j).text());
			}
			if(singleData.length()>0)
				jsonArray.put(singleData);
		}
		jsonData.put("statusInfoItems", jsonArray);
		data.setResult(jsonData.toString());
		System.out.println(jsonData);
		return data;
	}

}
