"use strict";
const store_systemStore = require("../../store/systemStore.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      opacity: 1,
      translateY: "0px"
    };
  },
  methods: {
    onScroll(e) {
      let current = e.detail.scrollTop;
      if (current < 0)
        current = 0;
      const maxScrollTop = this.systemInfo.navBarHeight;
      const offset = Math.min(current, maxScrollTop);
      this.translateY = -offset + "px";
    }
  },
  computed: {
    systemInfo() {
      const {
        navBarHeight
      } = store_systemStore.systemStore.data;
      return {
        navBarHeight
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.systemInfo.navBarHeight + "px",
    b: `translateY(${$data.translateY})`,
    c: common_vendor.f(100, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    d: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    e: $options.systemInfo.navBarHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
