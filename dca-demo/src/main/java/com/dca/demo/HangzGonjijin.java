package com.dca.demo;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.httpclient.HttpException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import com.dca.http.CrawlerClient;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 杭州公积金
 * @author admin
 *
 */
public class HangzGonjijin {
	public final static String FIRST_REFERER_URL="http://www.hzgjj.gov.cn:8080/WebAccounts/pages/per/login.jsp";
	public final static String VERIFY_CODE_URL="http://www.hzgjj.gov.cn:8080/WebAccounts/codeMaker";
	public final static String AUTH_LOGIN_URL="http://www.hzgjj.gov.cn:8080/WebAccounts/userLogin.do";
	
	private String user;//用户名
	private String pwd;//密码
	private CrawlerClient client;
	private UUID uuid = UUID.randomUUID();
	
	public HangzGonjijin(String user,String pwd){
		this.user=user;
		this.pwd=pwd;
		createCrawlerClient();
	}
	
	/**
	 * 初始化HttpClient
	 */
	protected void createCrawlerClient() {
		// TODO Auto-generated method stub
		CrawlerClient.ConstructParams params=new CrawlerClient.ConstructParams(true);
		params.setAutoRedirect(true);
		params.setAllowCircularRedirect(true);
		client=new CrawlerClient(params);
	}
	/**
	 * 下载验证码
	 * @return
	 * @throws Exception
	 */
	protected String doDownLoadPic() throws Exception {
		Map<String, String> headerParams=new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		client.setHeaderParams(headerParams);
		File path = new File("Verify_Code_Image/");
		if (!path.exists()) {
			path.mkdirs();
		}
		File storeFile = new File("Verify_Code_Image/verify_" + uuid + ".jpg");
		client.savePicture(VERIFY_CODE_URL, storeFile);
		return storeFile.getPath();
	}

	/**
	 * 模拟登陆过程
	 * @param verifyCode
	 * @return
	 * @throws Exception
	 */
	protected boolean doVerify(String verifyCode) throws Exception {
		String url="http://www.hzgjj.gov.cn:8080/WebAccounts/userLogin.do?cust_no="+user+"&password="+pwd+"&validate_code="+verifyCode+"&cust_type=2&user_type=1";
		LinkedHashMap<String, String> postMap=new LinkedHashMap<String, String>();
		postMap.put("cust_no", user);
		Map<String, String> headerParams=new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		client.setHeaderParams(headerParams);
		String pageContent=client.postPage(url, postMap);
		postMap.clear();
		//cust_type=2&flag=1&user_type_2=1&user_type=1&cust_no=082829007900&password=435582&validate_code=9206
		postMap.put("cust_type", "2");
		postMap.put("flag", "1");
		postMap.put("user_type_2", "1");
		postMap.put("user_type", "1");
		postMap.put("cust_no", user);
		postMap.put("password", pwd);
		postMap.put("validate_code",verifyCode);
		pageContent=client.postPage(AUTH_LOGIN_URL, postMap);
		boolean r=(pageContent.indexOf(user)>-1&&pageContent.indexOf("上次登录时间")>-1)?Boolean.valueOf(true):Boolean.valueOf(false);
		return r;
	}

	/**
	 * 数据采集解析（具体实施过程中要细分 降耦）
	 * @throws Exception
	 */
	protected String crawlerData() throws Exception {
		//个人对账
		String perComInfoUrl="http://www.hzgjj.gov.cn:8080/WebAccounts/perComInfo.do?flag=1";
		String pageContent=client.getPage(perComInfoUrl);
		JSONObject jsonData=new JSONObject();
		dataAnaylize(pageContent, jsonData, "perComInfoItems");
		
		//个人借款
		String lentListInfoUrl="http://www.hzgjj.gov.cn:8080/WebAccounts/lentListInfo.do";
		pageContent=client.getPage(lentListInfoUrl);
		dataAnaylize(pageContent,jsonData,"lentListInfoItems");
		
		//缴存信息
		String handperComInfoUrl="http://www.hzgjj.gov.cn:8080/WebAccounts/perComInfo.do";
		pageContent=client.getPage(handperComInfoUrl);
		tempAnaylize(pageContent, jsonData, "handperComInfoItems");
		
		//贷款进度查询
		String perCreditQryUrl="http://www.hzgjj.gov.cn:8080/WebAccounts/perCreditQry.do?action=list";
		pageContent=client.getPage(perCreditQryUrl);
		dataAnaylize(pageContent, jsonData, "perCreditQryItems");
		System.out.println(jsonData);
		return jsonData.toString();
	}

	protected void doGetCookie() throws HttpException, IOException {
		client.getPage(FIRST_REFERER_URL);
	}
	
	/**
	 * table 解析过程
	 * @param html
	 * @param jsonData
	 * @param key
	 */
	protected void dataAnaylize(String html,JSONObject jsonData,String key){
		Document doc=Jsoup.parse(html);
		Elements trs=doc.select("table.BStyle_TB tr");
		Elements headTds=trs.first().select("th");
		int lenth=headTds.size();
		String[] headInfos=new String[lenth];
		for (int i = 0; i < lenth; i++) {
			headInfos[i]=headTds.get(i).text();
		}
		
		JSONArray jsonArray=new JSONArray();
		for (int i = 1; i < trs.size(); i++) {
			JSONObject singleData=new JSONObject();
			Elements tds=trs.get(i).select("td");
			for (int j = 0; j < tds.size(); j++) {
				if(j==tds.size()-1){
					if(tds.get(j).select("a").attr("href").length()>0){
						singleData.put(headInfos[j], "http://www.hzgjj.gov.cn:8080"+tds.get(j).select("a").attr("href"));
					}
				}else{
					singleData.put(headInfos[j], tds.get(j).text());
				}
			}
			jsonArray.add(singleData);
		}
		jsonData.put(key, jsonArray);
	}
	
	protected void tempAnaylize(String html,JSONObject jsonData,String key){
		Document doc=Jsoup.parse(html);
		Elements trs=doc.select("table.BStyle_TB tr");
		if(trs.size()<=2){
			return ;
		}
		String[] headInfos={"序号","资金账户","资金性质","缴存单位","单位","个人","合计","缴存状态"};
		JSONArray jsonArray=new JSONArray();
		for (int i = 2; i < trs.size(); i++) {
			JSONObject singleData=new JSONObject();
			Elements tds=trs.get(i).select("td");
			for (int j = 0; j < tds.size(); j++) {
				if(j==tds.size()-1){
					singleData.put("详情", "http://www.hzgjj.gov.cn:8080"+tds.get(j).select("a").attr("href"));
				}else{
					singleData.put(headInfos[j], tds.get(j).text());
				}
			}
			jsonArray.add(singleData);
		}
		jsonData.put(key, jsonArray);
	}

	public static void main(String[] args) {
		
		HangzGonjijin engine = new HangzGonjijin("082829007900","435582");
		try {
			engine.doGetCookie();
			engine.doDownLoadPic();
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			String verifyCode = null;
			System.out.println("Type in Verification Code:");
			verifyCode = br.readLine();
			System.out.println("The Code is :" + verifyCode);
			new File("Verify_Code_Image/verify_" + engine.uuid + ".jpg").delete();
			if(engine.doVerify(verifyCode)){
				engine.crawlerData();
			}
			System.out.println();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
