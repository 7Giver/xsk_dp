<template>
  <div>
    <!-- accept="image/gif, image/jpeg,image/jpg,image/png,image/bmp" -->
    <el-upload
      class="avatar-uploader"
      ref="uploadPic"
      v-loading="loading"
      :action="action"
      :data="uploadData"
      :show-file-list="false"
      name="file"
      :on-success="handleAvatarSuccess"
      :on-progress="handProcess"
      :http-request="picUpload"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div v-if="maskBox" @mouseleave="maskBox = false" class="mask">
      <i @click="handleRemove" style="font-size: 24px" class="el-icon-delete"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "UploadImg",
  props: {
    pic: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      action: "",
      disabled: false,
      uploadData: {
        file: "",
        project: "",
      },
      imageUrl: "",
      loading: false,
      maskBox: false,
    };
  },
  watch: {
    pic: {
      handler(newval, oldval) {
        console.log(newval);
        if (newval) {
          this.imageUrl = newval;
        }
      },
      deep: true,
    },
  },
  created() {
    this.imageUrl = this.picUrl;
    const baseApi = process.env.BASE_API
    this.action = `${baseApi}Material/uploadImg`
  },
  methods: {
    // 图片上传前触发裁剪组件
    // 将图片读出并在完成时触发裁剪
    picUpload(option) {
      if (!this.$store.state.userId) {
        this.$util.ToastLogin();
        return;
      }
      let file = option.file;
      
      // 不使用裁剪
      let obj = {
        cropperShow: false,
        cropperImg: file,
      };
      this.$emit("modalShowFn", obj);

      //使用裁剪
      // let reader = new FileReader();
      // if (file) {
      //   reader.readAsDataURL(file);
      // }
      // reader.onload = () => {
      //   let src = reader.result;
      //   // this.cropperShow = true
      //   // this.cropperImg = src
      //   let obj = {
      //     cropperShow: true,
      //     cropperImg: src,
      //   };
      //   this.$emit("modalShowFn", obj);
      // };
    },
    handleRemove(file) {
      this.imageUrl = "";
      this.maskBox = false;
      this.$emit("getUrlFn", "");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.browser;
      this.loading = false;
      this.$emit("getUrlFn", res.browser, file.raw);
    },
    beforeAvatarUpload(file) {
      if (!this.$store.state.userId) {
        this.$refs.uploadPic.abort()
        this.$util.ToastLogin();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/bmp" ||
        file.type === "image/png";
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/GIF/BMP 格式!");
      }
      return isJPG && isLt10M;
    },
    handProcess(event, file) {
      this.loading = true;
    },
  },
};
</script>
<style scope>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid #dcdee2;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
  position: relative;
  z-index: 99;
}
.el-icon-plus:before {
  line-height: 200px;
}
</style>