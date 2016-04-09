package com.dca.demo;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FileUtils;
import org.springframework.util.ResourceUtils;

import com.dca.exceptions.CrawlerException;
import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.HttpMethod;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.WebResponseData;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlImage;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlPasswordInput;
import com.gargoylesoftware.htmlunit.html.HtmlSubmitInput;
import com.gargoylesoftware.htmlunit.html.HtmlTextInput;
import com.gargoylesoftware.htmlunit.util.Cookie;
import com.gargoylesoftware.htmlunit.util.NameValuePair;
import com.gargoylesoftware.htmlunit.util.WebConnectionWrapper;

public class Taobao3{
	protected static final List<NameValuePair> JAVASCRIPT_HEADERS = new ArrayList<NameValuePair>();
    
    private static final String LOGIN_PAGE = "https://auth.alipay.com/login/index.htm";
    
    
    private static final String VERIFY_CODE_URL = "https://auth.alipay.com/login/verifyCheckCode.json";
    
    
    private Map<String, String> javascripts = new HashMap<String, String>();
    
    static {
        NameValuePair contentType = new NameValuePair("content-type", "application/javascript");
        JAVASCRIPT_HEADERS.add(contentType);
    }
    
    protected BrowserVersion getBrowserVersion() {
        BrowserVersion browserVersion = BrowserVersion.FIREFOX_38.clone();
        browserVersion.setUserAgent("Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5");
        return browserVersion;
    }
    
