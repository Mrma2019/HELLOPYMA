"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weatherStore = require("../../store/weatherStore.js");
const pages_home_index = require("./index.js");
const utils_format = require("../../utils/format.js");
require("../../store/userStore.js");
const _sfc_main = {
  data() {
    return {
      navBarHeight: 0,
      swiperHeight: 0,
      contentPanelPaddingBottom: 0,
      gap: 10,
      pageInfo: {},
      is_popup: false,
      refresherTriggered: false,
      dateInfo: {}
    };
  },
  async onLoad() {
    this.pageInfo = await pages_home_index.getPageInfo();
    this.$nextTick(() => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".swiper").boundingClientRect((rect) => {
        this.swiperHeight = rect.height;
      }).exec();
    });
    this.dateInfo = utils_format.formatDate();
  },
  onShow() {
    this.formatDateTimer = setInterval(() => {
      this.dateInfo = utils_format.formatDate();
    }, 600);
  },
  onHide() {
    this.is_popup = false;
    clearInterval(this.formatDateTimer);
  },
  methods: {
    getNavBarHeight(height) {
      this.navBarHeight = height;
    },
    setContentPanelPaddingBottom(height) {
      this.contentPanelPaddingBottom = height;
    },
    //页面跳转
    async navigatorTo(e) {
      const pagepath = e.currentTarget.dataset.pagepath;
      const isToWeather = pagepath.match(/^\/pages\/([^\/]+)/)[1] === "weather" ? true : false;
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (isToWeather && store_weatherStore.weatherStore.loading)
        return;
      if (!isToWeather && !userInfo.isLogin) {
        await common_vendor.index.showModal({
          title: "提示",
          content: "当前操作需要您授权登录后，才能使用～",
          success(res) {
            if (res.confirm) {
              common_vendor.index.switchTab({
                url: "/pages/info/info"
              });
            } else if (res.cancel) {
              common_vendor.index.__f__("log", "at pages/home/home.vue:157", "user click cancel");
            }
          }
        });
        return;
      }
      const that = this;
      common_vendor.index.navigateTo({
        url: `${pagepath}`,
        success(res) {
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            dateInfo: that.dateInfo
          });
        }
      });
    },
    async onRefresher() {
      this.refresherTriggered = true;
      await this.getData();
      this.refresherTriggered = false;
    },
    getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 600);
      });
    },
    openPopup(item) {
      if (item.is_popup) {
        this.is_popup = true;
      } else {
        this.is_popup = false;
      }
    }
  },
  computed: {
    weatherInfo() {
      const data = store_weatherStore.weatherStore.data;
      return {
        temp: (data == null ? void 0 : data.temp) || "--",
        text: (data == null ? void 0 : data.text) || "--",
        windDir: `${(data == null ? void 0 : data.windDir) || "-"} ${(data == null ? void 0 : data.windScale) || "-"}级`,
        humidity: `空气湿度 ${(data == null ? void 0 : data.humidity) || "--"}`,
        dateTitle: "当前日期 年/月/日",
        icon: data == null ? void 0 : data.icon
      };
    },
    dateParts() {
      const labels = ["Year", "Month", "Date"];
      if (!this.dateInfo.date)
        return [];
      return this.dateInfo.date.split("-").map((val, i) => {
        if (i === 0)
          val = val.slice(-2);
        return {
          value: val || "--",
          label: labels[i] || ""
        };
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_tap_bar2 = common_vendor.resolveComponent("uni-tap-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tab_bar2 = common_vendor.resolveComponent("uni-tab-bar");
  (_easycom_uni_nav_bar2 + _easycom_uni_tap_bar2 + _easycom_uni_popup2 + _easycom_uni_tab_bar2)();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_tap_bar = () => "../../components/tap-bar/tap-bar.js";
const _easycom_uni_popup = () => "../../components/popup/popup.js";
const _easycom_uni_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_tap_bar + _easycom_uni_popup + _easycom_uni_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  return {
    a: common_vendor.o($options.getNavBarHeight),
    b: common_vendor.p({
      title: $data.pageInfo.navTitle,
      align: $data.pageInfo.navAlgin,
      ["is-back"]: $data.pageInfo.isBack,
      color: $data.pageInfo.navColor
    }),
    c: common_vendor.f($data.pageInfo.swiperImageSrc, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    d: $data.navBarHeight + $data.gap + "px",
    e: $data.navBarHeight + $data.gap + $data.swiperHeight / 2 + "px",
    f: $data.swiperHeight / 2 + "px",
    g: common_vendor.n("qi-" + $options.weatherInfo.icon),
    h: common_vendor.n($options.weatherInfo.icon == 100 ? "rotate" : "breath"),
    i: common_vendor.t($options.weatherInfo.temp),
    j: common_vendor.t($data.dateInfo.time),
    k: common_vendor.t($options.weatherInfo.text),
    l: common_vendor.t($options.weatherInfo.windDir),
    m: common_vendor.t($options.weatherInfo.humidity),
    n: (_a = $data.pageInfo.pages) == null ? void 0 : _a.info_to,
    o: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    p: common_vendor.t($options.weatherInfo.dateTitle),
    q: common_vendor.f($options.dateParts, (item, index, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: common_vendor.t(item.label),
        c: index
      };
    }),
    r: common_vendor.t(((_b = $data.pageInfo.mainBtn) == null ? void 0 : _b.text) || "--"),
    s: common_vendor.t(((_c = $data.pageInfo.mainBtn) == null ? void 0 : _c.desc) || "--"),
    t: common_vendor.t((_d = $data.pageInfo.mainBtn) == null ? void 0 : _d.unicode),
    v: (_e = $data.pageInfo.pages) == null ? void 0 : _e.mainBtn_to,
    w: common_vendor.o((...args) => $options.navigatorTo && $options.navigatorTo(...args)),
    x: common_vendor.f($data.pageInfo.subBtns, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text || "--"),
        b: common_vendor.t(item.desc || "--"),
        c: common_vendor.t(item.unicode),
        d: index,
        e: common_vendor.o(($event) => $options.openPopup(item), index)
      };
    }),
    y: common_vendor.p({
      taps: $data.pageInfo.taps
    }),
    z: $data.contentPanelPaddingBottom + "px",
    A: $data.refresherTriggered,
    B: common_vendor.o((...args) => $options.onRefresher && $options.onRefresher(...args)),
    C: common_vendor.o(($event) => $data.is_popup = $event),
    D: common_vendor.p({
      height: "65",
      show: $data.is_popup
    }),
    E: common_vendor.o($options.setContentPanelPaddingBottom)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
