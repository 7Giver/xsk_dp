<template>
  <div class="uploadWrap-contanner">
    <div class="item">
      <div class="wrap">
        <div class="label">是否音视频:</div>
        <el-select
          class="audioSelect"
          v-model="audioSelectInit"
          placeholder="请选择"
          @change="selectAudioType"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="wrap">
        <div class="label">视频类型:</div>
        <el-select
          v-model="videoTypeVal"
          placeholder="请选择"
          @change="selectVideoType"
        >
          <el-option
            v-for="item in videoTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="item-l">
        <div class="label coverLabel">封面:</div>
        <upload-img
          :pic="form.bgImage"
          @getUrlFn="getImgUrl"
          @modalShowFn="getModalStatus"
        ></upload-img>
      </div>
    </div>
    <div class="item" v-if="isShowVideoUpload && isShowUploadVideoAudio">
      <div class="item-l">
        <div class="label videoLabel">视频:</div>
        <div class="pic_img">
          <div class="pic_img_box">
            <!-- :data="{ FoldPath: '上传目录', SecretKey: '安全验证' }" -->
            <el-upload
              ref="uploadVideo"
              class="avatar-uploader"
              :class="{ hide: hideUpload }"
              :action="'http://upload.qiniup.com'"
              :data="uploadForm"
              accept="video/*"
              :on-progress="uploadVideoProcess"
              :on-success="handleVideoSuccess"
              :before-upload="beforeUploadVideo"
              :show-file-list="false"
              :on-change="onChange"
              :handle-remove="handleRemove"
            >
              <video
                v-if="videoForm.showVideoPath != '' && !videoFlag"
                :src="videoForm.showVideoPath"
                class="avatar video-avatar"
                controls="controls"
              >
                您的浏览器不支持视频播放
              </video>
              <i
                v-else-if="videoForm.showVideoPath == '' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
              <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top:7px;"
              ></el-progress>
            </el-upload>
          </div>
        </div>
        <!-- <p class="Upload_pictures">
          <span></span>
          <span>最多可以上传1个视频，建议大小50M，推荐格式mp4</span>
        </p> -->
      </div>
    </div>

    <div class="item" v-if="isShowAudioUpload && isShowUploadVideoAudio">
      <div class="item-l">
        <el-upload
          id="audioUpload"
          class="Audio-uploader"
          :class="{ hide: hideUpload }"
          ref="uploadAudioRef"
          :action="'http://upload.qiniup.com'"
          :data="uploadForm"
          :show-file-list="true"
          :multiple="false"
          accept="audio/*"
          :file-list="fileList"
          :on-remove="handleAudioRemove"
          :limit="1"
          :auto-upload="true"
          :on-change="handleChangeAudio"
          :on-success="handleAudioSuccess"
          :before-upload="beforeAudioUpload"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip" style="margin-bottom: 10px">
            只能上传mp3文件，且不超过10M
          </div>
        </el-upload>
      </div>
    </div>

    <el-dialog
      custom-class="dialog-saveArticle"
      :visible.sync="isShowCropper"
      :modal="true"
      width="700px"
    >
      <div class="cropperModalBody" style="width:520px;height:350px">
        <img-cropper
          :cropperOption="cropperOption"
          :img="cropperImg"
          :file="cropperFile"
          @cropperFinish="postUploadFile"
          @close="
            () => {
              isShowCropper = false;
            }
          "
        ></img-cropper>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImg from "@components/UploadImg";
import imgCropper from "@components/imgCropper";
import { uploadImg, editorMyArticle, getQiniuToken } from "@api/home";
import { formatTimeToStr } from "@/utils/date";

