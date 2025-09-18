"use strict";
const common_vendor = require("../../common/vendor.js");
const store_weatherStore = require("../../store/weatherStore.js");
const pages_weather_index = require("./index.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  data() {
    return {
      pageInfo: {},
      navigatorHeight: 0,
      footer: "数据来源：和风天气Api",
      date: ""
    };
  },
  methods: {
    getNavHeight(height) {
      this.navigatorHeight = height;
    }
  },
  async onLoad() {
    this.pageInfo = await pages_weather_index.getPageInfo();
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      const dateInfo = data.dateInfo;
      const {
        date,
        time,
        day
      } = dateInfo;
      this.date = `${date} ${day}`;
    });
  },
  onShow() {
    common_vendor.index.__f__("log", "at pages/weather/weather.vue:105", this.date);
  },
  computed: {
    weatherInfo() {
      var _a;
      const data = store_weatherStore.weatherStore.data;
      const gridInfo = ((_a = store_weatherStore.weatherStore.girdInfo) == null ? void 0 : _a.daily).map((item) => {
        const fd = utils_format.formatDate(item.fxDate);
        return {
          ...item,
          day: fd.day
        };
      });
      const indices = store_weatherStore.weatherStore.indices.daily[0];
      return {
        gridInfo,
        indices,
        icon: (data == null ? void 0 : data.icon) || "--",
        temp: (data == null ? void 0 : data.temp) || "--",
        text: (data == null ? void 0 : data.text) || "--",
        location: (data == null ? void 0 : data.location) || "--",
        updateTime: (data == null ? void 0 : data.obsTime.match(/\d{2}:\d{2}/)[0]) + "更新" || "--",
        cloud: `${(data == null ? void 0 : data.cloud) || "--"}%`,
        windSpeed: `${(data == null ? void 0 : data.windSpeed) || "--"}Km/h`,
        feelsLike: `${(data == null ? void 0 : data.feelsLike) || "--"}℃`
      };
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  _easycom_uni_nav_bar2();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
if (!Math) {
  _easycom_uni_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.getNavHeight),
    b: common_vendor.p({
      align: $data.pageInfo.navAlgin,
      title: $data.pageInfo.navTitle,
      color: $data.pageInfo.navColor,
      [","]: true,
      ["is-back"]: $data.pageInfo.isBack
    }),
    c: common_vendor.t($options.weatherInfo.location.name || "--"),
    d: common_vendor.t($data.date || "--"),
    e: common_vendor.t($options.weatherInfo.updateTime || "--"),
    f: common_vendor.t($options.weatherInfo.temp || "--"),
    g: common_vendor.n("qi-" + $options.weatherInfo.icon),
    h: common_vendor.n($options.weatherInfo.icon == 100 ? "rotate" : "breath"),
    i: common_vendor.t($options.weatherInfo.text || "--"),
    j: common_vendor.t($options.weatherInfo.windSpeed),
    k: common_vendor.t($options.weatherInfo.cloud),
    l: common_vendor.t($options.weatherInfo.feelsLike),
    m: common_vendor.f($options.weatherInfo.gridInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.day || "--"),
        b: common_vendor.n("qi-" + item.iconDay),
        c: common_vendor.t(item.textDay),
        d: common_vendor.t(item.tempMax || "--"),
        e: index
      };
    }),
    n: common_vendor.t($options.weatherInfo.indices.name || "--"),
    o: common_vendor.t($options.weatherInfo.indices.category || "--"),
    p: common_vendor.t($options.weatherInfo.indices.text || "--"),
    q: common_vendor.t($data.footer),
    r: $data.navigatorHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-54774d74"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/weather/weather.js.map
