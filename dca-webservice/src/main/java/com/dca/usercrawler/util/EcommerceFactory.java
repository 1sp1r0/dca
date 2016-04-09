package com.dca.usercrawler.util;

import org.springframework.stereotype.Repository;

import com.dca.dto.EcommerceType;
import com.dca.spring.SpringContext;
import com.dca.usercrawler.ecommerce.BaseEcommerceCrawler;
/**
 * 电商
 * @author admin
 *
 */
@SuppressWarnings("unchecked")
@Repository
public class EcommerceFactory extends BaseFactory {
	

	public boolean hasCrawler(long id) {
		EcommerceType eCommerceType = EcommerceType.getEcommerceTypeById(id);
		if (eCommerceType == null) {
			return false;
		}
		return SpringContext.getInstance().isExistBean(eCommerceType.getNickname());
	}

	@Override
	public BaseEcommerceCrawler createCrawler(long id) {
		// TODO Auto-generated method stub
		EcommerceType eCommerceType = EcommerceType.getEcommerceTypeById(id);

		return (BaseEcommerceCrawler)SpringContext.getInstance().getBean(eCommerceType.getNickname());
	}

	@Override
	public BaseEcommerceCrawler createCrawler(String name) {
		// TODO Auto-generated method stub
		EcommerceType eCommerceType = EcommerceType.getEcommerceTypeByName(name);

		return (BaseEcommerceCrawler)SpringContext.getInstance().getBean(eCommerceType.getNickname());
	}

}
