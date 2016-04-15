package com.dca.usercrawler.providentfund.crawler;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.dca.common.LoginData;
import com.dca.dto.Account;
import com.dca.dto.ResultData;
import com.dca.exceptions.CrawlerException;
import com.dca.http.CrawlerClient;
import com.dca.usercrawler.helpers.RetryData;
import com.dca.usercrawler.providentfund.BaseProvidentFundSimpleCrawler;
/**
 * 杭州公积金
 * @author admin
 *
 */
@Component("hangzhou_fund")
public class HangzhougFund extends BaseProvidentFundSimpleCrawler {
	public final static String FIRST_REFERER_URL = "http://www.hzgjj.gov.cn:8080/WebAccounts/pages/per/login.jsp";
	public final static String VERIFY_CODE_URL = "http://www.hzgjj.gov.cn:8080/WebAccounts/codeMaker";
	public final static String AUTH_LOGIN_URL = "http://www.hzgjj.gov.cn:8080/WebAccounts/userLogin.do";

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
		client.getPage(FIRST_REFERER_URL);
		RetryData retryData = new RetryData(client, username, password, FIRST_REFERER_URL, VERIFY_CODE_URL,null);
		retryLogin(retryData, 3);
		if (retryData.successful) {
			loginData = new LoginData(true);
			loginData.setExternalAccountId(retryData.uid);
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
		//获取验证码
		String verifyCode = getValidateCode(retryData, 2);

		String url = "http://www.hzgjj.gov.cn:8080/WebAccounts/userLogin.do?cust_no=" + retryData.username+ "&password=" + retryData.password + "&validate_code=" + verifyCode + "&cust_type=2&user_type=1";
		LinkedHashMap<String, String> postMap = new LinkedHashMap<String, String>();
		postMap.put("cust_no", retryData.username);
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		retryData.client.setHeaderParams(headerParams);
		String pageContent = retryData.client.postPage(url, postMap);
		if (pageContent.equals("1")) {
			boolean r =false;
			postMap.clear();
			retryData.successful = true;
			// cust_type=2&flag=1&user_type_2=1&user_type=1&cust_no=082829007900&password=435582&validate_code=9206
			postMap.put("cust_type", "2");
			postMap.put("flag", "1");
			postMap.put("user_type_2", "1");
			postMap.put("user_type", "1");
			postMap.put("cust_no", retryData.username);
			postMap.put("password", retryData.password);
			postMap.put("validate_code", verifyCode);
			pageContent = retryData.client.postPage(AUTH_LOGIN_URL, postMap);
			r = (pageContent.indexOf(retryData.username) > -1 && pageContent.indexOf("上次登录时间") > -1);
			if (r) {
				retryData.successful = true;
			} else {
				retryData.successful = false;
				retryData.errorMsg = "其他错误";
			}
		} else if (pageContent.equals("-1")) {
			retryData.successful = false;
			retryData.errorMsg = "用户名或密码错误";
		} else if (pageContent.equals("2")) {
			if (retry - 1 == 0) {
				throw new CrawlerException("验证码错误");
			}
			retryLogin(retryData, retry - 1);
		} else {
			retryData.successful = false;
			retryData.errorMsg = "其他错误";
		}

	}

	@Override
	protected ResultData crawlAccountData(Account account, LoginData loginData, CrawlerClient client) throws Exception {
		// TODO Auto-generated method stub
		// 个人对账
		String perComInfoUrl = "http://www.hzgjj.gov.cn:8080/WebAccounts/perComInfo.do?flag=1";
		String pageContent = client.getPage(perComInfoUrl);
		JSONObject jsonData = new JSONObject();
		dataAnaylize(pageContent, jsonData, "perComInfoItems");

		// 个人借款
		String lentListInfoUrl = "http://www.hzgjj.gov.cn:8080/WebAccounts/lentListInfo.do";
		pageContent = client.getPage(lentListInfoUrl);
		dataAnaylize(pageContent, jsonData, "lentListInfoItems");

		// 缴存信息
		String handperComInfoUrl = "http://www.hzgjj.gov.cn:8080/WebAccounts/perComInfo.do";
		pageContent = client.getPage(handperComInfoUrl);
		tempAnaylize(pageContent, jsonData, "handperComInfoItems");

		// 贷款进度查询
		String perCreditQryUrl = "http://www.hzgjj.gov.cn:8080/WebAccounts/perCreditQry.do?action=list";
		pageContent = client.getPage(perCreditQryUrl);
		dataAnaylize(pageContent, jsonData, "perCreditQryItems");
		ResultData data = new ResultData();
		data.setResult(jsonData.toString());
		data.setStatus(jsonData.getString("status"));
		return data;
	}


	/**
	 * table 解析过程
	 * 
	 * @param html
	 * @param jsonData
	 * @param key
	 */
	protected void dataAnaylize(String html, JSONObject jsonData, String key) {
		Document doc = Jsoup.parse(html);
		Elements trs = doc.select("table.BStyle_TB tr");
		Elements headTds = trs.first().select("th");
		int lenth = headTds.size();
		String[] headInfos = new String[lenth];
		for (int i = 0; i < lenth; i++) {
			headInfos[i] = headTds.get(i).text();
		}

		JSONArray jsonArray = new JSONArray();
		for (int i = 1; i < trs.size(); i++) {
			JSONObject singleData = new JSONObject();
			Elements tds = trs.get(i).select("td");
			for (int j = 0; j < tds.size(); j++) {
				if (j == tds.size() - 1) {
					if (tds.get(j).select("a").attr("href").length() > 0) {
						singleData.put(headInfos[j],"http://www.hzgjj.gov.cn:8080" + tds.get(j).select("a").attr("href"));
					}
				} else {
					if(headInfos[j].equals("账户余额")){
						jsonData.put("balance", tds.get(j).text());
					}
					if(headInfos[j].equals("缴存状态")){
						jsonData.put("status", tds.get(j).text());
					}
					singleData.put(headInfos[j], tds.get(j).text());
				}
			}
			jsonArray.put(singleData);
		}
		jsonData.put(key, jsonArray);
	}

	protected void tempAnaylize(String html, JSONObject jsonData, String key) {
		Document doc = Jsoup.parse(html);
		Elements trs = doc.select("table.BStyle_TB tr");
		if (trs.size() <= 2) {
			return;
		}
		String[] headInfos = { "序号", "资金账户", "资金性质", "缴存单位", "单位", "个人", "合计", "缴存状态" };
		JSONArray jsonArray = new JSONArray();
		for (int i = 2; i < trs.size(); i++) {
			JSONObject singleData = new JSONObject();
			Elements tds = trs.get(i).select("td");
			for (int j = 0; j < tds.size(); j++) {
				if (j == tds.size() - 1) {
					singleData.put("详情", "http://www.hzgjj.gov.cn:8080" + tds.get(j).select("a").attr("href"));
				} else {
					if(headInfos[j].equals("账户余额")){
						jsonData.put("balance", tds.get(j).text());
					}
					if(headInfos[j].equals("缴存状态")){
						jsonData.put("status", tds.get(j).text());
					}
					singleData.put(headInfos[j], tds.get(j).text());
				}
			}
			jsonArray.put(singleData);
		}
		jsonData.put(key, jsonArray);
	}

}
