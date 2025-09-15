"use strict";
const store_systemStore = require("../../store/systemStore.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      headerHeight: 0,
      lastScrollTop: 0,
      headerTranslate: "0px",
      scrollPaddingTop: 0,
      opacity: 1
    };
  },
  mounted() {
    const headerHeight = this.systemInfo.navBarHeight;
    this.headerHeight = headerHeight;
    this.scrollPaddingTop = headerHeight;
  },
  methods: {
    onScroll(e) {
      const current = Math.max(e.detail.scrollTop, 0);
      const offset = Math.min(current, this.headerHeight);
      const isScrollingDown = current > this.lastScrollTop;
      this.headerTranslate = isScrollingDown ? `-${offset}px` : `0px`;
      this.opacity = isScrollingDown ? 1 - offset / this.headerHeight : 1;
      this.scrollPaddingTop = this.headerHeight - offset * 2;
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
    a: $data.headerHeight + "px",
    b: `translateY(${$data.headerTranslate})`,
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
