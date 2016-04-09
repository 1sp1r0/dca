package com.dca.exceptions;

public class UnaccessiblePageCrawlerException extends CrawlerException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7588822417640702291L;

	public UnaccessiblePageCrawlerException(String message) {
		super(message);
	}
	
	public UnaccessiblePageCrawlerException(String message, Throwable cause) {
		super(message, cause);
	}
}
