import compareVersions from 'compare-versions';
// 获取url参数
export function getParams(URL = window.location.href) {
  if (URL.indexOf('?') == -1) return {};
  const params = URL.split('?')[1].split('&');
  const paramJson = {};
  params.forEach(item => {
    const value = item.split('=');
    paramJson[value[0]] = value[1];
  });
  return paramJson;
}

// 浏览器判断
export const browser = {
  versions: (function () {
    var u = navigator.userAgent.toLowerCase();
    return {
      trident: u.indexOf('trident') > -1, //IE内核
      presto: u.indexOf('presto') > -1, //opera内核
      webKit: u.indexOf('applewebkit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') == -1, //火狐内核
      mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
      android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iphone') > -1, //是否为iPhone
      iPad: u.indexOf('ipad') > -1, //是否iPad
      yitongxing: u.indexOf('yitongxing') > -1, // 易通行app
      MicroMessenger: u.indexOf('micromessenger') > -1, // 微信
      WeiBo: u.indexOf('weibo') > -1 // 微博
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
// 版本号
export function judgeCurVersion() {
  let agent = navigator.userAgent;
  const num = agent.toLowerCase().lastIndexOf('yitongxing');
  const version = agent.substring(num, agent.length).split('/')[1];
  return version;
}

/**
 * 比较当前app版本号
 * @param {String} version 需要比较的版本号
 * @return {Number} 结果 -1:当前版本号小； 0：当前版本号相等； 1：当前版本号大；
 */
export function compareAppVersion(version) {
  let appVersion = judgeCurVersion();
  return compareVersions(appVersion, version);
}

/**
 * 是否当前版本号小于某版本号
 * @param {string} version 需要比较的版本号
 */
export function isAppVersionLessThan(version) {
  return compareAppVersion(version) === 1;
}

/**
 * 是否当前版本号大于某版本号
 * @param {string} version 需要比较的版本号
 */
export function isAppVersionGreetThan(version) {
  return compareAppVersion(version) === -1;
}

/**
 * 当前版本号是否等于某版本号
 * @param {string} version 需要比较的版本号
 */
export function isAppVersionEqualTo(version) {
  return compareAppVersion(version) === 0;
}

