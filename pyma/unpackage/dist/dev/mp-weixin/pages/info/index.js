"use strict";
const utils_decode = require("../../utils/decode.js");
const pageInfoRaw = {
  navTitle: "我的",
  navAlgin: "left",
  navColor: "black",
  isBack: false,
  navList: [
    {
      title: "我的发布",
      item_list: [
        {
          unicode: "&#xe669;",
          text: "活动"
        },
        {
          unicode: "&#xe605;",
          text: "动态"
        }
      ]
    },
    {
      title: "设置",
      item_list: [
        {
          unicode: "&#xe616;",
          text: "退出登录"
        }
      ]
    }
  ]
};
async function getPageInfo() {
  const pageInfo = {
    ...pageInfoRaw,
    navList: pageInfoRaw.navList.map((category) => ({
      ...category,
      item_list: category.item_list.map((item) => ({
        ...item,
        unicode: utils_decode.decodeUnicodeEntity(item.unicode)
        // 解码 item_list 里的 unicode
      }))
    }))
  };
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/index.js.map
