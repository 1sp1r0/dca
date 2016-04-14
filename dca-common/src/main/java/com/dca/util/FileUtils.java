package com.dca.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import org.apache.commons.io.output.FileWriterWithEncoding;



/**
 * 优先使用字节流
(1)字节流
  	表示以字节为单位从stream中读取或往stream中写入信息，即io包中的inputstream类和outputstream类的派生类。通常用来读取二进制数据，如图象和声音。
(2)字符流
	以Unicode字符为导向的stream，表示以Unicode字符为单位从stream中读取或往stream中写入信息
 * @author Administrator
 *
 */
public class FileUtils {
	
	/**
	 * 以行为单位读取文件，常用于读面向行的格式化文件
	 */
	public static String readFileByLines(String path, String encoding) {
		File file = new File(path);
		if (!file.exists()) {
			System.out.println("no file exists!");
			return "";
		}
		BufferedReader reader = null;
		StringBuilder content = new StringBuilder();
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), encoding));
			String tempString = null;
			while ((tempString = reader.readLine()) != null) {
				content.append(tempString).append("\n");
			}

			return content.toString();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "";
	}

	/**
	 * 字符流读文件
	 */
	public static String readFileByCharStream(String path) {
		File file = new File(path);
		if (!file.exists()) {
			return null;
		}
		try {
			FileReader reader = new FileReader(file);
			int strTemp;
			int line = 0;
			char[] cas = new char[(int) file.length()];
			while ((strTemp = reader.read()) != -1) {
				cas[line++] = (char) strTemp;
			}
			reader.close();
			return new String(cas);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 字符流写文件
	 */
	public synchronized static boolean writeByCharStream(String file, String content, String encode, boolean appended) {
		File parentPath = new File(file.substring(0, file.lastIndexOf(File.separator)));
		if (!parentPath.exists()) {
			parentPath.mkdirs();
		}
		try {
			FileWriterWithEncoding out = new FileWriterWithEncoding(new File(file), encode, appended);
			out.write(content);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 字节流读文件
	 */
	public static String readStream(String path) {
		File file = new File(path);
		if (!file.exists()) {
			return null;
		}
		try {
			InputStream in = new FileInputStream(file);
			int line = 0;
			int temp;
			byte[] b = new byte[in.available()];
			while ((temp = in.read()) != -1) {
				b[line++] = (byte) temp;
			}
			in.close();
			return new String(b);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 字节流读文件
	 */
	public byte[] readByteStream(String filepath) {
		File file = new File(filepath);
		long len = file.length();
		byte[] bytes = new byte[(int) len];
		try {
			BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(file));
			int r = bufferedInputStream.read(bytes);
			if (r != len)
				throw new IOException("读取文件不正确");
			bufferedInputStream.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return bytes;
	}

	/**
	 * 字节流写文件
	 */
	public static void writeStream(String file, String content, boolean appended) {
		File parentPath = new File(file.substring(0, file.lastIndexOf(File.separator)));
		if (!parentPath.exists()) {
			parentPath.mkdirs();
		}
		try {
			OutputStream out = new FileOutputStream(new File(file), appended);
			out.write(content.getBytes());
			out.flush();
			out.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}
			
			
		
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		FileUtils.writeByCharStream("C:\\Users\\prcsteel\\Desktop\\test.txt", "123\r\n456", "utf-8", true);
	}
}
