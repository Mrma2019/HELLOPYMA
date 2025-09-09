"use strict";
const utils_decode = require("../../utils/decode.js");
const tabs = [
  {
    pagePath: "pages/home/home",
    unicode: "&#x10211;",
    text: "首页"
  },
  {
    pagePath: "pages/info/info",
    unicode: "&#x10212;",
    text: "我的"
  }
];
const tabList = tabs.map((item) => ({
  ...item,
  unicode: utils_decode.decodeUnicodeEntity(item.unicode)
}));
exports.tabList = tabList;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tab-bar/index.js.map
