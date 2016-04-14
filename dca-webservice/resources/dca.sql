/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50629
Source Host           : localhost:3306
Source Database       : dca

Target Server Type    : MYSQL
Target Server Version : 50629
File Encoding         : 65001

Date: 2016-04-14 17:51:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `jd_account` varchar(30) DEFAULT NULL COMMENT '京东账号',
  `jd_pwd` varchar(30) DEFAULT NULL COMMENT '京东账号密码',
  `tb_account` varchar(30) DEFAULT NULL COMMENT '淘宝账号',
  `tb_pwd` varchar(30) DEFAULT NULL COMMENT '淘宝账号密码',
  `telephone` varchar(30) DEFAULT NULL COMMENT '手机号码',
  `telephone_pwd` varchar(30) DEFAULT NULL COMMENT '手机服务密码',
  `provindentfund_account` varchar(30) DEFAULT NULL COMMENT '公积金账号',
  `provindentfund_pwd` varchar(30) DEFAULT NULL COMMENT '公积金密码',
  `social_insurance_account` varchar(30) DEFAULT NULL COMMENT '社保账号',
  `social_insurance_pwd` varchar(30) DEFAULT NULL COMMENT '社保密码',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `modifyTime` timestamp NULL DEFAULT NULL COMMENT '更改时间',
  `delstatus` tinyint(1) DEFAULT NULL COMMENT '删除状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES ('1', '1', null, null, null, null, null, null, null, null, '339005198712106210', 'xiaolan890310', '2016-04-08 00:00:00', null, null, '0');
INSERT INTO `accounts` VALUES ('2', '2', null, null, null, null, null, null, '082829007900', '435582', null, null, '2016-04-08 00:00:00', null, null, '0');

-- ----------------------------
-- Table structure for crawlers_log
-- ----------------------------
DROP TABLE IF EXISTS `crawlers_log`;
CREATE TABLE `crawlers_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `accountId` bigint(20) NOT NULL COMMENT '账号ID',
  `res_sign` varchar(10) DEFAULT NULL COMMENT '京东账号密码',
  `loginStatus` varchar(30) DEFAULT NULL COMMENT '登陆状态',
  `loginErrorMessage` varchar(100) DEFAULT NULL COMMENT '登陆错误信息',
  `crawlerStatus` varchar(20) DEFAULT NULL COMMENT '数据采集状态',
  `crawlerErrorMessage` varchar(100) DEFAULT NULL COMMENT '数据采集错误信息',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crawlers_log
-- ----------------------------
INSERT INTO `crawlers_log` VALUES ('2', '2', '2', 'PFD', '成功', null, '成功', null, '2016-04-08 00:00:00');
INSERT INTO `crawlers_log` VALUES ('3', '2', '2', 'PFD', '成功', null, '成功', null, '2016-04-08 00:00:00');
INSERT INTO `crawlers_log` VALUES ('4', '2', '2', 'PFD', '成功', null, '成功', null, '2016-04-09 17:50:52');
INSERT INTO `crawlers_log` VALUES ('5', '2', '2', 'PFD', '成功', null, '成功', null, '2016-04-08 17:33:00');
INSERT INTO `crawlers_log` VALUES ('6', '2', '2', 'PFD', '成功', null, '成功', null, '2016-04-08 17:37:26');
INSERT INTO `crawlers_log` VALUES ('7', '2', '2', 'PFD', '失败', '用户名或密码错误', null, null, '2016-04-08 17:39:04');
INSERT INTO `crawlers_log` VALUES ('8', '2', '2', 'PFD', '成功', '', '失败', 'JSONObject[\"status\"] not found.', '2016-04-09 11:33:28');
INSERT INTO `crawlers_log` VALUES ('9', '2', '2', 'PFD', '成功', '', '成功', '', '2016-04-09 11:34:30');
INSERT INTO `crawlers_log` VALUES ('10', '2', '2', 'PFD', '成功', '', '成功', '', '2016-04-09 12:03:29');
INSERT INTO `crawlers_log` VALUES ('11', '1', '1', 'ECE', '成功', '', '成功', '', '2016-04-14 11:37:45');
INSERT INTO `crawlers_log` VALUES ('12', '1', '3', 'ECE', '失败', 'com.gargoylesoftware.htmlunit.WebClient cannot be cast to com.dca.http.CrawlerClient', '', '', '2016-04-14 16:27:40');

-- ----------------------------
-- Table structure for provindent_fund_data
-- ----------------------------
DROP TABLE IF EXISTS `provindent_fund_data`;
CREATE TABLE `provindent_fund_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `userName` varchar(40) DEFAULT NULL COMMENT '用户姓名',
  `status` varchar(10) NOT NULL COMMENT '状态',
  `company` varchar(50) DEFAULT NULL COMMENT '公司名称',
  `id_card` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `fund_account` varchar(30) DEFAULT NULL COMMENT '公积金账号',
  `balance` decimal(20,3) DEFAULT NULL COMMENT '账户余额',
  `open_bank_name` varchar(30) DEFAULT NULL COMMENT '开户银行',
  `open_bank_account` varchar(30) DEFAULT NULL COMMENT '开户银行账号',
  `data` longtext COMMENT '有效数据',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `modifyTime` timestamp NULL DEFAULT NULL COMMENT '更改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of provindent_fund_data
