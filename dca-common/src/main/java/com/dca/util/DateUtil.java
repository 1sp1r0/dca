package com.dca.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DateUtil {

	private static final String[] regexs = { "(\\d{1,})分钟前", "(\\d{1,})小时前", "(\\d{1,})天前", "(\\d{1,}) minutes? ago",
			"(\\d{1,}) hours? ago", "(\\d{1,}) days? ago" };
	/** 锁对象 */
	private static final Object lockObj = new Object();

	/** 存放不同的日期模板格式的sdf的Map */
	private static Map<String, ThreadLocal<SimpleDateFormat>> sdfMap = new HashMap<String, ThreadLocal<SimpleDateFormat>>();

	/**
	 * 返回一个ThreadLocal的sdf,每个线程只会new一次sdf
	 * 
	 * @param pattern
	 * @return
	 */
	private static SimpleDateFormat getSdf(final String pattern) {
		ThreadLocal<SimpleDateFormat> tl = sdfMap.get(pattern);

		// 此处的双重判断和同步是为了防止sdfMap这个单例被多次put重复的sdf
		if (tl == null) {
			synchronized (lockObj) {
				tl = sdfMap.get(pattern);
				if (tl == null) {
					// 只有Map中还没有这个pattern的sdf才会生成新的sdf并放入map
					// 这里是关键,使用ThreadLocal<SimpleDateFormat>替代原来直接new
					// SimpleDateFormat
					tl = new ThreadLocal<SimpleDateFormat>() {

						@Override
						protected SimpleDateFormat initialValue() {
							return new SimpleDateFormat(pattern);
						}
					};
					sdfMap.put(pattern, tl);
				}
			}
		}

		return tl.get();
	}

	/**
	 * 是用ThreadLocal
	 * <SimpleDateFormat>来获取SimpleDateFormat,这样每个线程只会有一个SimpleDateFormat
	 * 
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(Date date, String pattern) {
		return getSdf(pattern).format(date);
	}

	public static Date parse(String dateStr, String pattern) throws ParseException {
		return getSdf(pattern).parse(dateStr);
	}

	public static Timestamp getTimestampBynow() {
		return new Timestamp(new Date().getTime());
	}

	public static Timestamp getTimestampBydate(Date date) {
		return new Timestamp(date.getTime());
	}

	public static String getYYMMDDdate(Date ivalDate, String format) {
		return format(ivalDate, format);
	}

	public static Date getDate(String strDate, String format) {
		try {
			return parse(strDate, format);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static List<Date> getAllDateOfMonthandYear(int year, int iMonth) {
		List<Date> list = new ArrayList<Date>();
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, iMonth - 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		while ((cal.get(Calendar.MONTH) + 1 == iMonth) && (cal.get(Calendar.YEAR) == year)) {
			list.add(cal.getTime());
			cal.add(Calendar.DATE, 1);
		}
		return list;
	}

	public static Timestamp getbeforeDate(String strdate) {
		String nflag = "";
		Pattern p = null;
		Matcher m = null;
		for (String string : regexs) {
			p = Pattern.compile(string);
			m = p.matcher(strdate);
			if (m.find()) {
				nflag = m.group(1);
			}
			if (nflag.length() > 0) {
				if ((strdate.indexOf("分钟前") > -1) || (strdate.indexOf("minutes ago") > -1)
						|| (strdate.indexOf("minute ago") > -1)) {
					Calendar calender = Calendar.getInstance();
					calender.setTime(new Date());
					calender.add(Calendar.MINUTE, 0 - Integer.parseInt(nflag));
					return getTimestampBydate(calender.getTime());
				} else if ((strdate.indexOf("小时前") > -1) || (strdate.indexOf("hours ago") > -1)
						|| (strdate.indexOf("hour ago") > -1)) {
					Calendar calender = Calendar.getInstance();
					calender.setTime(new Date());
					calender.add(Calendar.HOUR, 0 - Integer.parseInt(nflag));
					return getTimestampBydate(calender.getTime());
				} else if ((strdate.indexOf("天前") > -1) || (strdate.indexOf("days ago") > -1)
						|| (strdate.indexOf("day ago") > -1)) {
					Calendar calender = Calendar.getInstance();
					calender.setTime(new Date());
					int inputDayOfYear = calender.get(Calendar.DAY_OF_YEAR);
					calender.set(Calendar.DAY_OF_YEAR, inputDayOfYear - Integer.parseInt(nflag));
					return getTimestampBydate(calender.getTime());
				}
				break;
			}
		}
		return formatMMdd(strdate);
	}

	public static Timestamp formatMMdd(String sdate) {
		int month = Integer.parseInt(sdate.split("月")[0]);
		int day = Integer.parseInt(sdate.split("月")[1].replace("日", ""));
		try {
			Calendar cal = Calendar.getInstance();
			if (month > (cal.get(Calendar.MONTH) + 1)) {
				return getTimestampBydate(parse((cal.get(Calendar.YEAR) - 1) + "-" + month + "-" + day, "yyyy-MM-dd"));

			} else {
				return getTimestampBydate(parse((cal.get(Calendar.YEAR)) + "-" + month + "-" + day, "yyyy-MM-dd"));
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static int compare_date(Date dt1, Date dt2) {
		try {
			if (dt1.getTime() > dt2.getTime()) {
				return 1;
			} else if (dt1.getTime() < dt2.getTime()) {
				return -1;
			} else {
				return 0;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return 0;
	}

	public static void main(String[] args) {
		System.out.println(DateUtil.getbeforeDate("07月10日"));
	}
}
