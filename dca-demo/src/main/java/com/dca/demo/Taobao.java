package com.dca.demo;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.httpclient.HttpException;
import org.apache.ws.commons.util.Base64.DecodingException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.dca.htmlutil.HtmlAnalyze;
import com.dca.http.CrawlerClient;
import com.dca.util.SslUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 杭州公积金
 * 
 * @author admin
 *
 */
public class Taobao {

	private final static String REQUEST_NICK_CHECK_URL = "https://login.taobao.com/member/request_nick_check.do?_input_charset=utf-8";
	/**
	 * username=15802489620&ua=061%23ULVidiiaiEMiBJiyiiiiiVsBSrEdmPcIWVPJHO%
	 * 2F4MiNBqDGRGzE3F3sDav%2Fdnpc0qnCaHO%2FQ8sNQqD0x4VUCgizrarQCqhV%2Fi%
	 * 2FgoVPaCAe%2F%2FoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmHCKAAnbZFP4pF%
	 * 2B7rx05sYMo5piJnVifOcrKPwAa%2F7HBWEEUv%2BmJ23xIXrEshV%2Fi%
	 * 2FgoVIaCACReoqMyulGUcYDN%2Fd7%2BuM0HiniF5gVmVFbO%2Fb8N0%2Bnp%
	 * 2FiQ3iASzq53siniVnchx%2FkV%2Fiiu5YIaCALlffnVi0h8m7v6ajF2%2BJa8xLcY%
	 * 2Fiic4R3CC%2FpvGx9oxiniU0s6Xe2fCxLvtGsVi%2FIoWinVsiniVnchx%2Fbz%
	 * 2FiirlObG6WCOeinih30QfixiaFztoiniwvrkYxIhxETpR1WMYud5xjyeNGiEEf3Rw5yUPxbgYLX5qExofud5xjyeNMdoti39ginikiiiiplgd3AQiiiuwUOIA
	 * %2BJii%2FSVHYn0niiiIJlgdi0iiiiK%2FUOIApJJ%2FiidOgwQ2FCj4NLM%
	 * 2FiiTjylinOfoxiniU0s6zeymCxLahmJViVsF8UwaTKLvGMFfEXunMdhHUraHxiniU0svgA2%
	 * 2FCxLtgdJVixz%2FZM864SY494nc%2F1uT%2Fjau6lhHdEwjpapaRcqi%2FiimRnJYxQiVi%
	 * 2FVUR%2FJT%2FiniIr9x0KA3Yybi%2FiimRnJYxJnVi%2F9uNkPwAx8nginiQJapwCH2Kq%
	 * 2BTRyvjXQiVi%2FVUR%2FJGHiniF5gimVFHH%2Fb8N0%2Bnp%
	 * 2FiQ3iASzq53giniQJapoZVmVq%2BTReMI%2FQiVi%2FVUR%2FJGHiniF5gVmVF%2Bw%
	 * 2Fb8N0%2Bnp%2FiQ3iASzq5AHiniF5gimVFdR%2Fb8N0%2Bnp%
	 * 2FiQ3iASzq53giniQJapoZVmVq%
	 * 2BTRe81S2nVifUEnVmfh1JY7Ps2cfsn04i4eBV2AJnVifOcFKPwAaB%2BHBWEEUv%
	 * 2BmJ23xIXrEshV%2Fi%2FgoVpaCACsBoqMyulGUcYDN%2Fd7%2BuMR%
	 * 2FinigTmBCKAAiUTFP4pF%2B7rx05sYMo5piJnVifOcgKPwA706HBWEEUv%2BmJ23xIXrEshV
	 * %2Fi%2FgoxIaCAylMoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmuCKAAY56FP4pF%
	 * 2B7rx05sYMo5piJnVifOcmKPwA2h%2BHBWEEUv%2BmJ23xIXrEs%2FF%2Fi%
	 * 2F6QEN47e4dDrk8wYOVoKnh23j%2FtInoH4i8uSDF%2Fi%2FluFmVmpAixQa3Dr%
	 * 2FMViWs0AbmDNs%3D%3D
	 */

