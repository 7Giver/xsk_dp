<template>
  <el-dialog
    custom-class="dialog-saveTemplate"
    :visible.sync="visible"
    :modal="true"
    :title="'保存模板'"
    width="1000px"
  >
    <div class="box">
      <el-form :model="templateFormModel" :rules="templateRules" ref="templateForm" label-width="90px" class="template_form">
        <el-form-item label="模板名称" prop="title">
          <el-input v-model="templateFormModel.title" :maxlength="60" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="模板介绍" prop="desc">
          <el-input v-model="templateFormModel.desc" type="textarea" :rows="6" placeholder="请输入模板介绍" >
          </el-input>
        </el-form-item>


        <el-form-item class="button_item">
          <el-button class="button_cancel" @click="closePop">取消</el-button>
          <el-button class="button_primary" @click="submitValidate">新增模板</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  import { saveFramework } from '@api/home.js'
  export default {
    name: "LVTemplateSavePop",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: false,
        noMore: false,
        page: 1,
        pageSize: 20,
        templateFormModel: {
          title: '',
          desc: '',
          protocol: true
        },
        templateRules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { required: true, message: '请输入文章标题', trigger: 'change' },
            { min: 1, max: 60, message: '长度在 60 个字符以内', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 60 个字符以内', trigger: 'change' }
          ],
        },

      }
    },
    created() {
    },
    computed: {
      baseFile() {
        return this.$store.state.baseFile
      },
      articleContent() {
        return this.$store.state.tmpArticle
      },
      userId() {
        return this.$store.state.userId
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },
      visible(val) {
        if(!val) {
          this.clearAll()
        }
        this.$emit('input', val)
      }
    },
    methods: {
      clearAll() {
        this.templateFormModel['protocol'] = true
        this.$refs['templateForm'].resetFields()
      },

      //关闭窗口
      closePop() {
        this.visible = false
      },

      //提交表单校验
      submitValidate() {
        this.$refs['templateForm'].validate((valid) => {
          if (valid) {
            this._publishFramework()
          } else {
            return false;
          }
        });
      },

      //发布草稿
      _publishFramework() {
        if(!this.articleContent) {
          this.$util.ToastWarning('请填写内容后再进行保存')
          return false
        }
        let params = {
          mid: this.$store.state.userId,
          title: this.templateFormModel['title'],
          desc: this.templateFormModel['desc'],
          content: this.articleContent
        }
        saveFramework(params).then(() => {
          this.closePop()
          this.$util.ToastSuccess('保存模板成功')
        })
      },

    }
  }
</script>

<style lang="less">
  .dialog-saveTemplate {
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
        .cover_box{
          width: 250px;
          height: 250px;
          position: relative;
          z-index: 1;
          >input[type=file] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9;
            opacity: 0;
          }
          >div {
            width: 100%;
            height: 100%;
            >img {
              width: 100%;
              height: 100%;
            }
          }
          .no_pic_box h5.tip{
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
            >img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .el-form.template_form .el-form-item {
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
          >span {
            color: #666;
            margin-left: 6px;
          }
          >a {
            font-size: 14px;
            color: #5887EB;
            margin-left: 6px;
          }
        }
      }
    }
  }
</style>