    protected void postConstruct() {
        final String pathPrefix = "classpath:tianmaofenqi/";
        Map<String, String> jsMappings = new HashMap<String, String>();
        
        jsMappings.put("https://a.alipayobjects.com/ar/??alipay.light.base-1.1.js,alipay.tracker-1.9.js,alipay.fmsmng.monitor-1.0.js", 
                        pathPrefix + "alipay.light.base.js");
        jsMappings.put("https://a.alipayobjects.com/ar/??/arale.core-1.1.js,alipay.alipayIndexSimple.base-1.4.js,alipay.smartracker-1.1.js,alipay.heatmap.heattracker-1.2.js", 
                        pathPrefix + "arale.core.js");
        jsMappings.put("https://a.alipayobjects.com/ar/??alipay.smartracker-1.1.js", 
                        pathPrefix + "alipay.smartracker.js");
        jsMappings.put("https://a.alipayobjects.com/??seajs/seajs/2.2.3/sea.js,seajs/seajs-combo/1.0.0/seajs-combo.js,seajs/seajs-style/1.0.2/seajs-style.js,seajs/seajs-log/1.0.0/seajs-log.js,jquery/jquery/1.7.2/jquery.js,gallery/json/1.0.3/json.js,alipay-request/3.0.2/index.js", 
                        pathPrefix + "sea.js");
        jsMappings.put("https://a.alipayobjects.com/??static/ar/alipay.light.base-1.8.js,tracker-all/2.0.4/all.js,alipay/smartracker/2.0.0/smartracker.js", 
                        pathPrefix + "alipay.light.base2.js");
        jsMappings.put("https://s.tbcdn.cn/g/security/umscript/2.0.0/um.js", 
                        pathPrefix + "um.js");
        jsMappings.put("https://a.alipayobjects.com/static/ar/??alipay.light.base-1.10.js,alipay.light.page-1.15-sizzle.js,alipay.security.base-1.8.js,alipay.security.utils.chromeExtension-1.1.js,alipay.security.edit-1.22.js,alipay.security.utils.pcClient-1.1.js,alipay.security.cert-1.5.js,alipay.security.otp-1.2.js,alipay.security.mobile-1.7.js,alipay.security.ctuMobile-1.2.js,alipay.security.riskMobileBank-1.3.js,alipay.security.riskMobileAccount-1.3.js,alipay.security.riskMobileCredit-1.2.js,alipay.security.riskCertificate-1.0.js,alipay.security.riskSecurityQa-1.0.js,alipay.security.riskExpressPrivacy-1.0.js,alipay.security.checkCode-1.1.js,alipay.security.rds-1.0.js,alipay.security.barcode-1.1.js,alipay.security.riskOneKeyConfirm-1.2.js,alipay.security.riskSudoku-1.0.js,alipay.security.riskOriginalAccountMobile-1.0.js,alipay.security.riskOriginalSecurityQa-1.0.js,alipay.security.core-1.21.js",
                        pathPrefix + "alipay.light.base3.js");
        jsMappings.put("https://a.alipayobjects.com/static/ar/alipay.security.deviceid-1.4.js", 
                        pathPrefix + "alipay.security.deviceid.js");
        
        // https://rds.alipay.com/ua_authcenter_login.js?t=20150225
        
        jsMappings.put("https://a.alipayobjects.com:443/authcenter/login/1.2.4/js/login.js", 
                pathPrefix + "login.js");
        jsMappings.put("https://a.alipayobjects.com:443/??alipay/storex/1.0.1/storex.js,alipay/object-shim/1.0.0/object-shim.js,arale/base/1.1.1/base.js,arale/class/1.1.0/class.js,arale/events/1.1.0/events.js,arale/tip/1.1.3/tip.js,arale/popup/1.1.1/popup.js,arale/overlay/1.1.1/overlay.js,arale/position/1.0.1/position.js,arale/iframe-shim/1.0.2/iframe-shim.js,arale/widget/1.1.1/widget.js,arale/validator/0.9.5/validator.js,arale/placeholder/1.1.0/placeholder.js,arale/autocomplete/1.2.2/autocomplete.js,arale/templatable/0.9.1/templatable.js,gallery/store/1.3.7/store.js,gallery/handlebars/1.0.2/handlebars.js,gallery/handlebars/1.0.2/runtime.js", 
                pathPrefix + "storex.js");
        jsMappings.put("https://a.alipayobjects.com:443/alipay/??monitor/2.3.1/monitor.js,sensinfo/1.2.0/sensinfo.js", 
                pathPrefix + "monitor.js");
        
        jsMappings.put("https://a.alipayobjects.com:443/arale/detector/1.2.1/detector.js", 
                pathPrefix + "detector.js");
        jsMappings.put("https://a.alipayobjects.com:443/alipay/qrcode/1.0.3/qrcode.js", 
                pathPrefix + "qrcode.js");
        jsMappings.put("https://a.alipayobjects.com/ar/??/arale.class-1.0.js,arale.tmpl-1.0.js,arale.aspect-1.0.js,aralex.base-1.1.js,aralex.utils.IframeShim-1.2.js,arale.fx-1.1.js,aralex.switchable-1.1.js,aralex.slider.ScrollSlider-1.5.js,aralex.slider.FadeSlider-1.2.js,alipay.alipayIndexSimple.main-1.4.js",
                pathPrefix + "arale.class.js");
        
        jsMappings.put("https://a.alipayobjects.com/u/js/201312/1hGWbQWsSr.js", 
                pathPrefix + "1hGWbQWsSr.js");
        jsMappings.put("https://a.alipayobjects.com/u/cschannel/js/201502/4QHjv5Tn2z.js", 
                pathPrefix + "4QHjv5Tn2z.js");
        jsMappings.put("https://a.alipayobjects.com/u/ecmng/js/201405/2kDRU5oFW1.js", 
                pathPrefix + "2kDRU5oFW1.js");
        jsMappings.put("https://a.alipayobjects.com/u/ecmng/js/201405/2dSwIIccgH.js", 
                pathPrefix + "2dSwIIccgH.js");
        jsMappings.put("https://a.alipayobjects.com/u/js/201311/1acIoVU1Xx.js", 
                pathPrefix + "1acIoVU1Xx.js");
        
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

//        getLogger().debug("Get login page: {} for user {} with account {}", LOGIN_PAGE, userId, username);
        CustomWebConnectionWrapper webConnWrapper = new CustomWebConnectionWrapper(webClient);
        webClient.setWebConnection(webConnWrapper);
        
        final HtmlPage loginPage = webClient.getPage(LOGIN_PAGE);
        
        int jobs = webClient.waitForBackgroundJavaScript(10000);
//        getLogger().debug("Wait for background JS to complete: {}", jobs);
        
//        writeFile(folder, getFilename(username, "login.html"), loginPage.asXml());
        
        // get ctoken cookie
        Set<Cookie> cookies = webClient.getCookieManager().getCookies();
        String ctoken = null;
        for (Cookie cookie : cookies) {
//            getLogger().debug("{} = {}", cookie.getName(), cookie.getValue());
            if (cookie.getName().equalsIgnoreCase("ctoken")) {
                ctoken = cookie.getValue();
            }
        }
        
        if (ctoken == null) {
        	System.out.println("登录失败");
//            return new LoginData("登录失败");
        }
        
        // get verifyCode and verify it
        HtmlImage authCodeImg = (HtmlImage) loginPage.querySelector("#J-checkcode-img");
        String imgUrl = authCodeImg.getSrcAttribute();
        
        WebResponse imgResponse = webClient.loadWebResponse(new WebRequest(new URL(imgUrl)));
        FileUtils.copyInputStreamToFile(imgResponse.getContentAsStream(), new File("verifyCode.jpg"));
        
        Thread.sleep(45 * 1000);
        String verifyCode = FileUtils.readFileToString(new File("verifyCode.txt"));
        
        List<NameValuePair> verifyCodeParams = new ArrayList<NameValuePair>();
        verifyCodeParams.add(new NameValuePair("checkCode", verifyCode));
        verifyCodeParams.add(new NameValuePair("idPrefix", ""));
        verifyCodeParams.add(new NameValuePair("timestamp", new Date().getTime() + ""));
        verifyCodeParams.add(new NameValuePair("_input_charset", "utf-8"));
        verifyCodeParams.add(new NameValuePair("checkCode", verifyCode));
        verifyCodeParams.add(new NameValuePair("ctoken", ctoken));
        
        WebRequest verifyCodeRequest = new WebRequest(new URL(VERIFY_CODE_URL), HttpMethod.POST);
        verifyCodeRequest.setRequestParameters(verifyCodeParams);
        
        WebResponse verifyCodeResponse = webClient.loadWebResponse(verifyCodeRequest);
        String response = verifyCodeResponse.getContentAsString();
        if (!response.contains("true")) {
        	System.out.println("登录失败");
//            return new LoginData("登录失败");
        }
        
        HtmlForm loginForm = (HtmlForm) loginPage.querySelector("form#login");
//        getLogger().debug("The login form: {}", loginForm);
        
        // now enter username & pwd to login
        HtmlTextInput nameInput = (HtmlTextInput) loginPage.querySelector("#J-input-user");
        nameInput.focus();
        nameInput.setValueAttribute(username); 
        nameInput.blur();
        
        HtmlPasswordInput pwdInput = (HtmlPasswordInput) loginPage.querySelector("#password_input");
        pwdInput.focus();
        pwdInput.setValueAttribute(password);
        pwdInput.blur();
        
        // enter verify-code
        HtmlTextInput verifyCodeInput = (HtmlTextInput) loginPage.querySelector("#J-input-checkcode");
        verifyCodeInput.focus();
        verifyCodeInput.type(verifyCode);
        verifyCodeInput.blur();
        
        HtmlSubmitInput buttonInput = (HtmlSubmitInput) loginPage.querySelector("#J-login-btn");
//        getLogger().debug("Login to redirect to main page: {} for user {} with account {}", "main.html", userId, username);
        
        webClient.waitForBackgroundJavaScript(10000);

        HtmlPage mainPage = buttonInput.click();

        jobs = webClient.waitForBackgroundJavaScript(30000);
//        getLogger().debug("Wait for background JS to complete: {}", jobs);  
//        writeFile(folder, getFilename(username, "main.html"), mainPage.asXml());
        
        
    }

    private class CustomWebConnectionWrapper extends WebConnectionWrapper {

        private final WebClient webClient;
        
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
            
//            if (requestURL.contains("verifyId.json")) {
//                getLogger().debug(response.getContentAsString());
//            } else if (requestURL.contains("verifyCheckCode.json")) {
//                getLogger().debug(response.getContentAsString());
//            }
            
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
//    	WebClient webClient = new WebClient();
//    	
//        String url = "http://www.fqgj.net/";
//        HtmlPage _p = webClient.getPage(url);
//        
//        System.out.println(_p.getWebResponse().toString());
        
    }
}