	private final static String LOGIN_POST_URL = "https://login.taobao.com/member/login.jhtml";
	/**
	 * TPL_username=15802489620&TPL_password=&ncoSig=&ncoSessionid=&ncoToken=
	 * 97712f685c38bd8403589199f7314be72d4da7b9&slideCodeShow=false&loginsite=0&
	 * newlogin=0&TPL_redirect_url=&from=tb&fc=default&style=default&css_style=&
	 * keyLogin=false&qrLogin=true&newMini=false&newMini2=false&tid=&loginType=3
	 * &minititle=&minipara=&pstrong=&sign=&need_sign=&isIgnore=&full_redirect=&
	 * popid=&callback=&guf=&not_duplite_str=&need_user_id=&poy=&gvfdcname=10&
	 * gvfdcre=&from_encoding=&sub=&TPL_password_2=
	 * 957ff0a4bf7d31b4bd94ed5e02fdd3353d80a901fa15f1e07563f866d3d4de2e085775a73d6b5dfb9355e69bbfed29fcbc93499a5f3853d6706f3a8e0887974d8796da1780da70ebbb982fff4c4a8998654b9a4a6027d0033c6aabfde83cd858b3cb6f159a4305db47df6165d25278e58c3f2589f8e41bf37718b183e0727be0
	 * &loginASR=1&loginASRSuc=1&allp=&oslanguage=zh-CN&sr=1920*1080&osVer=&
	 * naviVer=chrome%7C45.02454101&um_token=
	 * HV01PAAZ0ab812bcb781f2a2570318c0002195f8&ua=061%
	 * 23ULVidiiaiEMiBJiyiiiiiVsBSrEdmPcIWVPJHO%2F4MiNBqDGRGzE3F3sDav%
	 * 2Fdnpc0qnCaHO%2FQ8sNQqD0x4VUCgizrarQCqhV%2Fi%2FgoVPaCAe%2F%2FoqMyulGUcYDN
	 * %2Fd7%2BuMR%2FinigTmHCKAAnbZFP4pF%2B7rx05sYMo5piJnVifOcrKPwAa%2F7HBWEEUv%
	 * 2BmJ23xIXrEshV%2Fi%2FgoVIaCACReoqMyulGUcYDN%2Fd7%2BuM0HiniF5gVmVFbO%
	 * 2Fb8N0%2Bnp%2FiQ3iASzq53siniVnchx%2FkV%2Fiiu5YIaCALlffnVi0h8m7v6ajF2%
	 * 2BJa8xLcY%2Fiic4R3CC%2FpvGx9oxiniU0s6Xe2fCxLvtGsVi%2FIoWinVsiniVnchx%2Fbz
	 * %
	 * 2FiirlObG6WCOeinih30QfixiaFztoiniwvrkYxIhxETpR1WMYud5xjyeNGiEEf3Rw5yUPxbgYLX5qExofud5xjyeNMdoti39ginikiiiiplgd3AQiiiuwUOIA
	 * %2BJii%2FSVHYn0niiiIJlgdi0iiiiK%2FUOIApJJ%2FiidOgwQ2FCj4NLM%
	 * 2FiiTjylinOfoxiniU0s6zeymCxLahmJViVsF8UwaTKLvGMFfEXunMdhHUraHxiniU0svgA2%
	 * 2FCxLtgdJVixz%2FZM864SY494nc%2F1uT%2Fjau6lhHdEwjpapaRcqi%2FiimRnJYxQiVi%
	 * 2FVUR%2FJT%2FiniIr9x0KA3Yybi%2FiimRnJYxJnVi%2F9uNkPwAx8nginiQJapwCH2Kq%
	 * 2BTRyvjXQiVi%2FVUR%2FJGHiniF5gimVFHH%2Fb8N0%2Bnp%
	 * 2FiQ3iASzq53giniQJapoZVmVq%2BTReMI%2FQiVi%2FVUR%2FJGHiniF5gVmVF%2Bw%
	 * 2Fb8N0%2Bnp%2FiQ3iASzq5AHiniF5gimVFdR%2Fb8N0%2Bnp%
	 * 2FiQ3iASzq53giniQJapoZVmVq%
	 * 2BTRe81S2nVifUEnVmfh1JY7Ps2cfsn04i4eBV2AJnVifOcFKPwAaB%2BHBWEEUv%
	 * 2BmJ23xIXrEshV%2Fi%2FgoVpaCACsBoqMyulGUcYDN%2Fd7%2BuMR%
	 * 2FinigTmBCKAAiUTFP4pF%2B7rx05sYMo5piJnVifOcgKPwA706HBWEEUv%2BmJ23xIXrEshV
	 * %2Fi%2FgoxIaCAylMoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmuCKAAY56FP4pF%
	 * 2B7rx05sYMo5piJnVifOcmKPwA2h%2BHBWEEUv%2BmJ23xIXrEs%2FF%2Fi%
	 * 2F6QEN47e4dDrk8wYOVoKnh23j%2FtInoH4i8uSDF%2Fi%2FluFmVmpAixQa3Dr%
	 * 2FMViWs0AbmDNs%3D%3D
	 */

