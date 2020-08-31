<template>
  <el-dialog
    custom-class="dialog-saveDraft"
    :visible.sync="visible"
    :modal="true"
    :title="'保存草稿'"
    width="1000px"
  >
    <div class="box">
      <el-form
        :model="draftFormModel"
        :rules="draftRules"
        ref="draftForm"
        label-width="90px"
        class="draft_form"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="draftFormModel.title" :maxlength="60"></el-input>
        </el-form-item>
        <el-form-item class="button_item">
          <el-button class="button_cancel" @click="closePop">取消</el-button>
          <el-button class="button_primary" @click="submitValidate">新增草稿</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="draftList" style="width: 100%">
      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.add_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">覆盖</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import {
  getDraftList,
  deleteDraft,
  saveDraft,
  updateDraft
} from "@api/home.js";
export default {
  name: "LVDraftSavePop",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      draftList: [],
      noMore: false,
      page: 1,
      pageSize: 20,
      draftFormModel: {
        title: "",
        protocol: true
      },
      draftRules: {
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
        ]
      }
    };
  },
  created() {
    this._getDraftList();
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
      this.draftFormModel["protocol"] = true;
      this.$refs["draftForm"].resetFields();
    },

    _getDraftList() {
      if (!this.userId) {
      } else {
        let params1 = {
          mid: this.$store.state.userId,
          page: this.page,
          pagesize: this.pageSize
        };
        getDraftList(params1).then(res => {
          this.loading = false;
          let list = res.data.data;
          if (this.page === 1 && list) {
            this.draftList = list;
          } else if (this.page > 1 && list) {
            this.draftList = this.draftList.concat(list);
          }
          this.noMore = list && list.length < this.pageSize;
          this.page++;
        });
      }
    },

    //覆盖草稿
    handleEdit(index, row) {
      this.$confirm("此操作将会覆盖替换原有的草稿内容，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (!this.articleContent) {
            this.$util.ToastWarning("请填写内容后再进行覆盖");
            return false;
          }
          let params = {
            id: row.id,
            content: this.articleContent
          };
          updateDraft(params).then(res => {
            this.$util.ToastSuccess("覆盖成功");
            this.page = 1;
            this.$emit("_getDraftList");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    //删除草稿
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该草稿内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: row.id
          };
          deleteDraft(params).then(res => {
            this.$util.ToastSuccess("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    //关闭窗口
    closePop() {
      this.visible = false;
    },

    //提交表单校验
    submitValidate() {
      this.$refs["draftForm"].validate(valid => {
        if (valid) {
          this._publishDraft();
        } else {
          return false;
        }
      });
    },

    //发布草稿
    _publishDraft() {
      if (!this.articleContent) {
        this.$util.ToastWarning("请填写内容后再进行保存");
        return false;
      }
      let obj = {
        mid: this.$store.state.userId,
        title: this.draftFormModel["title"],
        content: this.articleContent
      };
      saveDraft(obj).then(() => {
        this.closePop();
        this.$util.ToastSuccess("新增草稿成功");
        this._getDraftList();
        let params = {
        mid: this.$store.state.userId,
        page: 1,
        pagesize: this.$store.state.pageSize
      };
      this.$store.dispatch({
        type: "getFirstPage",
        params: params
      });
      });
      
    }
  }
};
</script>

<style lang="less">
.dialog-saveDraft {
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
    .box {
      width: 100%;
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
    .el-form.draft_form .el-form-item {
      margin-bottom: 30px;
      &.button_item {
        box-sizing: border-box;
        padding-left: 30px;
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