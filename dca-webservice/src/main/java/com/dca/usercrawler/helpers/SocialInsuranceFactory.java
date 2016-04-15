package com.dca.usercrawler.helpers;

import org.springframework.stereotype.Repository;

import com.dca.dto.SocialInsuranceType;
import com.dca.spring.SpringContext;
import com.dca.usercrawler.socialinsurance.BaseSocialInsuranceCrawler;
/**
 * 社保
 * @author admin
 *
 */
@SuppressWarnings("unchecked")
@Repository
public class SocialInsuranceFactory extends BaseFactory {
	
	public boolean hasCrawler(long id) {
		SocialInsuranceType socialInsuranceType = SocialInsuranceType.getSocialInsuranceTypeById(id);
		if (socialInsuranceType == null) {
			return false;
		}
		return SpringContext.getInstance().isExistBean(socialInsuranceType.getNickname());
	}

	@Override
	public BaseSocialInsuranceCrawler createCrawler(long id) {
		// TODO Auto-generated method stub
		SocialInsuranceType socialInsuranceType = SocialInsuranceType.getSocialInsuranceTypeById(id);

		return (BaseSocialInsuranceCrawler)SpringContext.getInstance().getBean(socialInsuranceType.getNickname());
	}

	@Override
	public BaseSocialInsuranceCrawler createCrawler(String name) {
		// TODO Auto-generated method stub
		SocialInsuranceType socialInsuranceType = SocialInsuranceType.getSocialInsuranceTypeByName(name);

		return (BaseSocialInsuranceCrawler)SpringContext.getInstance().getBean(socialInsuranceType.getNickname());
	}

}