-- ----------------------------
INSERT INTO `provindent_fund_data` VALUES ('3', '2', '082829007900', '账户正常', null, null, null, null, null, null, '{\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-08 00:00:00', null, null);
INSERT INTO `provindent_fund_data` VALUES ('4', '2', '082829007900', '账户正常', null, null, null, null, null, null, '{\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-08 00:00:00', null, null);
INSERT INTO `provindent_fund_data` VALUES ('5', '2', '082829007900', '账户正常', null, null, null, null, null, null, '{\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-08 17:29:59', null, null);
INSERT INTO `provindent_fund_data` VALUES ('6', '2', '082829007900', '账户正常', null, null, null, null, null, null, '{\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-08 17:33:26', null, null);
INSERT INTO `provindent_fund_data` VALUES ('7', '2', '082829007900', '账户正常', null, null, null, null, null, null, '{\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-08 17:37:41', null, null);
INSERT INTO `provindent_fund_data` VALUES ('8', '2', '082829007900', '正常', null, null, null, null, null, null, '{\"balance\":\"37305.24\",\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"status\":\"正常\",\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-09 11:34:30', null, null);
INSERT INTO `provindent_fund_data` VALUES ('9', '2', '082829007900', '正常', null, null, null, null, null, null, '{\"balance\":\"37305.24\",\"perComInfoItems\":[{\"序号\":\"1\",\"资金账号\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"账户余额\":\"37305.24\",\"明细\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/perBillNext.do?cname=&fund_type=10&acct_no=1010828290079017&cert_code=330124197004014739&cacct_no=\"}],\"lentListInfoItems\":[{\"序号\":\"1\",\"合同号\":\"02082003100275\",\"借款人\":\"帅正义\",\"委贷银行\":\"建行临安支行\",\"借款金额\":\"140000\",\"借款余额\":\"0\",\"\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/lentInfoDetail.do?con_no=02082003100275\"}],\"status\":\"正常\",\"handperComInfoItems\":[{\"序号\":\"1\",\"资金账户\":\"1010828290079017\",\"资金性质\":\"住房公积金\",\"缴存单位\":\"临安市经济和信息化局\",\"单位\":\"524.00\",\"个人\":\"524.00\",\"合计\":\"1048.00\",\"缴存状态\":\"正常\",\"详情\":\"http://www.hzgjj.gov.cn:8080/WebAccounts/comPerInfo.do?perFlag=3&ccust_no=0801680299&cust_no=082829007900&fund_type=10\"}],\"perCreditQryItems\":[{\"受理号\":\"20080101593\",\"姓 名\":\"帅正义\",\"购房地址\":\"锦城锦天花园3幢502室\",\"委贷银行\":\"建行临安支行\",\"当前状态\":\"贷款已结清\"}]}', '2016-04-09 12:03:29', null, null);

-- ----------------------------
-- Table structure for resource_type
-- ----------------------------
DROP TABLE IF EXISTS `resource_type`;
CREATE TABLE `resource_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `res_name` varchar(20) NOT NULL COMMENT '用户ID',
  `res_short` varchar(30) DEFAULT NULL COMMENT '京东账号',
  `res_sign` varchar(10) DEFAULT NULL COMMENT '京东账号密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource_type
-- ----------------------------
INSERT INTO `resource_type` VALUES ('1', '社保', 'social_insurance', 'SIS');
INSERT INTO `resource_type` VALUES ('2', '住房公积金', 'provient_fund', 'PFD');
INSERT INTO `resource_type` VALUES ('3', '电商', 'e_commerce', 'ECE');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(40) DEFAULT NULL COMMENT '用户姓名',
  `sex` char(1) DEFAULT NULL COMMENT '性别（F/M/N）',
  `address` varchar(200) DEFAULT NULL COMMENT '家庭地址',
  `mobile_phone` int(11) DEFAULT NULL COMMENT '移动电话',
  `fixed_phone` varchar(20) DEFAULT NULL COMMENT '固定电话',
  `identity_card_number` varchar(18) DEFAULT NULL COMMENT '身份证号码',
  `current_residence` varchar(200) DEFAULT NULL COMMENT '现居住地地址',
  `province` varchar(10) DEFAULT NULL COMMENT '省份',
  `city` varchar(10) DEFAULT NULL COMMENT '城市',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `modifyTime` timestamp NULL DEFAULT NULL COMMENT '更改时间',
  `delstatus` tinyint(1) DEFAULT NULL COMMENT '删除状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '徐刚', '男', null, null, null, '339005198712103210', null, null, null, '2016-04-08 00:00:00', null, null, '0');
INSERT INTO `users` VALUES ('2', '帅正义', '男', null, '1386803793', null, '330124197004014739', null, null, null, '2016-04-08 00:00:00', null, null, '0');
