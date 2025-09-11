"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scrollTop: 0,
      headerOpacity: 0,
      // 头部透明度
      headerTitle: "",
      // 动态标题
      titleShowHeight: 100
      // 滚动多少显示标题
    };
  },
  methods: {
    onScroll(e) {
      this.scrollTop = e.detail.scrollTop;
      const maxScroll = 150;
      let opacity = this.scrollTop / maxScroll;
      if (opacity > 1)
        opacity = 1;
      this.headerOpacity = opacity;
      this.headerTitle = this.scrollTop > this.titleShowHeight ? "首页" : "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.headerTitle),
    b: `rgba(29,155,240,${$data.headerOpacity})`,
    c: common_vendor.f(50, (i, k0, i0) => {
      return {
        a: common_vendor.t(i),
        b: i
      };
    }),
    d: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