export default {
  name: "UploadWrap",
  components: {
    UploadImg,
    imgCropper,
  },
  data() {
    return {
      imageUrl: "",
      uploadUrl: "http://h5.yingku866.com/Material/uploadImg",
      audioSelectInit: "",
      typeOptions: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
      videoTypeOptions: [
        // {
        //   value: 0,
        //   label: "未知",
        // },
        // {
        //   value: 1,
        //   label: "腾讯",
        // },
        // {
        //   value: 2,
        //   label: "优酷",
        // },
        {
          value: 3,
          label: "电台",
        },
        {
          value: 4,
          label: "视频",
        },
      ],
      videoTypeVal: "",

      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",
      },

      isShowCropper: false,
      form: {
        bgImage: "",
      },
      cropperImg: "",
      cropperOption: {},
      cropperFile: {},

      fileList: [],
      audioDuration: "",
      uploadForm: {
        key: "",
        token: "",
      },
      hideUpload: false,
      limitCount: 1,
      isShowAudioUpload: false,
      isShowVideoUpload: false,
      isShowUploadVideoAudio: false,
    };
  },
  created() {
    this._editorMyArticle();
  },
  methods: {
    onChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    _editorMyArticle() {
      const id = this.$route.query.id || null;
      if (id) {
        editorMyArticle({ id })
          .then((res) => {
            const data = res.data;
            if (data.code == 200) {
              this.audioSelectInit =
                this.audioTypeFilter(data.data.is_vido) || "";
              this.videoTypeVal =
                this.videoTypeFilter(data.data.vido_type) || "";
              this.form.bgImage = data.data.cover || "";
              this.isShowUploadVideoAudio = data.data.is_vido == 1;
              if (["1", "2", "4"].includes(data.data.vido_type)) {
                this.videoForm.showVideoPath = data.data.vid || "";
                this.isShowVideoUpload = true;
              }
              if (data.data.vido_type == 3) {
                const name = data.data.vid.split("/")[
                  data.data.vid.split("/").length - 1
                ];
                this.fileList = [{ name, url: data.data.vid }];
                this.isShowAudioUpload = true;
              }
            }
          })
          .catch((e) => {});
      }
    },
    audioTypeFilter(status) {
      const statusMap = {
        0: "否",
        1: "是",
      };
      return statusMap[status];
    },
    videoTypeFilter(status) {
      const statusMap = {
        "0": "未知",
        "1": "腾讯",
        "2": "优酷",
        "3": "电台",
        "4": "视频",
      };
      return statusMap[status];
    },
    selectAudioType(val) {
      this.isShowUploadVideoAudio = val == 1;
      this.$root.eventVue.$emit("audioType", val);
      if (!val) this.$root.eventVue.$emit("vid", "");
    },
    selectVideoType(val) {
      this.isShowAudioUpload = val == 3;
      this.isShowVideoUpload = [1, 2, 4].includes(val);
      this.$root.eventVue.$emit("videoType", val);
    },
    handleAvatarSuccess(res, file) {
      this.$emit("showCropper");
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    chooseImg() {
      this.$emit("showCropper");
    },
    //上传前回调
    async beforeUploadVideo(file) {
      if (!this.$store.state.userId) {
        this.$refs.uploadVideo.abort();
        this.$util.ToastLogin();
        return;
      }
      const current = new Date().getTime();
      const key = `editor/video/${formatTimeToStr(
        new Date(),
        "yyyyMMdd"
      )}/video_${current}.${file.name.split(".")[1]}`; // key为上传后文件名 必填
      const fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
        ].indexOf(file.type) == -1
      ) {
        this.$refs.uploadVideo.abort();
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$refs.uploadVideo.abort();
        this.$message.error("视频大小不能超过50MB");
        return false;
      }

      try {
        const res = await getQiniuToken();
        this.uploadForm = {
          key,
          token: res.data.data,
        };
        return true;
      } catch (error) {
        return error;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      if (!this.$store.state.userId) {
        this.$util.ToastLogin();
        return;
      }
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      //前台上传地址
      if (file.status == "success") {
        const url = `http://cdn.tuku679.com/${file.response.key}`;
        this.videoForm.showVideoPath = url;
        this.$root.eventVue.$emit("vid", url);
      } else {
        this.$message.error("上传失败，请重新上传");
      }

      //后台上传地址
      // if (res.Code == 0) {
      //   this.videoForm.showVideoPath = res.Data;
      // } else {
      // this.$message.error(res.Message);
      // }
    },

    getImgUrl(url) {
      this.form.bgImage = url;
    },
    getModalStatus(obj) {
      this.cropperImg = obj.cropperImg;
      this.isShowCropper = obj.cropperShow;
    },

    // 文件上传-接口-上传文件
    postUploadFile(blob) {
      //将blob转换为file
      let file = new File([blob], `${new Date().getTime()}.png`, {
        type: "image/png",
        lastModified: Date.now(),
      });
      file.uid = Date.now();
      // var fd = new FormData();
      // fd.append("file", file, "图片.png");
      // fd.append("project", "micropark_coordination");

      uploadImg(file).then((res) => {
        console.log("res :>> ", res);
        if (res.data.code == 200) {
          this.form.bgImage = res.data.url;
          this.isShowCropper = false;
          this.cropperImg = null;
          this.cropperFile = {};
          this.$root.eventVue.$emit("cover", res.data.url);
        }
      });
    },

    async beforeAudioUpload(file) {
      if (!this.$store.state.userId) {
        this.$refs.uploadAudioRef.abort();
        this.$util.ToastLogin();
        return;
      }

      // 文件类型进行判断
      const isAudio = file.type === "audio/mp3" || file.type === "audio/mpeg";
      // 限制上传文件大小 10M
      const isLt2M = file.size / 1024 / 1024 < 40;
      const isTime60S = this.audioDuration >= 300 ? true : "";
      // 获取时长
      this.getTimes(file);
      if (!isAudio) {
        this.$message.error("上传文件只能是Mp3格式!");
        this.fileList = [];
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
        this.fileList = [];
        return;
      }
      const current = new Date().getTime();
      const key = `editor/Audio/${formatTimeToStr(
        new Date(),
        "yyyyMMdd"
      )}/Audio_${current}.${file.name.split(".")[1]}`; // key为上传后文件名 必填

      try {
        const res = await getQiniuToken();
        this.uploadForm = {
          key,
          token: res.data.data,
        };
        return true;
      } catch (error) {
        return error;
      }
    },
    handleAudioSuccess(res, file) {
      //前台上传地址
      if (file.status == "success") {
        const url = `http://cdn.tuku679.com/${file.response.key}`;
        this.fileList.push({ name: file.name, url });
        // this.videoForm.showVideoPath = url;
        this.$root.eventVue.$emit("vid", url);
      } else {
        this.$message.error("上传失败，请重新上传");
      }
    },
    getTimes(file) {
      var content = file;
      //获取录音时长
      var url = URL.createObjectURL(content);
      //经测试，发现audio也可获取视频的时长
      var audioElement = new Audio(url);
      audioElement.addEventListener("loadedmetadata", (_event) => {
        this.audioDuration = parseInt(audioElement.duration);
        // console.log(this.audioDuration);
      });
    },
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Format() {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },

    handleChangeAudio(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleAudioRemove(file, fileList) {
      this.fileList = [];
      this.$root.eventVue.$emit("vid", "");
      this.hideUpload = fileList.length >= this.limitCount;
    },
  },
};
</script>

<style lang="less" scoped>
.coverLabel::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.videoLabel {
  margin-left: 8px;
}

/deep/.hide .el-upload--picture-card {
  display: none;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 126px;
  height: 126px;
  line-height: 126px;
  text-align: center;
  background-color: #fff;
}
/deep/.avatar {
  width: auto;
  height: 126px;
  display: block;
}

/deep/.el-icon-plus:before {
  line-height: 126px;
}

.uploadWrap-contanner {
  margin-top: 10px;
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .item-l,
    .item-r {
      display: flex;
      align-content: center;
      margin-top: 20px;
      .label {
        line-height: 126px;
        margin-right: 10px;
        white-space: nowrap;
      }
    }
    .audioSelect {
      width: 100px;
    }
    .item-r {
      margin-left: 40px;
      // /deep/.el-progress-circle{
      //   height: 80px !important;
      //   width: 80px !important;
      // }
      .Upload_pictures {
        font-size: 12px;
      }
    }
    .wrap {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
      .label {
        margin-right: 10px;
        // white-space: nowrap;
        text-align: center;
        margin-right: 10px;
      }
    }
  }
}
.Upload_pictures {
  font-size: 14px;
  width: 130px;
  margin-top: 34px;
  margin-left: 12px;
}
</style>
