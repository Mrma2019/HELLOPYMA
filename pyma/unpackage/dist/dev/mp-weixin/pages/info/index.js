"use strict";
const utils_decode = require("../../utils/decode.js");
const pageInfoRaw = {
  navTitle: "我的",
  navAlgin: "left",
  navColor: "black",
  isBack: false,
  navList: [
    {
      unicode: "&#xe669;",
      text: "活动"
    },
    {
      unicode: "&#xe7ae;",
      text: "动态"
    }
  ],
  sysNavList: [{
    unicode: "&#xe616;",
    text: "退出登录"
  }]
};
async function getPageInfo() {
  const pageInfo = {
    ...pageInfoRaw,
    navList: pageInfoRaw.navList.map((item) => ({
      ...item,
      unicode: utils_decode.decodeUnicodeEntity(item.unicode)
    })),
    sysNavList: pageInfoRaw.sysNavList.map((item) => ({
      ...item,
      unicode: utils_decode.decodeUnicodeEntity(item.unicode)
    }))
  };
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/index.js.map
