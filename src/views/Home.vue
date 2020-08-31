<template>
  <div class="home">
    <el-container>
      <el-header height="46px">
        <LVHeader @login="_login" @switchAccounts="_switchAccounts"></LVHeader>
      </el-header>

      <router-view v-if="isShowArticleList"></router-view>
      <el-container v-else class="container">
        <!-- <el-aside width="138px">
          <LVSidebar></LVSidebar>
        </el-aside> -->

        <el-main>
          <div class="lib_col">
            <keep-alive>
              <router-view
                @insertToEditor="_insertToEditor"
                @insertToImage="_insertToImage"
              ></router-view>
            </keep-alive>
          </div>
          <div class="editor_col">
            <LVEditor
              ref="lvEditor"
              :outerContent="content"
              @clearOuterContent="_clearOuterContent"
            ></LVEditor>
          </div>
          <div class="titleWrap_col">
            <EditorTitle></EditorTitle>
            <UploadWrap></UploadWrap>
          </div>
        </el-main>

        <el-aside width="120px">
          <LVTools
            @showSavePop="_showSavePop"
            @showPhonePreview="_showPhonePreview"
            @toolClick="_toolClick"
          ></LVTools>
        </el-aside>
      </el-container>

      <el-footer height="38px">
        <LVFooter></LVFooter>
      </el-footer>
    </el-container>
    <LVArticleSavePop v-model="saveFlag"></LVArticleSavePop>
    <!-- <LVDraftSavePop v-model="saveDraftFlag"></LVDraftSavePop> -->
    <LVArticleImportPop v-model="importArticleFlag"></LVArticleImportPop>
    <LVTemplateSavePop v-model="saveTemplateFlag"></LVTemplateSavePop>
    <PhonePreview v-model="phonePreviewVisible"></PhonePreview>
    <LVLoginPop v-model="loginVisible" @closeLogin="_closeLogin"></LVLoginPop>
    <LVAccountsPop
      ref="login"
      v-model="accountsVisible"
      :accountsData="userAccounts"
    ></LVAccountsPop>
  </div>
</template>

<script>
import LVEditor from "@components/LVEditor";
import EditorTitle from "@components/EditorTitle";
import HomeWork from "@components/HomeWork";
import UploadWrap from "@components/UploadWrap";
import LVHeader from "@components/LVHeader";
import LVFooter from "@components/LVFooter";
import LVSidebar from "@components/LVSidebar";
import LVTools from "@components/LVTools";
import LVArticleSavePop from "@components/LVArticleSavePop";
import LVDraftSavePop from "@components/LVDraftSavePop";
import LVTemplateSavePop from "@components/LVTemplateSavePop";
import LVArticleImportPop from "@components/LVArticleImportPop";
import PhonePreview from "@components/PhonePreview";
import LVLoginPop from "@components/LVLoginPop";
import LVAccountsPop from "@components/LVAccountsPop";

export default {
  name: "Home",
  components: {
    LVEditor,
    EditorTitle,
    UploadWrap,
    LVHeader,
    LVFooter,
    LVSidebar,
    LVTools,
    LVArticleSavePop,
    LVDraftSavePop,
    LVTemplateSavePop,
    LVArticleImportPop,
    PhonePreview,
    LVLoginPop,
    LVAccountsPop,
    HomeWork,
  },
  data() {
    return {
      content: "",
      saveFlag: false,
      saveDraftFlag: false,
      saveTemplateFlag: false,
      importArticleFlag: false,
      phonePreviewVisible: false,
      loginVisible: false,
      accountsVisible: false,
      picCropper: false,
      userAccounts: [],
    };
  },
  mounted() {
    window.VUEMETHODS = {
      openLogin: this._login,
    };
  },
  watch: {
    $route: {
      handler: function(newVal, oldVal) {
        if (newVal.name == "material") {
          this.$store.state.tmpArticle = "";
          // if (localStorage.getItem("vuex")) {
          //   let a = JSON.parse(localStorage.getItem("vuex"));
          //   a.tmpArticle = "";
          //   localStorage.setItem(JSON.stringify(a));
          // }
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  computed: {
    baseFile() {
      return this.$store.state.baseFile;
    },
    isShowArticleList() {
      return this.$route.path == "/home/work";
    },
  },
  methods: {
    _switchAccounts(data) {
      this.accountsVisible = true;
      this.userAccounts = data;
    },
    _toolClick(obj) {
      let name = obj["data"] ? obj["data"]["name"] : "";
      switch (name) {
        case "save_draft":
          this._showSaveDraft();
          break;
        case "save_template":
          this._showSaveTemplate();
          break;
        case "imported_article":
          this._showImportArticle();
          break;
        default:
          this.$refs.lvEditor.execCommand(obj);
          break;
      }
    },
    _closeLogin(data) {
      // if(data.data.length === 1){
      //   this.accountsVisible = false;
      //   this.$refs.login.chooseAccount(data.data[0])
      //   return;
      // }
      // this.accountsVisible = true
      // this.userAccounts = data.data
    },
    _login() {
      this.loginVisible = true;
    },
    _showPhonePreview() {
      this.phonePreviewVisible = true;
    },
    _showSavePop() {
      this.saveFlag = true;
    },
    _showSaveDraft() {
      this.saveDraftFlag = true;
    },
    _showImportArticle() {
      this.importArticleFlag = true;
    },
    _showSaveTemplate() {
      this.saveTemplateFlag = true;
    },
    _insertToEditor(obj) {
      this.content = obj.content;
    },
    _insertToImage(obj) {
      this.content = `<img src="${obj.cover}" />`;
    },
    _clearOuterContent() {
      this.content = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.home {
  .el-container {
    .el-header {
      width: 100%;
      background-color: #fff;
      padding: 0;
    }
    .el-aside {
      overflow: hidden;
    }
    .container {
      height: @container-height;
      width: @container-width;
      box-sizing: border-box;
      padding-top: 10px;
      .el-main {
        padding: 0;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        overflow: visible;
        .lib_col {
          width: 410px;
          height: 100%;
          flex: none;
          margin-left: 10px;
          overflow: hidden;
        }
        .editor_col {
          // width: 500px;
          height: 100%;
          flex: none;
          margin-right: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .titleWrap_col {
          margin-right: 20px;
        }
      }
    }
    .el-footer {
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #e6e6e6;
    }
  }
}
</style>
