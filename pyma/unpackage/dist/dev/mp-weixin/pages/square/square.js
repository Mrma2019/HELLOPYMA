"use strict";
const store_systemStore = require("../../store/systemStore.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      headerHeight: 0,
      lastScrollTop: 0,
      headerTranslate: "0px",
      contentTranslate: "0px"
    };
  },
  mounted() {
    const headerHeight = this.systemInfo.navBarHeight;
    this.headerHeight = headerHeight;
    this.contentTranslate = `${headerHeight}px`;
  },
  methods: {
    onScroll(e) {
      const current = e.detail.scrollTop;
      const last = this.lastScrollTop;
      if (current < 0)
        return;
      const offset = Math.min(current, this.headerHeight);
      if (current > last) {
        this.headerTranslate = `${offset * -1}px`;
        this.contentTranslate = `${this.headerHeight - offset}`;
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
    a: $data.headerHeight + "px",
    b: `translateY(${$data.headerTranslate})`,
    c: common_vendor.f(100, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    d: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    e: `translateY(${$data.contentTranslate})`
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
