package com.dca.exceptions;

public class CrawlerException extends RuntimeException {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 609146308362853506L;

	public CrawlerException(String message) {
		super(message);
	}
	
	public CrawlerException(String message, Throwable cause) {
		super(message, cause);
	}
}
