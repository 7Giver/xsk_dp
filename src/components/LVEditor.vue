<template>
  <div class="lv_editor_container">
    <vue-ueditor-wrap
      :mode="mode"
      :observerDebounceTime="100"
      :observerOptions="{
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      }"
      v-model="content"
      :config="myConfig"
      @ready="ready"
    ></vue-ueditor-wrap>
    <div class="ueditor-button-tips">
      <span></span>
      <i class="iconfont icon-iccaretdown"></i>
    </div>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import $ from "jquery";

export default {
  name: "LVEditor",
  props: {
    outerContent: {
      type: String,
      default: "",
    },
  },
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      mode: "observer",
      content: "",
      myConfig: {
        catchRemoteImageEnable: false,
        // 编辑器不显示字数统计
        elementPathEnabled: false,
        wordCount: false,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: "auto",
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口
        serverUrl: "http://h5.yingku866.com/Material/uploadImg",
        // UEditor 资源文件的存放路径
        UEDITOR_HOME_URL: "/Public/Activity/dist/Qiniu/UEditor/",
        // 菜单栏配置
        toolbars: [
          [
            "undo",
            "redo",
            "|",
            "fontsize",
            "fontfamily",
            "blockquote",
            "|",
            "removeformat",
            "formatmatch",
            "|",
            "link",
            "emotion",
            "spechars",
            "superscript",
            "subscript",
            "|",
            "pasteplain",
            "directionalityltr",
            "directionalityrtl",
            "|",
            "touppercase",
            "tolowercase",
          ],
          [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "horizontal",
            "|",
            "forecolor",
            "backcolor",
            "|",
            "indent",
            "lineheight",
            "letterspacing",
            "outpadding",
            "rowspacingtop",
            "rowspacingbottom",
            "|",
            "insertorderedlist",
            "insertunorderedlist",
          ],
          [
            "autotypeset",
            "|",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "|",
            "insertvideo", //视频
            "background", //背景
            "insertimage", //多图上传
            "searchreplace", //查询替换
            "|",
            "source", //源代码
            // "music", //音乐
          ],
        ],
        fontfamily: [
          { label: "", name: "songti", val: "宋体,SimSun" },
          { label: "仿宋", name: "fangsong", val: "仿宋,FangSong" },
          {
            label: "仿宋_GB2312",
            name: "fangsong",
            val: "仿宋_GB2312,FangSong",
          },
          { label: "", name: "kaiti", val: "楷体,楷体_GB2312, SimKai" },
          { label: "", name: "yahei", val: "微软雅黑,Microsoft YaHei" },
          { label: "", name: "heiti", val: "黑体, SimHei" },
          { label: "", name: "lishu", val: "隶书, SimLi" },
          { label: "", name: "andaleMono", val: "andale mono" },
          { label: "", name: "arial", val: "arial, helvetica,sans-serif" },
          { label: "", name: "arialBlack", val: "arial black,avant garde" },
          { label: "", name: "comicSansMs", val: "comic sans ms" },
          { label: "", name: "impact", val: "impact,chicago" },
          { label: "", name: "timesNewRoman", val: "times new roman" },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {
    tmpArticle() {
      return this.$store.state.tmpArticle;
    },
  },
  methods: {
    init() {
      window.jQuery = $;
      if (this.tmpArticle) {
        this.content = this.tmpArticle;
      }
    },
    execCommand(obj) {
      let name = obj["data"] ? obj["data"]["name"] : "";
      switch (name) {
        case "cleardoc":
          this.$store.commit("clearDoc");
          this.UE.execCommand(name);
          break;
        default:
          break;
      }
    },
    ready(ue) {
      this.UE = ue;
      this.initUeditorButtonTips();
    },
    initUeditorButtonTips() {
      // 编辑器顶部菜单栏title提示
      $(".ueditor-button").hover(
        function() {
          const that = this;
          $(".ueditor-button-tips")
            .find("span")
            .text($(this).attr("data-title"));
          $(".ueditor-button-tips")
            .css({
              top: $(that).offset().top - 30,
              left:
                $(that).offset().left -
                ($(".ueditor-button-tips").width() - $(that).width()) / 2,
            })
            .show();
        },
        function() {
          $(".ueditor-button-tips").hide();
        }
      );
    },
  },
  watch: {
    tmpArticle(val) {
      val && (this.content = val);
    },
    outerContent(val) {
      val && this.UE.execCommand("inserthtml", val);
      this.$emit("clearOuterContent");
    },
    content(val) {
      val && this.$store.commit("saveTmpArticle", val);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("https://at.alicdn.com/t/font_1028511_48es6gri7vj.css");
@import "@assets/common/option";
.lv_editor_container {
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: @main-color;
  background-color: #fff;

  > div {
    width: 100%;
    height: 100%;
  }

  /deep/ .edui-editor-iframeholder.edui-default {
    box-sizing: border-box;
    height: @lv-editor-height;
    // height: calc(100vh - 568px);
  }

  .ueditor-button-tips {
    width: auto;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 4px;
    background: #303133;
    display: none;
    transition: all 0.2s ease;
    z-index: 999;

    span {
      font-size: 12px;
      color: #fff;
      padding: 0 8px;
    }
    i {
      position: absolute;
      top: 18px;
      color: #303133;
      line-height: 10px;
      font-size: 12px;
      left: 50%;
      margin-left: -6px;
    }
  }
}
</style>
