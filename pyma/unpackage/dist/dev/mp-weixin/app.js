"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_weather = require("./utils/weather.js");
require("./store/formatStore.js");
const utils_system = require("./utils/system.js");
const store_userStore = require("./store/userStore.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/info/info.js";
  "./pages/weather/weather.js";
  "./pages/square/square.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Launch");
    utils_weather.getWeather();
    utils_system.getSystemInfo();
    this.getUserInfo();
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:19", "App Show");
    const lastTime = common_vendor.index.getStorageSync("lastGetWeatherTime");
    const now = /* @__PURE__ */ new Date();
    if (now - lastTime > 30 * 60 * 1e3) {
      utils_weather.getWeather();
      common_vendor.index.setStorageSync("lastGetWeatherTime", now);
    }
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:29", "App Hide");
    clearInterval(this.formatTimer);
  },
  methods: {
    getUserInfo() {
      common_vendor.index.getStorage({
        key: "userInfo",
        success: (res) => {
          common_vendor.index.__f__("log", "at App.vue:37", "storage", res.data);
          store_userStore.userStore.data = res.data;
        }
      });
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
