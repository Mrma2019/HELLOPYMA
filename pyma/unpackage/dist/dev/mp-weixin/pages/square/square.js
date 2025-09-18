"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const store_userStore = require("../../store/userStore.js");
const pages_square_index = require("./index.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {},
      headerHeight: 0,
      headerTranslate: "0px",
      currentTap: 0,
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
  async onLoad() {
    this.pageInfo = await pages_square_index.getPageInfo();
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
      const minDelta = 1.5;
      const delta = current - this.lastScrollTop;
      const isScrollingDown = delta > minDelta;
      const isScrollingUp = delta < -minDelta;
      if (isScrollingDown) {
        this.headerTranslate = `-${offset}px`;
        this.opacity = 1 - offset * 1.5 / this.headerHeight;
      } else if (isScrollingUp) {
        this.headerTranslate = "0px";
        this.opacity = 1;
      }
      this.scrollPaddingTop = this.headerHeight - offset * 1.2;
      this.lastScrollTop = current;
    },
    switchTap(index) {
      common_vendor.index.__f__("log", "at pages/square/square.vue:91", "currentTap", index);
      this.currentTap = index;
    },
    onChange(e) {
      const index = e.detail.current;
      this.currentTap = index;
    },
    goBack() {
      common_vendor.index.navigateBack();
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
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: $options.userInfo.avatarUrl,
    c: $data.avatarWidth + "px",
    d: $data.avatarWidth + "px",
    e: $data.avatarTop + "px",
    f: $options.systemInfo.navBarHeight + "px",
    g: common_vendor.f($data.pageInfo.tapList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: common_vendor.n(index == $data.currentTap ? "active" : ""),
        c: index,
        d: common_vendor.o(($event) => $options.switchTap(index), index)
      };
    }),
    h: `translateY(${$data.headerTranslate})`,
    i: $data.opacity,
    j: common_vendor.f($data.pageInfo.tapList, (item, index, i0) => {
      return {
        a: common_vendor.f(item.content, (content, index2, i1) => {
          return {
            a: common_vendor.t(content),
            b: index2
          };
        }),
        b: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args), index),
        c: index
      };
    }),
    k: $data.scrollPaddingTop + "px",
    l: $data.currentTap,
    m: common_vendor.o((...args) => $options.onChange && $options.onChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bc6c6b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/square/square.js.map
