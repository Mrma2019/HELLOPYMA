"use strict";
const utils_decode = require("../../utils/decode.js");
const pageInfo = {
  navTitle: "我的",
  navAlgin: "left",
  navColor: "black",
  isBack: false,
  navList: [{
    unicode: utils_decode.decodeUnicodeEntity("&#x10213;"),
    text: "活动"
  }, {
    unicode: utils_decode.decodeUnicodeEntity("&#x10213;"),
    text: "动态"
  }]
};
async function getPageInfo() {
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/index.js.map
