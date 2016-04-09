package com.dca.util;

import java.util.BitSet;

/**
 * 
 * @Author: yangdekun
 * @Description:
 */
public class BloomFilterUtil {
	private static final int defaultSize = 5000 << 10000;
	private static final int basic = defaultSize - 1;
	public static BitSet bits = new BitSet(defaultSize);

	public static int[] lrandom(String key) {
		int[] randomsum = new int[8];
		int random1 = hashCode(key, 1);
		int random2 = hashCode(key, 2);
		int random3 = hashCode(key, 3);
		int random4 = hashCode(key, 4);
		int random5 = hashCode(key, 5);
		int random6 = hashCode(key, 6);
		int random7 = hashCode(key, 7);
		int random8 = hashCode(key, 8);
		randomsum[0] = random1;
		randomsum[1] = random2;
		randomsum[2] = random3;
		randomsum[3] = random4;
		randomsum[4] = random5;
		randomsum[5] = random6;
		randomsum[6] = random7;
		randomsum[7] = random8;
		return randomsum;
	}

	public static int[] sameLrandom(String key) {
		int[] randomsum = new int[8];
		int random1 = hashCode(key, 1);
		int random2 = hashCode(key, 1);
		int random3 = hashCode(key, 1);
		int random4 = hashCode(key, 1);
		int random5 = hashCode(key, 1);
		int random6 = hashCode(key, 1);
		int random7 = hashCode(key, 1);
		int random8 = hashCode(key, 1);
		randomsum[0] = random1;
		randomsum[1] = random2;
		randomsum[2] = random3;
		randomsum[3] = random4;
		randomsum[4] = random5;
		randomsum[5] = random6;
		randomsum[6] = random7;
		randomsum[7] = random8;
		return randomsum;
	}

	public static boolean add(String key) {
		if (exist(key)) {
			return false;
		}
		int keyCode[] = lrandom(key);
		synchronized (bits) {
			bits.set(keyCode[0]);
			bits.set(keyCode[1]);
			bits.set(keyCode[2]);
			bits.set(keyCode[3]);
			bits.set(keyCode[4]);
			bits.set(keyCode[5]);
			bits.set(keyCode[6]);
			bits.set(keyCode[7]);
		}
		return true;
	}

	public static boolean exist(String key) {
		int keyCode[] = lrandom(key);
		synchronized (bits) {
			if (bits.get(keyCode[0]) && bits.get(keyCode[1]) && bits.get(keyCode[2]) && bits.get(keyCode[3])
					&& bits.get(keyCode[4]) && bits.get(keyCode[5]) && bits.get(keyCode[6]) && bits.get(keyCode[7])) {
				return true;
			}
		}
		return false;
	}

	public static boolean set0(String key) {
		if (exist(key)) {
			int keyCode[] = lrandom(key);
			synchronized (bits) {
				bits.clear(keyCode[0]);
				bits.clear(keyCode[1]);
				bits.clear(keyCode[2]);
				bits.clear(keyCode[3]);
				bits.clear(keyCode[4]);
				bits.clear(keyCode[5]);
				bits.clear(keyCode[6]);
				bits.clear(keyCode[7]);
			}
			return true;
		}
		return false;
	}

	public static int hashCode(String key, int Q) {
		int h = 0;
		int off = 0;
		char val[] = key.toCharArray();
		int len = key.length();
		for (int i = 0; i < len; i++) {
			h = (30 + Q) * h + val[off++];
		}
		return changeInteger(h);
	}

	public static int changeInteger(int h) {
		return basic & h;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(BloomFilterUtil.defaultSize);
		System.out.println(BloomFilterUtil.add("http://www.agrilink.cn/"));
		System.out.println(BloomFilterUtil.exist("http://www.agrilink.cn/"));
		System.out.println(BloomFilterUtil.add("http://www.agrilink.cn/"));
		// System.out.println(f.exist());

		for (int i = 0; i < 100000; i++) {
			Runnable t = new Runnable() {
				public void run() {
					// TODO Auto-generated method stub
					System.out
							.println(Thread.currentThread().getName() + BloomFilterUtil.add("http://www.agrilink.cn/"));
					;
				}
			};
			new Thread(t).start();
		}

	}
}
