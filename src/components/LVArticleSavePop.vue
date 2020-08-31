<template>
  <el-dialog
    custom-class="dialog-saveArticle"
    :visible.sync="visible"
    :modal="true"
    :title="'保存并发布'"
    width="1200px"
  >
    <div class="left">
      <!-- <el-form :model="imgFormModel" :rules="imgRules" ref="imgForm" label-width="90px" class="img_form">
        <el-form-item label="封面" prop="cover" v-loading="uploadLoad">
          <div class="cover_box">
            <input type="file" name="cover" :value="imgFormModel.cover" ref="uploadInput" @change="uploadCover">
            <div class="no_pic_box" v-show="!coverUrl">
              <img :src="`${baseFile}/save_pop/icon_add.png`" alt="">
              <h5 class="tip">建议尺寸：500*500px</h5>
            </div>
            <div class="pic_box" v-show="coverUrl">
              <img :src="coverUrl" alt="">
            </div>
          </div>
        </el-form-item>
      </el-form>-->
      <LVArticleSavePopCut @uploadImg="uploadFile" ref="cropper"></LVArticleSavePopCut>
      <!--      <div class="outer_design">-->
      <!--        <h5 class="title">在线设计封面</h5>-->
      <!--        <ul class="design_list">-->
      <!--          <li class="design_item" v-for="(item, index) in designWebList" :key="index">-->
      <!--            <img :src="baseFile + item.logo" alt="">-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
    </div>
    <div class="right">
      <el-form
        :model="articleFormModel"
        :rules="articleRules"
        ref="articleForm"
        label-width="90px"
        class="article_form"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleFormModel.title" :maxlength="60"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="desc">
          <el-input v-model="articleFormModel.desc" :maxlength="60"></el-input>
        </el-form-item>
        <el-form-item class="protocol_item">
          <div class="inner">
            <el-checkbox v-model="articleFormModel.protocol"></el-checkbox>
            <span>阅读并同意</span>
            <router-link to="/protocol">文章审核规则</router-link>
          </div>
        </el-form-item>
        <el-form-item class="button_item">
          <el-button class="button_cancel" @click="closePop">取消</el-button>
          <el-button class="button_primary" @click="submitValidate">保存并提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
// import { uploadImg, publishArticle } from "@api/home.js";
import LVArticleSavePopCut from "@components/LVArticleSavePopCut";

export default {
  name: "LVArticleSavePop",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LVArticleSavePopCut
  },
  data() {
    return {
      visible: false,
      coverUrl: "",
      // imgFormModel: {
      //   cover: null
      // },
      // imgRules: {
      //   cover: [
      //     { required: true, message: '请选择图片', trigger: 'change' }
      //   ]
      // },
      articleFormModel: {
        title: "",
        desc: "",
        protocol: true
      },
      articleRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { required: true, message: "请输入文章标题", trigger: "change" },
          { min: 1, max: 60, message: "长度在 60 个字符以内", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 60 个字符以内",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入文章副标题", trigger: "blur" },
          { required: true, message: "请输入文章副标题", trigger: "change" },
          { min: 1, max: 60, message: "长度在 60 个字符以内", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "长度在 60 个字符以内",
            trigger: "change"
          }
        ]
      },
      designWebList: [
        {
          logo: "/save_pop/logo_gd.png"
        },
        {
          logo: "/save_pop/logo_canva.png"
        },
        {
          logo: "/save_pop/logo_ckt.png"
        },
        {
          logo: "/save_pop/logo_fotor.png"
        }
      ]
      // uploadLoad: false
    };
  },
  computed: {
    baseFile() {
      return this.$store.state.baseFile;
    },
    articleContent() {
      return this.$store.state.tmpArticle;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      if (!val) {
        this.clearAll();
      }
      this.$emit("input", val);
    }
  },
  methods: {
    clearAll() {
      // this.$refs["uploadInput"].value = null;
      this.$refs["cropper"].option.img = "";
      this.coverUrl = "";
      this.articleFormModel["protocol"] = true;
      this.$refs["articleForm"].resetFields();
    },
    closePop() {
      this.visible = false;
    },

    submitValidate() {
      if (!this.coverUrl) {
        this.$util.ToastWarning("请上传文章封面图");
        return false;
      }
      if (!this.articleFormModel["protocol"]) {
        this.$util.ToastWarning("请阅读并同意文章审核规则");
        return false;
      }
      this.$refs["articleForm"].validate(valid => {
        if (valid) {
          this._publishArticle();
        } else {
          return false;
        }
      });
    },
    _publishArticle() {
      let params = {
        mid: this.userId,
        cover: this.coverUrl,
        title: this.articleFormModel["title"],
        desc: this.articleFormModel["desc"],
        content: this.articleContent
      };
      console.log(params)
      publishArticle(params).then(() => {
        this.closePop();
        this.$util.ToastSuccess("发布成功");
      });
    },
    uploadFile(data) {
      let binary = atob(data.split(",")[1]);
      let mime = data.split(",")[0].match(/:(.*?);/)[1];
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let fileData = new Blob([new Uint8Array(array)], {
        type: mime
      });

      let file = new File([fileData], `${new Date().getTime()}.png`, {
        type: mime
      });
      this._uploadFile(file);
    },
    // uploadCover(e) {
    //   const files = e.target.files
    //   if (files && files[0]) {
    //     const file = files[0]
    //     this._uploadFile(file)
    //   }
    // },
    _uploadFile(file) {
      // this.uploadLoad = true

      uploadImg(file).then(res => {
        // this.uploadLoad = false
        this.coverUrl = res.data.url;
      });
    }
  }
};
</script>

<style lang="less">
.dialog-saveArticle {
  font-size: 16px;
  .el-dialog__header {
    padding: 0 0 0 20px;
    height: 46px;
    line-height: 46px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    .el-dialog__title {
      font-size: 16px;
      color: #666;
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
  }
  .el-dialog__body {
    box-sizing: border-box;
    padding: 30px 30px 60px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .left {
      width: 65%;
    }
    .right {
      width: 35%;
    }
    .el-form.img_form .el-form-item {
      margin-bottom: 0;
      .cover_box {
        width: 250px;
        height: 250px;
        position: relative;
        z-index: 1;
        > input[type="file"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9;
          opacity: 0;
        }
        > div {
          width: 100%;
          height: 100%;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .no_pic_box h5.tip {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: #fbfbfb;
          font-size: 14px;
        }
      }
    }
    .outer_design {
      width: 100%;
      margin-top: 40px;
      .title {
        font-size: 14px;
        color: #666;
      }
      .design_list {
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: 25px;
        .design_item {
          flex: none;
          width: 160px;
          height: 58px;
          margin: 0 40px 15px 0;
          &:nth-child(2n) {
            margin-right: 0;
          }
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .el-form.article_form .el-form-item {
      margin-bottom: 30px;
      &.button_item {
        box-sizing: border-box;
        padding-left: 30px;
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }

      .el-button {
        width: 136px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        padding: 0;
        font-size: 14px;
        margin-right: 20px;
      }
      &.protocol_item .inner {
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > span {
          color: #666;
          margin-left: 6px;
        }
        > a {
          font-size: 14px;
          color: #5887eb;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>