"use strict";
const common_vendor = require("../common/vendor.js");
const store_systemStore = require("../store/systemStore.js");
async function getSystemInfo() {
  return new Promise((resolve) => {
    const sysInfo = common_vendor.index.getWindowInfo();
    const menuInfo = common_vendor.index.getMenuButtonBoundingClientRect();
    common_vendor.index.__f__("log", "at utils/system.js:7", menuInfo);
    const navBarHeight = menuInfo.top * 2 + menuInfo.height - sysInfo.statusBarHeight;
    sysInfo.screenWidth;
    store_systemStore.systemStore.data.sysInfo = sysInfo;
    store_systemStore.systemStore.data.menuInfo = menuInfo;
    store_systemStore.systemStore.data.navBarHeight = navBarHeight;
    resolve("set sysInfo sucess");
  });
}
exports.getSystemInfo = getSystemInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
