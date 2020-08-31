/*
 Navicat Premium Data Transfer

 Source Server         : 正式服
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : sh-cdb-jtiju328.sql.tencentcdb.com:61707
 Source Schema         : lv

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 24/07/2020 09:33:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lv_editor_draft
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_draft`;
CREATE TABLE `lv_editor_draft`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NULL DEFAULT 0 COMMENT '用户id',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '草稿标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '草稿内容',
  `add_time` int(11) NULL DEFAULT 0,
  `update_time` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 341 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_favor
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_favor`;
CREATE TABLE `lv_editor_favor`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nid` int(10) NULL DEFAULT 0 COMMENT '素材id',
  `type` tinyint(2) NULL DEFAULT 0 COMMENT '类型|0=素材，1=模板，2=图片',
  `group_id` int(10) NULL DEFAULT 0 COMMENT '素材分组id',
  `mid` int(10) NULL DEFAULT 0 COMMENT '用户id',
  `add_time` int(11) NULL DEFAULT 0 COMMENT '添加时间',
  `update_time` int(11) NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_framework
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_framework`;
CREATE TABLE `lv_editor_framework`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '封面',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `csid` int(11) NULL DEFAULT 0 COMMENT '所属一级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 636 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_framework_block
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_framework_block`;
CREATE TABLE `lv_editor_framework_block`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) NULL DEFAULT 0 COMMENT '所属模板id\r\n',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1007 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_framework_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_framework_category`;
CREATE TABLE `lv_editor_framework_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_framework_son_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_framework_son_category`;
CREATE TABLE `lv_editor_framework_son_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `cid` int(11) NULL DEFAULT 0 COMMENT '所属一级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 126 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_group
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_group`;
CREATE TABLE `lv_editor_group`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '分组id\r\n',
  `mid` int(10) NULL DEFAULT 0 COMMENT '用户id',
  `state` tinyint(2) NULL DEFAULT NULL COMMENT '状态|0=关闭，1=启用',
  `add_time` int(11) NULL DEFAULT 0 COMMENT '添加时间',
  `update_time` int(11) NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_picture
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_picture`;
CREATE TABLE `lv_editor_picture`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `csid` int(11) NULL DEFAULT 0 COMMENT '所属一级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `desc` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `cover` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 705 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_picture_son_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_picture_son_category`;
CREATE TABLE `lv_editor_picture_son_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `cid` int(11) NULL DEFAULT 0 COMMENT '所属一级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 137 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_picutre_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_picutre_category`;
CREATE TABLE `lv_editor_picutre_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_template
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_template`;
CREATE TABLE `lv_editor_template`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `csid` int(11) NULL DEFAULT 0 COMMENT '所属二级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `desc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `favors` int(11) NULL DEFAULT 0 COMMENT '收藏次数',
  `applys` int(11) NULL DEFAULT 0 COMMENT '使用次数',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 733 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_template_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_template_category`;
CREATE TABLE `lv_editor_template_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_template_son_category
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_template_son_category`;
CREATE TABLE `lv_editor_template_son_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `cid` int(11) NULL DEFAULT 0 COMMENT '所属一级分类',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_user_framework
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_user_framework`;
CREATE TABLE `lv_editor_user_framework`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NULL DEFAULT 0 COMMENT '用户id',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模板标题',
  `desc` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模板介绍',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板内容',
  `add_time` int(11) NULL DEFAULT 0,
  `update_time` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lv_editor_user_picture
-- ----------------------------
DROP TABLE IF EXISTS `lv_editor_user_picture`;
CREATE TABLE `lv_editor_user_picture`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  `mid` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `sort` tinyint(2) NULL DEFAULT 0 COMMENT '排序',
  `desc` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `state` tinyint(2) NULL DEFAULT 0 COMMENT '状态|0=关闭，1=启用',
  `add_time` int(10) NULL DEFAULT NULL COMMENT '添加时间',
  `update_time` int(10) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 705 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