	private final static String SHOUHUO_URL = "https://member1.taobao.com/member/fresh/deliver_address.htm?spm=a1z02.1.972272805.d4912033.qDaclM";
	private String user;// 用户名
	private String pwd;// 密码
	private CrawlerClient client;
	private String uuid;
	private String _t;
	private String token_key;
	private String token_value;
	private String verify_code_url;
	private UUID imguuid = UUID.randomUUID();

	public Taobao(String user, String pwd) {
		this.user = user;
		this.pwd = pwd;
		createCrawlerClient();
	}

	/**
	 * 初始化HttpClient
	 */
	protected void createCrawlerClient() {
		System.setProperty("javax.net.ssl.trustStore", "E:/project/data-crawler-architecture/dca-deamo/jssecacerts"); 
		System.setProperty("javax.net.ssl.trustStore", "E:/project/data-crawler-architecture/dca-deamo/jssecacerts1"); 
		// TODO Auto-generated method stub
		try {
			SslUtils.ignoreSsl();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		CrawlerClient.ConstructParams params = new CrawlerClient.ConstructParams(true);
		params.setAutoRedirect(true);
		params.setAllowCircularRedirect(true);
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
		Map<String, String> headerParams = new HashMap<String, String>();
		headerParams.put("Referer", "https://login.taobao.com/member/login.jhtml");
		headerParams.put("Origin", "https://login.taobao.com");
		client.setHeaderParams(headerParams);
		LinkedHashMap<String, String> postMap = new LinkedHashMap<String, String>();
		postMap.put("username", user);
		postMap.put("ua","061%23ULVidiiaiEMiBJiyiiiiiVsBSrEdmPcIWVPJHO%2F4MiNBqDGRGzE3F3sDav%2Fdnpc0qnCaHO%2FQ8sNQqD0x4VUCgizrarQCqhV%2Fi%2FgoVPaCAe%2F%2FoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmHCKAAnbZFP4pF%2B7rx05sYMo5piJnVifOcrKPwAa%2F7HBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoVIaCACReoqMyulGUcYDN%2Fd7%2BuM0HiniF5gVmVFbO%2Fb8N0%2Bnp%2FiQ3iASzq53siniVnchx%2FkV%2Fiiu5YIaCALlffnVi0h8m7v6ajF2%2BJa8xLcY%2Fiic4R3CC%2FpvGx9oxiniU0s6Xe2fCxLvtGsVi%2FIoWinVsiniVnchx%2Fbz%2FiirlObG6WCOeinih30QfixiaFztoiniwvrkYxIhxETpR1WMYud5xjyeNGiEEf3Rw5yUPxbgYLX5qExofud5xjyeNMdoti39ginikiiiiplgd3AQiiiuwUOIA%2BJii%2FSVHYn0niiiIJlgdi0iiiiK%2FUOIApJJ%2FiidOgwQ2FCj4NLM%2FiiTjylinOfoxiniU0s6zeymCxLahmJViVsF8UwaTKLvGMFfEXunMdhHUraHxiniU0svgA2%2FCxLtgdJVixz%2FZM864SY494nc%2F1uT%2Fjau6lhHdEwjpapaRcqi%2FiimRnJYxQiVi%2FVUR%2FJT%2FiniIr9x0KA3Yybi%2FiimRnJYxJnVi%2F9uNkPwAx8nginiQJapwCH2Kq%2BTRyvjXQiVi%2FVUR%2FJGHiniF5gimVFHH%2Fb8N0%2Bnp%2FiQ3iASzq53giniQJapoZVmVq%2BTReMI%2FQiVi%2FVUR%2FJGHiniF5gVmVF%2Bw%2Fb8N0%2Bnp%2FiQ3iASzq5AHiniF5gimVFdR%2Fb8N0%2Bnp%2FiQ3iASzq53giniQJapoZVmVq%2BTRe81S2nVifUEnVmfh1JY7Ps2cfsn04i4eBV2AJnVifOcFKPwAaB%2BHBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoVpaCACsBoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmBCKAAiUTFP4pF%2B7rx05sYMo5piJnVifOcgKPwA706HBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoxIaCAylMoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmuCKAAY56FP4pF%2B7rx05sYMo5piJnVifOcmKPwA2h%2BHBWEEUv%2BmJ23xIXrEs%2FF%2Fi%2F6QEN47e4dDrk8wYOVoKnh23j%2FtInoH4i8uSDF%2Fi%2FluFmVmpAixQa3Dr%2FMViWs0AbmDNs%3D%3D");
		String pageContent = client.postPage(REQUEST_NICK_CHECK_URL, postMap);
		System.out.println(pageContent);
		postMap.clear();
		postMap.put("TPL_username", "15802489620");
		postMap.put("TPL_password", "");
		postMap.put("ncoSig", "");
		postMap.put("ncoSessionid", "");
		postMap.put("ncoToken", "97712f685c38bd8403589199f7314be72d4da7b9");
		postMap.put("slideCodeShow", "false");
		postMap.put("loginsite", "0");
		postMap.put("newlogin", "0");
		postMap.put("TPL_redirect_url", "");
		postMap.put("from", "tb");
		postMap.put("fc", "default");
		postMap.put("style", "default");
		postMap.put("css_style", "");
		postMap.put("keyLogin", "false");
		postMap.put("qrLogin", "true");
		postMap.put("newMini", "false");
		postMap.put("newMini2", "false");
		postMap.put("tid", "");
		postMap.put("loginType", "3");
		postMap.put("minititle", "");
		postMap.put("minipara", "");
		postMap.put("pstrong", "");
		postMap.put("sign", "");
		postMap.put("need_sign", "");
		postMap.put("isIgnore", "");
		postMap.put("full_redirect", "");
		postMap.put("popid", "");
		postMap.put("callback", "");
		postMap.put("guf", "");
		postMap.put("not_duplite_str", "");
		postMap.put("need_user_id", "");
		postMap.put("poy", "");
		postMap.put("gvfdcname", "10");
		postMap.put("gvfdcre", "");
		postMap.put("from_encoding", "");
		postMap.put("sub", "");
		postMap.put("TPL_password_2","957ff0a4bf7d31b4bd94ed5e02fdd3353d80a901fa15f1e07563f866d3d4de2e085775a73d6b5dfb9355e69bbfed29fcbc93499a5f3853d6706f3a8e0887974d8796da1780da70ebbb982fff4c4a8998654b9a4a6027d0033c6aabfde83cd858b3cb6f159a4305db47df6165d25278e58c3f2589f8e41bf37718b183e0727be0");
		postMap.put("loginASR", "1");
		postMap.put("loginASRSuc", "1");
		postMap.put("allp", "");
		postMap.put("oslanguage", "zh-CN");
		postMap.put("sr", "1920*1080");
		postMap.put("osVer", "");
		postMap.put("naviVer", "chrome%7C45.02454101");
		postMap.put("um_token", "HV01PAAZ0ab812bcb781f2a2570318c0002195f8");
		postMap.put("ua","061%23ULVidiiaiEMiBJiyiiiiiVsBSrEdmPcIWVPJHO%2F4MiNBqDGRGzE3F3sDav%2Fdnpc0qnCaHO%2FQ8sNQqD0x4VUCgizrarQCqhV%2Fi%2FgoVPaCAe%2F%2FoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmHCKAAnbZFP4pF%2B7rx05sYMo5piJnVifOcrKPwAa%2F7HBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoVIaCACReoqMyulGUcYDN%2Fd7%2BuM0HiniF5gVmVFbO%2Fb8N0%2Bnp%2FiQ3iASzq53siniVnchx%2FkV%2Fiiu5YIaCALlffnVi0h8m7v6ajF2%2BJa8xLcY%2Fiic4R3CC%2FpvGx9oxiniU0s6Xe2fCxLvtGsVi%2FIoWinVsiniVnchx%2Fbz%2FiirlObG6WCOeinih30QfixiaFztoiniwvrkYxIhxETpR1WMYud5xjyeNGiEEf3Rw5yUPxbgYLX5qExofud5xjyeNMdoti39ginikiiiiplgd3AQiiiuwUOIA%2BJii%2FSVHYn0niiiIJlgdi0iiiiK%2FUOIApJJ%2FiidOgwQ2FCj4NLM%2FiiTjylinOfoxiniU0s6zeymCxLahmJViVsF8UwaTKLvGMFfEXunMdhHUraHxiniU0svgA2%2FCxLtgdJVixz%2FZM864SY494nc%2F1uT%2Fjau6lhHdEwjpapaRcqi%2FiimRnJYxQiVi%2FVUR%2FJT%2FiniIr9x0KA3Yybi%2FiimRnJYxJnVi%2F9uNkPwAx8nginiQJapwCH2Kq%2BTRyvjXQiVi%2FVUR%2FJGHiniF5gimVFHH%2Fb8N0%2Bnp%2FiQ3iASzq53giniQJapoZVmVq%2BTReMI%2FQiVi%2FVUR%2FJGHiniF5gVmVF%2Bw%2Fb8N0%2Bnp%2FiQ3iASzq5AHiniF5gimVFdR%2Fb8N0%2Bnp%2FiQ3iASzq53giniQJapoZVmVq%2BTRe81S2nVifUEnVmfh1JY7Ps2cfsn04i4eBV2AJnVifOcFKPwAaB%2BHBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoVpaCACsBoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmBCKAAiUTFP4pF%2B7rx05sYMo5piJnVifOcgKPwA706HBWEEUv%2BmJ23xIXrEshV%2Fi%2FgoxIaCAylMoqMyulGUcYDN%2Fd7%2BuMR%2FinigTmuCKAAY56FP4pF%2B7rx05sYMo5piJnVifOcmKPwA2h%2BHBWEEUv%2BmJ23xIXrEs%2FF%2Fi%2F6QEN47e4dDrk8wYOVoKnh23j%2FtInoH4i8uSDF%2Fi%2FluFmVmpAixQa3Dr%2FMViWs0AbmDNs%3D%3D");
//		postMap.put("ua","");
		pageContent = client.postPage(LOGIN_POST_URL, postMap);
		String url=HtmlAnalyze.getTagInfo(pageContent, "gotoURL:\"", "\",");
		pageContent = client.getPage(url);
		System.out.println(pageContent);
		String avlidContent = "我的收货地址";
		System.out.println(client.getPage("https://member1.taobao.com/member/fresh/deliver_address.htm"));
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
			if (!detail.isEmpty())
				address_array.add(detail);
		}

		JSONObject data_json = new JSONObject();
		data_json.put("addressList", address_array);
		System.out.println(data_json);

		// //订单信息
		// pageContent=client.getPage("http://order.jd.com/center/list.action");
		// System.out.println(pageContent);
	}

