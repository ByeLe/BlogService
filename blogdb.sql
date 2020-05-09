/*
Navicat MySQL Data Transfer

Source Server         : host
Source Server Version : 50149
Source Host           : localhost:3306
Source Database       : blogdb

Target Server Type    : MYSQL
Target Server Version : 50149
File Encoding         : 65001

Date: 2020-05-09 14:35:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articleinfo
-- ----------------------------
DROP TABLE IF EXISTS `articleinfo`;
CREATE TABLE `articleinfo` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` char(30) NOT NULL,
  `fileDesc` char(100) NOT NULL,
  `path` char(100) NOT NULL,
  `type` char(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for classification
-- ----------------------------
DROP TABLE IF EXISTS `classification`;
CREATE TABLE `classification` (
  `id` tinyint(4) unsigned NOT NULL AUTO_INCREMENT,
  `type` char(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
