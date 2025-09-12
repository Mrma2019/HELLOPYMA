"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const _sfc_main = {
  data() {
    return {
      opacity: 1,
      translateY: "0px",
      scrollPaddingTop: store_systemStore.systemStore.data.navBarHeight,
      lastScrollTop: 0
    };
  },
  methods: {
    onScroll(e) {
      common_vendor.index.__f__("log", "at pages/square/square.vue:29", e.detail.scrollTop);
      if (current < 0)
        current = 0;
      let current = e.detail.scrollTop;
      const last = this.lastScrollTop;
      if (current > last) {
        common_vendor.index.__f__("log", "at pages/square/square.vue:38", "向下滚");
        const maxScrollTop = this.systemInfo.navBarHeight;
        const offset = Math.min(current, maxScrollTop);
        this.translateY = -offset + "px";
        this.scrollPaddingTop = Math.min(this.systemInfo.navBarHeight - offset, this.systemInfo.navBarHeight);
      } else {
        common_vendor.index.__f__("log", "at pages/square/square.vue:45", "向上滚");
      }
      this.lastScrollTop = current;
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
    c: $data.opacity,
    d: common_vendor.f(100, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    e: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    f: $data.scrollPaddingTop + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
