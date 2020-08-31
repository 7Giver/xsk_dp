<template>
  <div class="lv_tools_container">
    <div class="inner">
      <ul class="lv_tools" ref="lvTools">
        <li
          class="tools_item"
          v-for="(item, index) in tools"
          :data-act="item.name"
          :class="{ disabled: item.disable }"
          :key="index"
          @click="toolClick($event, item)"
        >
          <LVIcon :iconClass="item.icon"></LVIcon>
          <h5>{{ item.title }}</h5>
        </li>
      </ul>
      <ul class="lv_tools_save">
        <li class="preview" @click="_showPhonePreview">文章预览</li>
        <li class="save" @click="_showSavePop">发布文章</li>
      </ul>
    </div>
  </div>
</template>

<script>
import LVIcon from "@components/LVIcon";
import { pushNewsData, editorMyArticle } from "@api/home.js";
import $ from "jquery";
export default {
  name: "LVTools",
  components: {
    LVIcon,
  },
  data() {
    return {
      tools: [
        // {
        //   id: '1',
        //   title: '微信文章',
        //   name: 'weixin_article',
        //   icon: 'icon_lv_weixin',
        //   disable: true,
        // },
        {
          id: "2",
          title: "导入文章",
          name: "imported_article",
          icon: "icon_lv_download",
          // disable: true,
        },
        // {
        //   id: '3',
        //   title: '上传图片',
        //   name: 'upload_img',
        //   icon: 'icon_lv_picture',
        //   disable: true,
        // },
        {
          id: "4",
          title: "清空/新建",
          name: "cleardoc",
          icon: "icon_lv_delete",
        },
        // {
        //   id: '5',
        //   title: '复制全文',
        //   name: 'selectall',
        //   icon: 'icon_lv_copy',
        //   disable: true,
        // },
        // {
        //   id: '6',
        //   title: '保存草稿',
        //   name: 'save_draft',
        //   icon: 'icon_lv_save',
        //   // disable: true,
        // },
        // {
        //   id: '7',
        //   title: '保存模板',
        //   name: 'save_template',
        //   icon: 'icon_lv_save',
        //   // disable: true,
        // }
      ],
      clipboard: null,
      title: null,
      datePicker: null,
      selectType: null,
      description: null,
      readText: null,
      audioType: null,
      videoType: null,
      cover: "",
      vid: "",
      bid: "",
    };
  },
  created() {
    this._editorMyArticle();
    this.eventBus();
  },
  mounted() {
    this.$nextTick(() => {
      this.copyEditorHtml();
    });
  },
  computed: {
    articleContent() {
      return this.$store.state.tmpArticle;
    },
    userId() {
      return this.$store.state.userId;
    },
    userBid() {
      return this.$store.state.userBid;
    },
  },
  methods: {
    _editorMyArticle() {
      const id = this.$route.query.id || null;
      if (id) {
        editorMyArticle({ id })
          .then((res) => {
            const data = res.data;
            if (data.code == 200) {
              this.title = data.data.title || "";
              this.selectType = data.data.cid || "";
              this.description = data.data.description || "";
              this.datePicker = data.data.add_time || null;
              this.readText = data.data.views || "";
              this.audioType = data.data.is_vido || 0;
              this.videoType = data.data.vido_type || 0;
              this.cover = data.data.cover || "";
              this.vid = data.data.vid || "";
              this.$store.commit("saveTmpArticle", data.data.content);
            }
          })
          .catch((e) => {});
      }
    },
    eventBus() {
      this.$root.eventVue.$on("ruleForm", (msg) => {
        console.log("msg :>> ", msg);
        this.title = msg.title;
        this.selectType = msg.category;
        this.datePicker = msg.datePicker / 1000;
        this.description = msg.desc;
        this.readText = msg.readText;
      });
      this.$root.eventVue.$on("title", (message) => {
        console.log("标题", message);
        this.title = message;
      });
      this.$root.eventVue.$on("datePicker", (message) => {
        console.log("发布时间", message);
        this.datePicker = message;
      });
      this.$root.eventVue.$on("selectBrandType", (message) => {
        console.log("品牌id", message);
        this.bid = message;
      });
      this.$root.eventVue.$on("selectType", (message) => {
        console.log("分类", message);
        this.selectType = message;
      });
      this.$root.eventVue.$on("description", (message) => {
        console.log("概述", message);
        this.description = message;
      });
      this.$root.eventVue.$on("readText", (message) => {
        console.log("阅读初始值", message);
        this.readText = message;
      });
      this.$root.eventVue.$on("cover", (message) => {
        console.log("cover", message);
        this.cover = message;
      });
      this.$root.eventVue.$on("audioType", (message) => {
        console.log("是否音视频", message);
        this.audioType = message;
      });
      this.$root.eventVue.$on("videoType", (message) => {
        console.log("视频类型", message);
        this.videoType = message;
      });
      this.$root.eventVue.$on("vid", (message) => {
        console.log("视频地址", message);
        this.vid = message;
      });
    },
    copyEditorHtml() {
      const vm = this;
      let toolBar = $(vm.$refs.lvTools);
      let copyBtn = toolBar.find("[data-act='selectall']");
    },
    toolClick(e, obj) {
      if (obj.disable) return false;
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }
      this.$emit("toolClick", { event: e, data: obj });
    },
    _showPhonePreview() {
      // TODO:临时注释
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }
      if (!this.articleContent) {
        console.log("this.articleContent :>> ", this.articleContent);
        this.$util.ToastWarning("请填写内容后再进行预览");
        return false;
      }
      this.$emit("showPhonePreview");
    },

    _showSavePop() {
      // TODO:临时注释
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }
      if (!this.articleContent) {
        this.$util.ToastWarning("请填写内容后再进行保存");
        return false;
      }
      // this.$emit('showSavePop')

      if (!this.title) {
        console.log("this.title :>> ", this.title);
        this.$message.error("请正确填写文章标题");
        return;
      }
      if (!this.selectType) {
        console.log("this.selectType :>> ", this.selectType);
        this.$message.error("请正确选择分类");
        return;
      }
      if (!this.description) {
        this.$message.error("请正确填写文章概述");
        return;
      }
      if (!this.datePicker) {
        console.log("this.datePicker :>> ", this.datePicker);
        this.$message.error("请正确选择发布时间");
        return;
      }

      if (!this.cover) {
        this.$message.error("请正确上传文章封面");
        return;
      }

      if (this.audioType) {
        if (!this.videoType) {
          this.$message.error("请正确选择视频类型");
          return;
        }
        if (!this.vid) {
          this.$message.error("请正确上传音视频");
          return;
        }
      }

      let params = {
        id: this.$route.query.id,
        userId: this.userId,
        userBid: this.bid || this.userBid,
        tel: this.$store.state.userTel,
        cid: this.selectType,
        title: this.title,
        cover: this.cover,
        add_time: this.datePicker,
        description: this.description,
        content: this.articleContent,
        view: this.readText,
        is_video: this.audioType,
        vido_type: this.videoType,
        vid: this.vid,
      };

      pushNewsData(params).then((res) => {
        if (res.data.code == 200) {
          this.$util.ToastSuccess("发布成功");
          this.$store.commit("saveTmpArticle", "");
          this.$router.push(`/home/work`);
        }
      });
    },
    //   _publishArticle() {
    //   let params = {
    //     mid: this.userId,
    //     cover: this.coverUrl,
    //     title: this.articleFormModel["title"],
    //     desc: this.articleFormModel["desc"],
    //     content: this.articleContent
    //   };
    //   console.log(params)
    //   publishArticle(params).then(() => {
    //     this.closePop();
    //     this.$util.ToastSuccess("发布成功");
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.lv_tools_container {
  display: flex;
  width: 100%;
  height: 100%;
  .inner {
    align-self: center;
    .lv_tools {
      position: relative;
      z-index: 1;
      .tools_item {
        background-color: #fff;
        width: 120px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 0.3em;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
        > h5 {
          font-size: 14px;
          margin-left: 5px;
        }
        > i {
          margin-left: 20px;
        }
        &:hover {
          color: @active-color;
          background-color: @active-bg;
        }
        &.disabled {
          opacity: 0.25;
          cursor: not-allowed;
          background: 0 0 !important;
          &:hover {
            color: @main-color;
            background-color: #fff;
          }
        }
      }
    }
    .lv_tools_save {
      position: relative;
      z-index: 1;
      margin-top: 40px;
      > li {
        width: 120px;
        height: 36px;
        line-height: 36px;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        text-align: center;
        border-radius: 0.3em;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
        &.preview {
          background-color: #5887eb;
        }
        &.save {
          background-color: #70c45e;
        }
      }
    }
  }
}
</style>
