"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const pages_info_index = require("./index.js");
const store_userStore = require("../../store/userStore.js");
const _sfc_main = {
  data() {
    return {
      appName: "HELLOPYMA",
      pageInfo: {},
      gap: 10,
      is_popup: false,
      popupBoxHeight: "45",
      defaultAvatarUrl: "/static/avatar.jpg",
      userInfoRaw: {
        avatarUrl: "",
        nickname: ""
      }
    };
  },
  methods: {
    // 点击头像右侧的下拉按钮显示
    openPopup() {
      this.is_popup = true;
    },
    // 点击取消按钮
    onCancle() {
      this.is_popup = false;
    },
    onChooseAvatar(e) {
      common_vendor.index.__f__("log", "at pages/info/info.vue:99", e);
      const {
        avatarUrl
      } = e.detail;
      common_vendor.index.__f__("log", "at pages/info/info.vue:103", "avatarUrl", avatarUrl);
      this.defaultAvatarUrl = avatarUrl;
      this.userInfoRaw.avatarUrl = avatarUrl;
    },
    onInput(e) {
      const nickname = e.target.value;
      common_vendor.index.__f__("log", "at pages/info/info.vue:109", "nickName input", nickname);
      this.userInfoRaw.nickname = nickname;
    },
    // 点击提交按钮
    onSubmit() {
      common_vendor.index.setStorage({
        key: "userInfo",
        data: {
          avatarUrl: this.userInfoRaw.avatarUrl,
          nickname: this.userInfoRaw.nickname
        }
      });
      Object.assign(this.userInfo, {
        avatarUrl: this.userInfoRaw.avatarUrl,
        nickname: this.userInfoRaw.nickname
      });
      this.is_popup = false;
    }
  },
  async mounted() {
    this.pageInfo = await pages_info_index.getPageInfo();
    if (this.systemInfo.screenWidth >= 768) {
      common_vendor.index.__f__("log", "at pages/info/info.vue:132", "screenWidth>=768");
      this.popupBoxHeight = "60";
    }
  },
  // 页面隐藏或者挑战时,隐藏弹出层
  // onHide() {
  // 	this.is_popup = false;
  // },
  computed: {
    systemInfo() {
      const {
        navBarHeight,
        screenWidth
      } = store_systemStore.systemStore.data;
      return {
        navBarHeight,
        screenWidth
      };
    },
    userInfo() {
      const data = store_userStore.userStore.data;
      return data;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tab_bar2 = common_vendor.resolveComponent("uni-tab-bar");
  (_easycom_uni_nav_bar2 + _easycom_uni_popup2 + _easycom_uni_tab_bar2)();
}
const _easycom_uni_nav_bar = () => "../../components/nav-bar/nav-bar.js";
const _easycom_uni_popup = () => "../../components/popup/popup.js";
const _easycom_uni_tab_bar = () => "../../components/tab-bar/tab-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_popup + _easycom_uni_tab_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return {
    a: common_vendor.p({
      title: (_a = $data.pageInfo) == null ? void 0 : _a.navTitle,
      align: (_b = $data.pageInfo) == null ? void 0 : _b.navAlgin,
      color: (_c = $data.pageInfo) == null ? void 0 : _c.navColor
    }),
    b: $options.userInfo.avatarUrl || $data.defaultAvatarUrl,
    c: common_vendor.t($options.userInfo.nickname || "--"),
    d: common_vendor.o((...args) => $options.openPopup && $options.openPopup(...args)),
    e: common_vendor.f($data.pageInfo.navList, (nav, navIndex, i0) => {
      return {
        a: common_vendor.t(nav.title),
        b: common_vendor.f(nav.item_list, (item, itemIndex, i1) => {
          return {
            a: common_vendor.t(item.unicode),
            b: common_vendor.t(item.text),
            c: itemIndex
          };
        }),
        c: navIndex
      };
    }),
    f: ((_d = $options.systemInfo) == null ? void 0 : _d.navBarHeight) + $data.gap + "px",
    g: common_vendor.t($data.appName),
    h: $options.userInfo.avatarUrl || $data.defaultAvatarUrl,
    i: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    j: $options.userInfo.nickname || $data.userInfoRaw.nickname,
    k: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    l: common_vendor.o((...args) => $options.onCancle && $options.onCancle(...args)),
    m: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args)),
    n: common_vendor.o(($event) => $data.is_popup = $event),
    o: common_vendor.p({
      height: $data.popupBoxHeight,
      show: $data.is_popup
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
