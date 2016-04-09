package com.dca.usercrawler.helpers;


import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

@Component
public class RedisClient {

	private static final Logger logger = LoggerFactory.getLogger(RedisClient.class);

	private JedisPool jedisPool;

	@Value("${redis.host}")
	private String host;

	@Value("${redis.port}")
	private int port;

	@Value("${redis.password}")
	private String password;

	@Value("${redis.maxActive}")
	private int maxActive;

	@Value("${redis.maxIdle}")
	private int maxIdle;

	@Value("${redis.companyKey}")
	private String companyKey;

	// ms
	private static final int TIMEOUT = 6000;

	// ms
	private static final int MAX_WAIT = 6000;

	@PostConstruct
	public void postConstruct() {
		JedisPoolConfig config = new JedisPoolConfig();
		config.setMaxTotal(maxActive);
		config.setMaxIdle(maxIdle);

		config.setMaxWaitMillis(MAX_WAIT);
		config.setTestOnBorrow(true);
		jedisPool = new JedisPool(config, host, port, TIMEOUT, null);
	}

	public void addMapValue(Map<byte[], byte[]> map) {
		Jedis jedis = null;
		boolean borrowOrOprSuccess = true;
		try {
			if (!StringUtils.isBlank(companyKey)) {
				jedis = jedisPool.getResource();
				jedis.hmset(companyKey.getBytes(), map);
			}
		} catch (Exception e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
			logger.error("RedisUtils: Add map Value Error!", e);
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
	}
	public byte[] getMapValue(byte[] key) {
		Jedis jedis = null;
		List<byte[]> values = null;
		boolean borrowOrOprSuccess = true;
		try {
			if (!StringUtils.isBlank(companyKey)) {
				jedis = jedisPool.getResource();
				values = jedis.hmget(companyKey.getBytes(), key);
			}
		} catch (Exception e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
			logger.error("RedisClient: Hmget Error! key: " + key, e);
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
		return values.get(0);
	}

	public boolean removeMapValue(String key) {
		Jedis jedis = null;
		boolean borrowOrOprSuccess = true;
		try {
			if (!StringUtils.isBlank(companyKey)) {
				jedis = jedisPool.getResource();
				jedis.hdel(companyKey, key);
			}
		} catch (Exception e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
			logger.error("RedisClient: Hmget Error! key: " + key, e);
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
		return borrowOrOprSuccess;
	}

	public boolean mapExistKey(String key) {
		Jedis jedis = null;
		boolean borrowOrOprSuccess = true;
		boolean exist = false;
		try {
			if (!StringUtils.isBlank(companyKey)) {
				jedis = jedisPool.getResource();
				exist = jedis.hexists(companyKey, key);
			}
		} catch (Exception e) {
			borrowOrOprSuccess = false;
			if (jedis != null) {
				jedisPool.returnBrokenResource(jedis);
			}
			logger.error("RedisClient: Hmget Error! key: " + key, e);
		} finally {
			if (borrowOrOprSuccess) {
				jedisPool.returnResource(jedis);
			}
		}
		return exist;
	}
	public static void main(String[] args) {
		System.out.println("mysteel".getBytes());
	}
}
