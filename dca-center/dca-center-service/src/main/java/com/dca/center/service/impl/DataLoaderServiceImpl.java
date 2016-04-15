package com.dca.center.service.impl;

import java.math.BigDecimal;
import java.util.Date;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dca.center.model.CrawlersLog;
import com.dca.center.model.Ecommerce;
import com.dca.center.model.ProvindentFund;
import com.dca.center.service.CrawlersLogService;
import com.dca.center.service.DataLoaderService;
import com.dca.center.service.EcommerceService;
import com.dca.center.service.ProvindentFundService;
import com.dca.dto.CrawlData;

@Service("dataLoaderService")
public class DataLoaderServiceImpl implements DataLoaderService {
	@Autowired
	private ProvindentFundService provindentFundService;

	@Autowired
	private CrawlersLogService crawlerLogService;
	
	@Autowired
	private EcommerceService ecommerceService;

	public boolean dataLoader(long userId, String username, CrawlData crawlerData, String sign) {
		// TODO Auto-generated method stub
		int result = 0;
		try {
			switch (sign) {
			case "provident_fund":
				ProvindentFund record = new ProvindentFund();
				record.setData(crawlerData.getResultData().getResult());
				record.setUsername(username);
				record.setUserid(userId);
				record.setStatus(crawlerData.getResultData().getStatus());
				try {
					String strBalance=new JSONObject(crawlerData.getResultData().getResult()).getString("balance");
					record.setBalance(new BigDecimal(strBalance));
				} catch (Exception e) {
					// TODO: handle exception
				}
				record.setCreatetime(new Date());
				result = provindentFundService.insert(record);
				break;
			case "social_insurance":
				

				break;
			case "e_commerce":
				Ecommerce ecommerce=new Ecommerce();
				ecommerce.setData(crawlerData.getResultData().getResult());
				try {
					String type=new JSONObject(crawlerData.getResultData().getResult()).getString("type");
					ecommerce.setType(type);
				} catch (Exception e) {
					// TODO: handle exception
				}
				ecommerce.setUserid(userId);
				ecommerce.setUsername(username);
				ecommerce.setCreatetime(new Date());
				result = ecommerceService.insert(ecommerce);
				break;

			default:
				break;
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return result == 1 ? true : false;

	}

	public int insertCrawlerLog(long userId, long accountId, String resSign, String loginStatus, String loginErr,String crawlerStatus, String crawlerErr) {
		// TODO Auto-generated method stub
		CrawlersLog crawlersLog = new CrawlersLog();
		crawlersLog.setUserid(userId);
		crawlersLog.setAccountid(accountId);
		crawlersLog.setResSign(resSign);
		crawlersLog.setLoginstatus(loginStatus);
		crawlersLog.setLoginerrormessage(loginErr);
		crawlersLog.setCrawlerstatus(crawlerStatus);
		crawlersLog.setCrawlererrormessage(crawlerErr);
		crawlersLog.setCreatetime(new Date());
		return crawlerLogService.insert(crawlersLog);
	}

}
