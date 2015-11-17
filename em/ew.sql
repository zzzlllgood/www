/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50540
Source Host           : localhost:3306
Source Database       : ew

Target Server Type    : MYSQL
Target Server Version : 50540
File Encoding         : 65001

Date: 2015-09-10 22:59:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cl_urg`
-- ----------------------------
DROP TABLE IF EXISTS `cl_urg`;
CREATE TABLE `cl_urg` (
  `eid` varchar(64) NOT NULL,
  `utype` varchar(32) DEFAULT NULL,
  `uemail` varchar(64) DEFAULT NULL,
  `upwd` varchar(64) DEFAULT NULL,
  `ucreate` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cl_urg
-- ----------------------------
INSERT INTO `cl_urg` VALUES ('bfad49f1d022ce200853475b86dd83c7', '0', 'sssss@ddd.com', 'ddddddd', '2015-09-10 22:17:11');
INSERT INTO `cl_urg` VALUES ('5204e3efb5569142b3e07d8a06e83f92', '1', 'tttttttt@aa.com', 'ttttttt', '2015-09-10 21:53:31');
INSERT INTO `cl_urg` VALUES ('f60518814e457243fb530cb216b686b1', '0', 'XXXX@DDD.COM', 'SSSS@DDD', '2015-09-10 22:21:24');
INSERT INTO `cl_urg` VALUES ('2104029996e5a845e9557c0c27b40884', '0', 'V@x.com', 'ssssss', '2015-09-10 22:23:28');
INSERT INTO `cl_urg` VALUES ('43ccd0c23b5089f6ab51f03779ff49e6', '1', 'ddddd@DDd.com', 'dddd@xx', '2015-09-10 22:23:56');
INSERT INTO `cl_urg` VALUES ('6c1ad86cab10cde1f4124474fc897145', '1', 'xxx@sss.com', 'sssssss', '2015-09-10 22:26:03');
INSERT INTO `cl_urg` VALUES ('bc1f2da5ab5825047a938f3e24ad100f', '1', 'ssssss@sssaa.com', 'ssssss', '2015-09-10 22:28:31');
INSERT INTO `cl_urg` VALUES ('8316735e64736c6b2e6833add7613cca', '1', 'vv@aa.com', 'aaaaaaa', '2015-09-10 22:30:46');
INSERT INTO `cl_urg` VALUES ('72ea208ec34bae1c1ba56b00540d4a63', '1', 'CCCCCCCC@CCC.COM', 'SSSSST6', '2015-09-10 22:31:53');
INSERT INTO `cl_urg` VALUES ('ee6e4f3429f70c73b434ad94e90708eb', '1', 'xxx@ddd.com', 'aaaaaaaa', '2015-09-10 22:33:44');
