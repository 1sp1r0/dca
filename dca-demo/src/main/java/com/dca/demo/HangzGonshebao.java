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
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.dca.http.CrawlerClient;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 杭州社保
 * @author admin
 *
 */
public class HangzGonshebao {
	public final static String FIRST_REFERER_URL="http://wsbs.zjhz.hrss.gov.cn/index.html";
	public final static String VERIFY_CODE_URL="http://wsbs.zjhz.hrss.gov.cn/captcha.svl";
	private String user;//用户名
	private String pwd;//密码
	private CrawlerClient client;
	private UUID uuid = UUID.randomUUID();
	
	public HangzGonshebao(String user,String pwd){
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
		String auth_login_url="http://wsbs.zjhz.hrss.gov.cn/loginvalidate.html?logintype=1&captcha="+verifyCode;
		LinkedHashMap<String, String> postMap=new LinkedHashMap<String, String>();
		Map<String, String> headerParams=new HashMap<String, String>();
		headerParams.put("Referer", FIRST_REFERER_URL);
		client.setHeaderParams(headerParams);
		//type=01&persontype=03&account=339005198712106210&password=xiaolan890310&captcha1=mwpq
		postMap.put("type","01");
		postMap.put("persontype","03");
		postMap.put("account",user);
		postMap.put("password",pwd);
		postMap.put("captcha1",verifyCode);
		String pageContent=client.postPage(auth_login_url,postMap);
		if(pageContent.indexOf("'success'")>-1){
			return true;
		}
		return false;
	}

	/**
	 * 数据采集解析（具体实施过程中要细分 降耦）
	 * @throws Exception
	 */
	protected String crawlerData() throws Exception {
		//个人信息 http://wsbs.zjhz.hrss.gov.cn/person/personInfo/index.html
		
		String personInfoUrl="http://wsbs.zjhz.hrss.gov.cn/person/personInfo/index.html";
		String pageContent=client.getPage(personInfoUrl);
		JSONObject jsonData=new JSONObject();
		Document doc=Jsoup.parse(pageContent);
		Element baseInfoElement=doc.select("table.form").first();
		Element statusInfoElement=doc.select("table.grid").first();
		//基本信息为空的情况直接返回
		if(baseInfoElement==null){
			return "";
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
			return jsonData.toString();
		}
		Elements status_trs=statusInfoElement.select("tr");
		if(status_trs==null||status_trs.size()<=1){
			System.out.println(jsonData);
			return jsonData.toString();
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
			if(!singleData.isEmpty())
				jsonArray.add(singleData);
		}
		jsonData.put("statusInfoItems", jsonArray);
		System.out.println(jsonData);
		return jsonData.toString();
	}

	protected void doGetCookie() throws HttpException, IOException {
		client.getPage(FIRST_REFERER_URL);
	}
	
	
	public static void main(String[] args) {
		
		HangzGonshebao engine = new HangzGonshebao("339005198712106210","xiaolan890310");
		try {
			engine.doGetCookie();
			engine.doDownLoadPic();
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			String verifyCode = null;
			System.out.println("Type in Verification Code:");
			verifyCode = br.readLine();
			System.out.println("The Code is :" + verifyCode);
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
