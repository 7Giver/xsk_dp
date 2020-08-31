import Vue from 'vue'
import { Message } from 'element-ui'
import moment from 'moment'

const ToastOffset = 400
/**
 * @desc 警告提示消息
 * @param message {String}
 */
function ToastWarning(message) {
  Message({
    message: message ? message : '',
    type: 'warning',
    offset: ToastOffset,
    center: true,
  })
}

/**
 * @desc 错误提示消息
 * @param message {String}
 */
function ToastError(message) {
  Message({
    message: message ? message : '',
    type: 'error',
    offset: ToastOffset,
    center: true,
  })
}

/**
 * @desc 成功提示消息
 * @param message {String}
 */
function ToastSuccess(message) {
  Message({
    message: message ? message : '',
    type: 'success',
    offset: ToastOffset,
    center: true,
  })
}

/**
 * @desc 消息提示
 * @param message {String}
 */
function ToastInfo(message) {
  Message({
    message: message ? message : '',
    type: 'info',
    offset: ToastOffset,
    center: true,
  })
}

function ToastLogin() {
  window.VUEMETHODS.openLogin()
}

/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getOS() {
  var userAgent = ("navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase()) || "";
  var vendor = ("navigator" in window && "vendor" in navigator && navigator.vendor.toLowerCase()) || "";
  var appVersion = ("navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase()) || "";

  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return "ios";
  if (/android/i.test(userAgent)) return "android";
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
  if (/mac/i.test(appVersion)) return "MacOSX";
  if (/win/i.test(appVersion)) return "windows";
  if (/linux/i.test(appVersion)) return "linux";
}

/**
 *
 * @desc 获取url参数
 * @param {String} url
 * @returns {Object}
 */
function getUrlParams(url=window.location.href) {
  let search = window.location.search;
  if (!search) {
    return false;
  }
  let href = url.split('#')[0],
    str = href.split("?")[1], //  通过"?"得到一个数组,取?后面的参数
    items = str.split("&"), //  通过"&"分割成数组
    arr, name, value,
    result = {};
  for (let i = 0; i < items.length; i++) {
    arr = items[i].split("="); //  通过"="分割出每个参数的key和value
    name = arr[0];
    value = arr[1];
    result[name] = value;
  }
  return result;
}

/**
 * @desc 判断输入值是否是数组类型
 * @param {*} val
 * @return {Boolean}
 */
function isArray(val) {
  if (!val) {
    return false
  }
  if (Object.prototype.toString.call(val) === '[object Array]') {
    return true
  }
  return false
}

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
  return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str)
}

/**
 * @desc 生成32位随机数
 * @returns {string}
 */
function getRandomNum() {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e',
    'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
    'z'
  ];
  var nums = "";
  for (var i = 0; i < 32; i++) {
    var id = parseInt(Math.random() * 61);
    nums += chars[id];
  }
  return nums;
}

/**
 * @desc 将file文件转换为可显示的url
 * @param file
 * @returns {String}
 */
function getObjectURL(file) {
  var url = null
  if (window.createObjectURL !== undefined) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL !== undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

/**
 * @desc 返回 min（包含）～ max（包含）之间的数字
 * @param min {Number}
 * @param max {Number}
 * @returns {Number}
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * @desc 将base64转换为blob
 * @param dataurl {String}
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * @desc 将blob转换为file
 * @param theBlob {Blob}
 * @param fileName {String}
 */
function blobToFile(theBlob, fileName){
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

/**
 * @desc 将base64转换成图片文件
 * @param base64 {String}
 * @param filename {String}
 * @returns {File}
 */
function dataURLtoFile(base64,filename) {
  var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

Vue.prototype.$util = {
  ToastLogin: ToastLogin,
  ToastInfo: ToastInfo,
  ToastError: ToastError,
  ToastSuccess: ToastSuccess,
  ToastWarning: ToastWarning,
  getOS: getOS,
  getUrlParams: getUrlParams,
  isArray: isArray,
  isEmptyObject: isEmptyObject,
  isPhoneNum: isPhoneNum,
  getRandomNum: getRandomNum,
  getObjectURL: getObjectURL,
  getRndInteger: getRndInteger,
  dataURLtoBlob: dataURLtoBlob,
  blobToFile: blobToFile,
  dataURLtoFile: dataURLtoFile,
  moment: moment
}