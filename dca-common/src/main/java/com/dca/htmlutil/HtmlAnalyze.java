package com.dca.htmlutil;

import java.util.HashSet;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.NameValuePair;

public class HtmlAnalyze {

	/**
	 * 获得标签内容
	 * 
	 * @param strText
	 *            源码字符串
	 * @param strStart
	 *            开始标记
	 * @param strEnd
	 *            结束标记
	 * @return
	 */
	public static String getTagInfo(String strText, String strStart, String strEnd) {
		try {
			int iStart = strText.indexOf(strStart);
			if (iStart != -1) {
				int iEnd = strText.indexOf(strEnd, iStart + strStart.length());
				if (iEnd != -1) {
					strText = strText.substring(iStart + strStart.length(), iEnd);
					return strText;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			return "";
		}
		return "";
	}

	/**
	 * 获取HTML网页正文内容
	 * 
	 * @param strHtml
	 * @return
	 */
	public static String getHtmlContent(String strHtml) {
		String content = "";
		try {

			Pattern p = null;
			Matcher m = null;
			String str = strHtml.toLowerCase();
			// 处理特殊的标签，目前只增加了段落标签，以后可以增加
			String exp = "<p.*?>";
			p = Pattern.compile(exp);

			m = p.matcher(str);
			str = m.replaceAll("<p>");

			p = Pattern.compile("<a.*?/a>");
			m = p.matcher(str);
			str = m.replaceAll("");

			// 将指定的标签或符号替换成指定的符号，matcherArray与replaceArray一一对应。
			String[] matcherArray = { "\r\n", "\n", "<((?i)style).*?</((?i)style)>", "<((?i)script).*?</((?i)script)>",
					"<((?i)br)>", "<((?i)br)/>", "<((?i)p)>", "</((?i)p)>", "&nbsp;", "\t", "　", "  " };
			String[] replaceArray = { "", "", "", "", "", "", "", "", "", "", " ", " " };
			for (int i = 0; i < matcherArray.length; i++) {
				p = Pattern.compile(matcherArray[i]);
				m = p.matcher(str);
				while (m.find()) {
					str = m.replaceAll(replaceArray[i]);
					m = p.matcher(str);
				}
			}
			// 将所有标签替换成<##>
			exp = "<.*?>";
			p = Pattern.compile(exp);
			m = p.matcher(str);
			str = m.replaceAll("<##>");
			// 处理标签之间的内容，将小于指定数量的信息过滤掉（过短的内容被默认为是目录或广告类型），次抽取方法是为了进行检索，故不重视信息的完整性，允许损失部分信息
			String[] tmpArray = str.split("<##>");
			StringBuffer buf = new StringBuffer();
			for (int i = 0; i < tmpArray.length; i++) {

				if (tmpArray[i].trim().length() < 14)
					continue;

				buf.append(tmpArray[i] + " ");
			}
			content = buf.toString();
			p = Pattern.compile("&[a-z]+;");
			m = p.matcher(content);
			content = m.replaceAll("");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return content;
	}

	/**
	 * <pre>
	 * 去除网页标签
	 * </pre>
	 * 
	 * @version 1.0, 2006-08-10
	 * @param strHtml
	 *            网页字符串
	 * @return 去除了网页标签的字符串
	 * @author dl
	 */
	public static String deleteTag(String strHtml) {
		if (strHtml == null || strHtml.length() == 0) {
			return "";
		}
		int nFlag = 0;
		int j = 0;
		char[] chAr = new char[strHtml.length()];
		for (int i = 0; i < strHtml.length(); ++i) {
			char chTemp = strHtml.charAt(i);
			if (chTemp == '<') {
				nFlag = 1;
			}
			if (nFlag == 0) {
				chAr[j] = chTemp;
				j++;
			}
			if (chTemp == '>') {
				nFlag = 0;
			}
		}

		String strResult = new String(chAr, 0, j);
		strResult = strResult.replaceAll("\r\n", "");
		strResult = strResult.replaceAll("\r", "");
		strResult = strResult.replaceAll("\n", "");
		strResult = strResult.replaceAll("\t", "");
		strResult = strResult.replaceAll("\\s{2,}", "");
		strResult = strResult.replaceAll("['   ']+", " ");
		strResult = strResult.trim();
		return strResult;
	}


	/**
	 * <pre>
	 * 得到两个标记之间的文本
	 * </pre>
	 * 
	 * @version 1.0, 2006-08-10
	 * @param strHtml
	 *            网页字符串
	 * @param strStart
	 *            开始标记
	 * @param strEnd
	 *            结束标记
	 * @param strRetText
	 *            标记间的文本
	 * @param bFlag
	 *            true 返回不包含标记的字符串； false 返回带标记的字符串
	 * @return 结束标记的位置
	 * @author dl
	 */
	public static int getTagText(String strHtml, String strStart, String strEnd, StringBuffer strRetText, boolean bFlag,
			int pos) {
		if (strHtml == null || strHtml.length() == 0 || strStart == null || strStart.length() == 0 || strEnd == null
				|| strEnd.length() == 0) {
			return -1;
		}
		int iSPos = strHtml.indexOf(strStart, pos);
		int iEPos = 0;
		if (iSPos != -1) {
			iEPos = strHtml.indexOf(strEnd, iSPos + strStart.length());
			if (iEPos != -1) {
				String strTemp = null;
				if (bFlag) {
					strTemp = strHtml.substring(iSPos + strStart.length(), iEPos);
				} else {
					strTemp = strHtml.substring(iSPos, iEPos + strEnd.length());
				}
				strRetText.append(strTemp);
				pos = iEPos + strEnd.length();
			} else {
				pos = -1;
			}
		} else {
			pos = -1;
		}
		return pos;
	}

	/**
	 * 3. * 判断字符串的编码 4. * 5. * @param str 6. * @return 7.
	 */
	public static String getEncoding(String str) {
		String encode = "GB2312";
		try {
			if (str.equals(new String(str.getBytes(encode), encode))) {
				String s = encode;
				return s;
			}
		} catch (Exception exception) {
		}
		encode = "ISO-8859-1";
		try {
			if (str.equals(new String(str.getBytes(encode), encode))) {
				String s1 = encode;
				return s1;
			}
		} catch (Exception exception1) {
		}
		encode = "UTF-8";
		try {
			if (str.equals(new String(str.getBytes(encode), encode))) {
				String s2 = encode;
				return s2;
			}
		} catch (Exception exception2) {
		}
		encode = "GBK";
		try {
			if (str.equals(new String(str.getBytes(encode), encode))) {
				String s3 = encode;
				return s3;
			}
		} catch (Exception exception3) {
		}
		return "";
	}

	/**
	 * 匹配图片url
	 * 
	 * @param strHtml
	 * @return
	 */
	public static String getImageUrl(String strHtml) {
		HashSet<String> set = new HashSet<String>();
		strHtml = strHtml.toLowerCase();
		String imgUrl = "";
		// Matcher m =
		// Pattern.compile("<img[^>]+src\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>").matcher(strHtml);
		Matcher m = Pattern.compile("<img.+src=\"?(.+\\.(jpg|gif|bmp|bnp|png))\"?.+>").matcher(strHtml.toLowerCase());
		while (m.find()) {
			set.add(m.group(1));
		}
		Iterator<String> it = set.iterator();
		while (it.hasNext()) {
			imgUrl += (String) it.next() + "<#@#>";
		}
		if (imgUrl.length() > 0 && imgUrl != null)
			imgUrl = imgUrl.substring(0, imgUrl.length() - 5);
		return imgUrl;
	}

	/**
	 * <br>
	 * 方法说明：通过http头得到网页编码信息 <br>
	 * 输入参数：contentheade rhttp头 <br>
	 * 返回类型：网页编码
	 */
	protected static String getContentCharSet(Header contentheader) {
		String charset = null;
		if (contentheader != null) {
			HeaderElement values[] = contentheader.getElements();
			if (values.length == 1) {
				NameValuePair param = values[0].getParameterByName("charset");
				if (param != null) {
					charset = param.getValue();
				}
			}
		}
		return charset;
	}

	/**
	 * <pre>
	 * 得到两个标记之间的文本
	 * </pre>
	 * 
	 * @version 1.0, 2006-08-10
	 * @param strHtml
	 *            网页字符串
	 * @param strStart
	 *            开始标记
	 * @param strEnd
	 *            结束标记
	 * @param strRetText
	 *            标记间的文本
	 * @return 结束标记的位置
	 * @author dl
	 */
	public static int getTagText(String strHtml, String strStart, String strEnd, StringBuffer strRetText, int pos) {
		if (strHtml == null || strHtml.length() == 0 || strStart == null || strStart.length() == 0 || strEnd == null
				|| strEnd.length() == 0 || strRetText == null) {
			strRetText = null;
			return -1;
		}
		int iSPos = strHtml.indexOf(strStart, pos);
		int iEPos = 0;
		if (iSPos != -1) {
			iEPos = strHtml.indexOf(strEnd, iSPos + strStart.length());
			if (iEPos != -1) {
				// String strTemp = Golbal.subText(strHtml, iSPos +
				// strStart.length(),iEPos);
				String strTemp = strHtml.substring(iSPos + strStart.length(), iEPos);
				strRetText.append(deleteTag(strTemp));
			} else {
				strRetText = null;
			}
		} else {
			strRetText = null;
		}
		if (strRetText != null) {
			return iEPos + strEnd.length();
		} else {
			return -1;
		}
	}
}
