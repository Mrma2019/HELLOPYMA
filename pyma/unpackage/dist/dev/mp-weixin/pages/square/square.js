"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const store_userStore = require("../../store/userStore.js");
const _sfc_main = {
  data() {
    return {
      headerHeight: 0,
      headerTranslate: "0px",
      //scroll滚动
      scrollPaddingTop: 0,
      lastScrollTop: 0,
      //头部透明度
      opacity: 1,
      avatarWidth: 30,
      avatarTop: 0,
      tapBarHeight: 0
    };
  },
  mounted() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select(".tap-bar").boundingClientRect((res) => {
      this.tapBarHeight = res.height;
      const navBarHeight = store_systemStore.systemStore.data.navBarHeight;
      this.headerHeight = this.scrollPaddingTop = navBarHeight + this.tapBarHeight;
      this.avatarTop = this.systemInfo.menuBottom - (this.systemInfo.menuHeight + this.avatarWidth) / 2;
    }).exec();
  },
  methods: {
    onScroll(e) {
      const current = Math.max(e.detail.scrollTop, 0);
      const offset = Math.min(current, this.headerHeight);
      const minDelta = 1.2;
      const delta = current - this.lastScrollTop;
      const isScrollingDown = delta > minDelta;
      const isScrollingUp = delta < -minDelta;
      if (isScrollingDown) {
        this.headerTranslate = `-${offset}px`;
        this.opacity = 1 - offset / this.headerHeight;
      } else if (isScrollingUp) {
        this.headerTranslate = "0px";
        this.opacity = 1;
      }
      this.scrollPaddingTop = this.headerHeight - offset * 1.5;
      this.lastScrollTop = current;
    }
  },
  computed: {
    userInfo() {
      const data = store_userStore.userStore.data;
      return {
        avatarUrl: data.avatarUrl
      };
    },
    systemInfo() {
      const data = store_systemStore.systemStore.data;
      const menuInfo = data.menuInfo;
      const menuHeight = menuInfo.height;
      const menuBottom = menuInfo.bottom;
      const navBarHeight = data.navBarHeight;
      return {
        menuHeight,
        menuBottom,
        navBarHeight
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $options.userInfo.avatarUrl,
    b: $data.avatarWidth + "px",
    c: $data.avatarWidth + "px",
    d: $data.avatarTop + "px",
    e: $options.systemInfo.navBarHeight + "px",
    f: `translateY(${$data.headerTranslate})`,
    g: $data.opacity,
    h: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    i: $data.scrollPaddingTop + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
