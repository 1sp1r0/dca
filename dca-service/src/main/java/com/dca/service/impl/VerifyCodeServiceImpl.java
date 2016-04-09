package com.dca.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import com.dca.service.VerifyCodeService;

public class VerifyCodeServiceImpl implements VerifyCodeService {

	public String input_verifyCode(File file) {
		// TODO Auto-generated method stub
		String verifyCode = "";
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(System.in));
			verifyCode = br.readLine();
		} catch (Exception e) {
			// TODO: handle exception
			try {
				if (br != null) {
					br.close();
					br = null;
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				
			}
		}
		return verifyCode;
	}

}
