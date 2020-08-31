"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplateCategory = getTemplateCategory;
exports.getMatrixList = getMatrixList;
exports.getConfig = getConfig;
exports.getAppList = getAppList;
exports.getTemplate = getTemplate;
exports.getQiniuToken = getQiniuToken;
exports.uploadImg = uploadImg;
exports.pushNewsData = pushNewsData;
exports.getCategory = getCategory;
exports.getBrand = getBrand;
exports.getMyArticle = getMyArticle;
exports.delMyArticle = delMyArticle;
exports.editorMyArticle = editorMyArticle;
exports.sendSMS = sendSMS;
exports.login = login;
exports.qrCode = qrCode;
exports.loginInfo = loginInfo;
exports.recordCurrentAccounts = recordCurrentAccounts;
exports.switchAccount = switchAccount;
exports.getFrameworkCategory = getFrameworkCategory;
exports.getFrameWork = getFrameWork;
exports.getPictureCategory = getPictureCategory;
exports.getPicture = getPicture;
exports.getUserPicture = getUserPicture;
exports.getDraftList = getDraftList;
exports.saveDraft = saveDraft;
exports.updateDraft = updateDraft;
exports.deleteDraft = deleteDraft;
exports.clearDraft = clearDraft;
exports.getArticleList = getArticleList;
exports.getArticle = getArticle;
exports.deleteArticle = deleteArticle;
exports.importArticle = importArticle;
exports.getUserFramework = getUserFramework;
exports.saveFramework = saveFramework;

var _http = require("./http");

function getTemplateCategory() {
  return (0, _http.get)('/Material/getTemplateCategory', {});
}

function getMatrixList(params) {
  return (0, _http.get)('/Articles/getMatrixList', params);
}

function getConfig(params) {
  return (0, _http.get)('/index/getConfig', params);
}

function getAppList(params) {
  return (0, _http.get)('/Articles/getAppList', params);
}
/**
 * @desc 获取素材详情列表
 * @param params {Object} {csid: 二级分类id}
 */


function getTemplate(params) {
  return (0, _http.get)('/Material/getTemplate', params);
}
/**
 * @desc 
 * @param params 
 */


function getQiniuToken(params) {
  return (0, _http.get)('/Material/getQiniuToken', params);
}
/**
 * @desc 上传图片
 * @param file {File}
 */


function uploadImg(file) {
  // return uploadFile('/upload/uploadImg?action=uploadimage', file)
  return (0, _http.uploadFile)('Material/uploadImg?action=uploadimage', file);
}
/**
 * @desc 发布文章
 * @param params {Object} {mid: 用户id, cover: 封面地址, s_img: 封面缩略图地址, title: 标题, desc: 副标题, content: 内容}
 */
// export function publishArticle(params) {
//   return post('/editor/publishArticle', params)
// }


function pushNewsData(params) {
  return (0, _http.post)('/Articles/pushNewsData', params);
}
/**
 * @description 获取文章分类
 * @param {*} params 
 */


function getCategory(params) {
  return (0, _http.post)("/Articles/getCategory", params);
}
/**
 * @description 获取品牌
 * @param {*} params 
 */


function getBrand(params) {
  return (0, _http.post)("/Articles/getBrand", params);
}
/**
 * @description 获取文章列表
 * @param {*} params  {userId: }
 */


function getMyArticle(params) {
  return (0, _http.post)("/Articles/getMyArticle", params);
}
/**
 * @description 删除文章
 * @param {*} params  {id: 文章id}
 */


function delMyArticle(params) {
  return (0, _http.post)("/Articles/delMyArticle", params);
}
/**
 * @description 文章详情
 * @param {*} params  {id: 文章id}
 */


function editorMyArticle(params) {
  return (0, _http.post)("/Articles/editorMyArticle", params);
}
/**
 * @desc 发送短信获取验证码
 * @param params {Object} {tel: 手机号}
 */


function sendSMS(params) {
  return (0, _http.get)('/yidun/sendSMS', params);
}
/**
 * @desc 登录
 * @param params {Object} {tel: 手机号, code: 短信验证码}
 */


function login(params) {
  return (0, _http.post)('/login/execLogin', params);
}
/**
 * @desc 登录二维码
 */


function qrCode() {
  return (0, _http.get)('/WeixinLogin/qrCode', {});
}
/**
 * @desc 
 */


function loginInfo(params) {
  return (0, _http.get)('/WeixinLogin/loginInfo', params);
}
/**
 * @desc 记录当前登录账号
 * @param params {Object} {mid}
 */


function recordCurrentAccounts(params) {
  return (0, _http.post)('/login/saveBaseInfo', params);
}
/**
 * @desc 获取关联账号
 * @param params {Object} {mid}
 */


function switchAccount(params) {
  return (0, _http.post)('/login/switchAccount', params);
}
/**
 * @desc 获取模板分类
 */


function getFrameworkCategory() {
  return (0, _http.get)('/editor/getFrameworkCategory', {});
}
/**
 * @desc 获取模板
 * @param params {Object} {csid} {page} {pagesize}
 */


function getFrameWork(params) {
  return (0, _http.get)('/editor/getFrameWork', params);
}
/**
 * @desc 获取图片分类
 */


function getPictureCategory() {
  return (0, _http.get)('/editor/getPictureCategory', {});
}
/**
 * @desc 获取图片
 * @param params {Object} {csid} {page} {pagesize}
 */


function getPicture(params) {
  return (0, _http.get)('/editor/getPicture', params);
}
/**
 * @desc 获取我的图片
 * @param params {Object} {csid} {page} {pagesize}
 */


function getUserPicture(params) {
  return (0, _http.get)('/editor/getMyPicture', params);
}
/**
 * @desc 获取我的草稿
 * @param params {Object} {mid} {page} {pagesize}
 */


function getDraftList(params) {
  return (0, _http.get)('/editor/getMyDraft', params);
}
/**
 * @desc 保存草稿
 * @param params {Object}
 */


function saveDraft(params) {
  return (0, _http.post)('/editor/saveDraft', params);
}
/**
 * @desc 更新草稿
 * @param params {Object}{id}{content}
 */


function updateDraft(params) {
  return (0, _http.post)('/editor/updateDraft', params);
}
/**
 * @desc 删除草稿
 * @param params {Object} {id}
 */


function deleteDraft(params) {
  return (0, _http.post)('/editor/deleteDraft', params);
}
/**
 * @desc 清空草稿
 * @param params
 */


function clearDraft(params) {
  return (0, _http.post)('/editor/clearDraft', params);
}
/**
 * @desc 获取我的文章
 * @param params {Object} {mid} {page} {pagesize}
 */


function getArticleList(params) {
  return (0, _http.post)('/editor/getMyArticle', params);
}
/**
 * @desc 获取某篇文章
 * @param params {Object} {id}
 */


function getArticle(params) {
  return (0, _http.post)('/editor/getArticle', params);
}
/**
 * @desc 删除文章
 * @param params {Object} {id}
 */


function deleteArticle(params) {
  return (0, _http.post)('/editor/deleteArticle', params);
}
/**
 * @desc 导入文章
 * @param params {Object} {id}
 */


function importArticle(params) {
  return (0, _http.post)('/WxSync/sync', params);
}
/**
 * @desc 获取我的模板
 * @param params {Object}
 */


function getUserFramework(params) {
  return (0, _http.get)('/editor/getMyFramework', params);
}
/**
 * @desc 保存我的模板
 * @param params {Object}
 */


function saveFramework(params) {
  return (0, _http.post)('/editor/saveFramework', params);
}