"use strict";
const common_vendor = require("../../common/vendor.js");
const store_userStore = require("../../store/userStore.js");
const store_systemStore = require("../../store/systemStore.js");
const _sfc_main = {
  data() {
    return {
      avatarWidth: 25,
      headerHeight: 0
    };
  },
  onLoad() {
    const navBarHeight = store_systemStore.systemStore.data.navBarHeight;
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".header-bar").boundingClientRect((rect) => {
      this.headerHeight = rect.height + navBarHeight;
    }).exec();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  },
  computed: {
    sysInfo() {
      const data = store_systemStore.systemStore.data;
      const navBarHeight = data.navBarHeight;
      const menuInfo = data.menuInfo;
      return {
        navBarHeight,
        avatarTop: menuInfo.bottom - menuInfo.height / 2
      };
    },
    userInfo() {
      const data = store_userStore.userStore.data;
      return {
        avatarUrl: data.avatarUrl
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $options.userInfo.avatarUrl,
    c: $data.avatarWidth + "px",
    d: $options.sysInfo.avatarTop - $data.avatarWidth / 2 + "px",
    e: $options.sysInfo.navBarHeight + "px",
    f: $data.headerHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
