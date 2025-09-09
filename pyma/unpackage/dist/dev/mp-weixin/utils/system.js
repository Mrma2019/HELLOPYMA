"use strict";
const common_vendor = require("../common/vendor.js");
const store_systemStore = require("../store/systemStore.js");
async function getSystemInfo() {
  return new Promise((resolve) => {
    const sysInfo = common_vendor.index.getWindowInfo();
    const menuInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    const navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
    common_vendor.index.__f__("log", "at utils/system.js:9", navBarHeight);
    store_systemStore.systemStore.data.navBarHeight = navBarHeight;
    const screenWidth = sysInfo.screenWidth;
    common_vendor.index.__f__("log", "at utils/system.js:12", "screenWidth", screenWidth);
    store_systemStore.systemStore.data.screenWidth = screenWidth;
    resolve(navBarHeight);
  });
}
exports.getSystemInfo = getSystemInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