	protected void doGetCookie() throws HttpException, IOException {
		String pageContent = client.getPage("https://login.taobao.com/member/login.jhtml");
		System.out.println(pageContent);
		/*
		 * Document doc=Jsoup.parse(pageContent); Elements
		 * input_elements=doc.select("form#formlogin input");
		 * uuid=input_elements.get(0).attr("value");
		 * _t=input_elements.get(6).attr("value");
		 * token_key=input_elements.get(7).attr("name");
		 * token_value=input_elements.get(7).attr("value");
		 * verify_code_url=doc.select("img#JD_Verification1").attr("src2"); File
		 * path = new File("Verify_Code_Image/"); if (!path.exists()) {
		 * path.mkdirs(); } File storeFile = new
		 * File("Verify_Code_Image/verify_" + imguuid + ".jpg");
		 * client.savePicture(verify_code_url, storeFile);
		 */
	}

	public static void main(String[] args) throws DecodingException {
		// System.out.println(Base64.encodeBase64String("992391357@qq.com".getBytes()));
		Taobao engine = new Taobao("15802489620","yang1258.");
		try {
			engine.doGetCookie();
			
//			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//			String verifyCode = null;
//			System.out.println("Type in Verification Code:");
//			verifyCode = br.readLine();
//			System.out.println("The Code is :" + verifyCode);
//			new File("Verify_Code_Image/verify_" + engine.imguuid + ".jpg").delete();
			if (engine.doVerify("")) {
				engine.crawlerData();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
