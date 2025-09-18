"use strict";
const utils_decode = require("../../utils/decode.js");
const pageInfoRaw = {
  navTitle: "HELLO哈喽",
  navAlgin: "left",
  navColor: "white",
  isBack: false,
  swiperImageSrc: [
    "/static/pictures/827d7d49-a85d-4c47-8773-8a9c3275c034.jpg"
  ],
  mainBtn: {
    text: "找搭子",
    desc: "进入广场",
    unicode: "&#xe675;"
  },
  subBtns: [
    {
      text: "待参加",
      desc: "进入",
      unicode: "&#xe6b6;",
      is_popup: false
    },
    {
      text: "声明",
      desc: "查看",
      unicode: "&#xe635;",
      is_popup: true
    }
  ],
  pages: {
    info_to: "/pages/weather/weather",
    mainBtn_to: "/pages/square/square",
    subBtn_to: ""
  },
  taps: [
    {
      name: "活动",
      list: [{
        text: "开发中...",
        desc: "敬请期待",
        unicode: "&#x10214;"
      }]
    },
    {
      name: "关于",
      list: [{
        text: "开发初衷",
        desc: "进入",
        unicode: "&#x10213;"
      }]
    }
  ]
};
async function getPageInfo() {
  const pageInfo = {
    ...pageInfoRaw,
    mainBtn: {
      ...pageInfoRaw.mainBtn,
      unicode: utils_decode.decodeUnicodeEntity(pageInfoRaw.mainBtn.unicode)
    },
    subBtns: pageInfoRaw.subBtns.map((btn) => ({
      ...btn,
      unicode: utils_decode.decodeUnicodeEntity(btn.unicode)
    })),
    taps: pageInfoRaw.taps.map((tab) => ({
      ...tab,
      list: tab.list.map((item) => ({
        ...item,
        unicode: utils_decode.decodeUnicodeEntity(item.unicode)
      }))
    }))
  };
  return pageInfo;
}
exports.getPageInfo = getPageInfo;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
