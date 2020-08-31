<template>
  <div class="cropper-component">
    <div class="info-item">
      <div class="btn-box">
        <label class="btn" for="uploads">选择封面</label>
        <input
          type="file"
          id="uploads"
          :value="imgFile"
          style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        />

        <input type="button" class="operation-btn" value="+" title="放大" @click="changeScale(1)" />
        <input type="button" class="operation-btn" value="-" title="缩小" @click="changeScale(-1)" />
        <input type="button" class="operation-btn" value="↺" title="左旋转" @click="rotateLeft" />
        <input type="button" class="operation-btn" value="↻" title="右旋转" @click="rotateRight" />
      </div>
      <div class="operation-box">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :fixedNumber="option.fixedNumber"
            :fixed="option.fixed"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            @realTime="realTime"
          ></vueCropper>
        </div>
      </div>
      <div class="preview-box">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg, publishArticle } from "@api/home.js";
export default {
  name: "cropper",
  props: {},
  data() {
    return {
      previews: {},
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full         
        outputType: "png", // 裁剪生成额图片的格式
        canMove: true, // 能否拖动图片
        original: false, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 240, //默认生成截图框宽度
        autoCropHeight: 150,
        fixedBox: false, // 截图框固定大小
        fixedNumber: [4.8, 3], //截图框的宽高比例
        fixed: true, //是否开启截图框宽高固定比例
        infoTrue: false,

        
      },
      fileName: "", // 本机文件地址
      downImg: "#",
      imgFile: ""
    };
  },
  methods: {
    // 放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },

    // 实时预览函数
    realTime(data) {
      this.previews = data;
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData(data => {
        this.$emit("uploadImg", data);
      });
    },

    // 选择本地图片
    uploadImg(e, num) {
      var _this = this;
      // 上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(jfif|gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        // this.$message.error("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      // 转化为base64
      reader.readAsDataURL(file);
      // 转化为blob
      // reader.readAsArrayBuffer(file);
    }
  }
};
</script>

<style lang="less" scoped>
.cropper-component {
  position: relative;
  .btn-box {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-bottom: 20px;
    .btn {
      height: 30px;
      line-height: 30px;
      padding: 0px 12px;
      text-align: center;
      border-radius: 4px;
      background-color: #387ef6;
      color: #fff;
      cursor: pointer;
      display: inline-block;
    }
    .operation-btn {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      width: 30px;
      height: 30px;
      background-color: #fff;
      border: 1px solid #eaeaea;
      cursor: pointer;
      display: inline-block;
      font-size: 20px;
      color: #333;
      padding: 0;
      margin: 0 10px;
    }
  }
  .info-item {
    .operation-box {
      display: inline-block;
      .cropper {
        width: 350px;
        height: 250px;
      }
    }
    .preview-box {
      float: right;
      width: 350px;
      margin-left: 20px;
      .preview {
        border: 1px solid #ccc;
        background-color: #ddd;
        overflow: hidden;
      }
    }
  }
}
</style>>

