package com.dca.usercrawler.helpers;

import org.springframework.stereotype.Repository;

import com.dca.dto.ProvidentFundType;
import com.dca.spring.SpringContext;
import com.dca.usercrawler.providentfund.BaseProvidentFundCrawler;
/**
 * 公积金
 * @author admin
 *
 */
@SuppressWarnings("unchecked")
@Repository
public class ProvidentFundFactory extends BaseFactory {
	

	public boolean hasCrawler(long id) {
		ProvidentFundType provindentFundType = ProvidentFundType.getProvidentFundTypeById(id);
		if (provindentFundType == null) {
			return false;
		}
		return SpringContext.getInstance().isExistBean(provindentFundType.getNickname());
	}

	@Override
	public BaseProvidentFundCrawler createCrawler(long id) {
		// TODO Auto-generated method stub
		ProvidentFundType provindentFundType = ProvidentFundType.getProvidentFundTypeById(id);

		return (BaseProvidentFundCrawler)SpringContext.getInstance().getBean(provindentFundType.getNickname());
	}

	@Override
	public BaseProvidentFundCrawler createCrawler(String name) {
		// TODO Auto-generated method stub
		ProvidentFundType provindentFundType = ProvidentFundType.getProvidentFundByName(name);

		return (BaseProvidentFundCrawler)SpringContext.getInstance().getBean(provindentFundType.getNickname());
	}

}
