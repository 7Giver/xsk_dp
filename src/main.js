import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCropper from "vue-cropper";

import "./plugins/element.js";
import "./assets/common/util.js";
import "normalize.css";
import "animate.css";
import "./assets/common/base.less";
import { MessageBox } from "element-ui";

import * as filters from "./filters"; // global filters

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(VueCropper);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 浏览器低版本提示
  function checkBrowser() {
    var isIE =
      navigator.userAgent.indexOf("compatible") > -1 &&
      navigator.userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
    var isEdge = navigator.userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 =
      navigator.userAgent.indexOf("Trident") > -1 &&
      navigator.userAgent.indexOf("rv:11.0") > -1;
    if (isIE || isEdge || isIE11) {
      MessageBox.alert(
        "推荐您使用谷歌浏览器或者猎豹、搜狗、360安全浏览器的极速模式访问"
      );
    }
  }

  checkBrowser();
  const baseFile = store.state.baseFile;
  if (!baseFile) {
    store.commit("setBaseFile");
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  data: {
    eventVue: new Vue(),
  },
  render: (h) => h(App),
}).$mount("#app");
