"use strict";
const common_vendor = require("../../common/vendor.js");
const store_systemStore = require("../../store/systemStore.js");
const pages_info_index = require("./index.js");
const store_userStore = require("../../store/userStore.js");
const _sfc_main = {
  data() {
    return {
      appName: "HELLO哈喽",
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
      common_vendor.index.__f__("log", "at pages/info/info.vue:78", e);
      const {
        avatarUrl
      } = e.detail;
      common_vendor.index.__f__("log", "at pages/info/info.vue:82", "avatarUrl", avatarUrl);
      this.defaultAvatarUrl = avatarUrl;
      this.userInfoRaw.avatarUrl = avatarUrl;
    },
    onInput(e) {
      const nickname = e.target.value;
      common_vendor.index.__f__("log", "at pages/info/info.vue:88", "nickName input", nickname);
      this.userInfoRaw.nickname = nickname;
    },
    // 点击提交按钮
    onSubmit() {
      common_vendor.index.setStorage({
        key: "userInfo",
        data: {
          avatarUrl: this.userInfoRaw.avatarUrl,
          nickname: this.userInfoRaw.nickname,
          isLogin: true
        }
      });
      Object.assign(this.userInfo, {
        avatarUrl: this.userInfoRaw.avatarUrl,
        nickname: this.userInfoRaw.nickname
      });
      this.is_popup = false;
    }
  },
  async onLoad() {
    this.pageInfo = await pages_info_index.getPageInfo();
    if (store_systemStore.systemStore.data.screenWidth >= 768) {
      common_vendor.index.__f__("log", "at pages/info/info.vue:112", "screenWidth>=768");
      this.popupBoxHeight = "60";
    }
  },
  onShow() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (!userInfo.isLogin) {
      common_vendor.index.__f__("log", "at pages/info/info.vue:120", "info show", store_userStore.userStore.data.isLogin);
      this.is_popup = true;
    }
  },
  // 页面隐藏或者挑战时,隐藏弹出层
  // onHide() {
  // 	this.is_popup = false;
  // },
  computed: {
    systemInfo() {
      const data = store_systemStore.systemStore.data;
      const navBarHeight = data.navBarHeight;
      const screenWidth = data.sysInfo.screenWidth;
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
  return {
    a: common_vendor.p({
      title: $data.pageInfo.navTitle,
      align: $data.pageInfo.navAlgin,
      color: $data.pageInfo.navColor
    }),
    b: $options.userInfo.avatarUrl,
    c: common_vendor.t($options.userInfo.nickname),
    d: $options.systemInfo.navBarHeight + $data.gap + "px",
    e: common_vendor.t($data.appName),
    f: $options.userInfo.avatarUrl || $data.defaultAvatarUrl,
    g: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    h: $options.userInfo.nickname || $data.userInfoRaw.nickname,
    i: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    j: common_vendor.o((...args) => $options.onCancle && $options.onCancle(...args)),
    k: common_vendor.o((...args) => $options.onSubmit && $options.onSubmit(...args)),
    l: common_vendor.o(($event) => $data.is_popup = $event),
    m: common_vendor.p({
      height: $data.popupBoxHeight,
      show: $data.is_popup
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
