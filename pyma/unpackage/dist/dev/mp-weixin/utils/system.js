"use strict";
const common_vendor = require("../common/vendor.js");
const store_systemStore = require("../store/systemStore.js");
async function getSystemInfo() {
  const sysInfo = common_vendor.index.getWindowInfo();
  const menuInfo = common_vendor.index.getMenuButtonBoundingClientRect();
  const {
    statusBarHeight,
    screenWidth
  } = sysInfo;
  const {
    top,
    height
  } = menuInfo;
  const navBarHeight = top * 2 + height - statusBarHeight;
  store_systemStore.systemStore.data.sysInfo = sysInfo;
  store_systemStore.systemStore.data.menuInfo = menuInfo;
  store_systemStore.systemStore.data.navBarHeight = navBarHeight;
}
exports.getSystemInfo = getSystemInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
