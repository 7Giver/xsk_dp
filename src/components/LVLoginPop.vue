<template>
  <el-dialog
    custom-class="dialog-login"
    :visible.sync="visible"
    :modal="true"
    :center="true"
    :show-close="false"
    :hide-required-asterisk="true"
    :title="'微信扫一扫'"
    width="360px"
    :before-close="diaLogClose"
  >
    <div class="login-content">
      <div class="login-qrcode" data-type="qrcode">
        <div class="qrcode-image">
          <img :src="qrCodeUrl" alt="二维码" />
          <div v-show="isShowFresh" class="timeout-tips" @click="switchFresh">请点击刷新</div>
        </div>
        <p>打开微信扫一扫，请在手机上确认登录</p>
        <span class="qrcode-timeout">二维码已过期，请点击刷新</span>
      </div>
    </div>

    <!-- <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0" class="login_form">
      <el-form-item prop="tel">
        <el-input type="text" v-model.number="loginForm.tel" maxlength="11" placeholder="请输入您的手机号">
          <i slot="prefix" class="iconfont icon_lv_mobilephone"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-col :span="14">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon_lv_shield"></i>
          </el-input>
        </el-col>
        <el-col :span="1" class="empty_line"></el-col>
        <el-col :span="9">
          <a href="javascript:;" class="send_code_btn" @click="validSMS" v-show="!countdownFlag">发送验证码</a>
          <a href="javascript:;" class="countdown" v-show="countdownFlag">{{countdownNum}}s</a>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="button_primary" size="large" @click="submitValidate">登录</el-button>
      </el-form-item>
    </el-form> -->
  </el-dialog>
</template>

<script>
import LVIcon from "@components/LVIcon";
import { sendSMS, login, qrCode, loginInfo } from "@api/home";

export default {
  name: "LVLoginPop",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LVIcon,
  },
  data() {
    var validateTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else if (value && /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      visible: false,
      loginForm: {
        tel: null,
        code: null,
      },
      loginRules: {
        tel: [
          { validator: validateTel, trigger: "blur" },
          { validator: validateTel, trigger: "change" },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { required: true, message: "验证码不能为空", trigger: "input" },
        ],
      },
      countdownFlag: false,
      countdownTimer: null,
      countdownNum: 60,
      qrCodeUrl: "",
      ticket: "",
      isShowFresh: false,
      timer: null
    };
  },
  methods: {
    diaLogClose(done) {
      this.timer && clearInterval(this.timer);
      done()
    },
    _getQrCode() {
      this.isShowFresh = false;
      qrCode()
        .then((res) => {
          const data = res.data.data;
          this.qrCodeUrl = data.qrUrl;
          this.ticket = data.ticket;
          this.timerOut();
        })
        .catch((e) => {});
    },
    timerOut() {
      let a = 0;
      this.timer = setInterval(() => {
        if (a < 60) {
          this._getLoginInfo();
          a++;
        } else {
          this.timer && clearInterval(this.timer);
          this.isShowFresh = true;
        }
      }, 1000);
    },
    _getLoginInfo() {
      const params = {
        ticket: this.ticket,
      };
      loginInfo(params)
        .then(res=> {
          const data = res.data.data;
          this.timer && clearInterval(this.timer)
          this.close();
          this.$store.commit("setMemberData", data);
          this.$emit("closeLogin", data);
        })
        .catch((e) => {});
    },
    switchFresh() {
      this._getQrCode()
      this.isShowFresh = false
    },
    submitValidate() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          return false;
        }
      });
    },
    close() {
      this.visible = false;
    },
    submit() {
      login(this.loginForm).then((res) => {
        this.close();
        this.$store.commit("updateMemberData", {
          userTel: this.loginForm["tel"],
        });
        this.$emit("closeLogin", res.data);
      });
    },
    startCountdown() {
      this.countdownFlag = true;
      this.countdownTimer = setInterval(() => {
        if (this.countdownNum <= 0) {
          clearInterval(this.countdownTimer);
          this.countdownNum = 60;
          this.countdownFlag = false;
        } else {
          this.countdownNum--;
        }
      }, 1000);
    },
    _sendSMS() {
      let params = {
        tel: this.loginForm["tel"],
      };
      this.startCountdown();
      sendSMS(params).then(() => {
        this.$util.ToastSuccess("验证码发送成功");
      });
    },
    validSMS() {
      this.$refs["loginForm"].validateField("tel", (valid) => {
        console.log("valid", valid);
        if (!valid) {
          this._sendSMS();
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) this._getQrCode();
    },
    visible(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="less">
@import url("//at.alicdn.com/t/font_1916170_ei8smo9f5xg.css");
.dialog-login {
  // width: 460px;
  background: #fff;
  border-radius: 4px;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  .el-dialog__header {
    padding: 0;
    height: 52px;
    line-height: 52px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    .el-dialog__title {
      font-size: 16px;
    }
  }
  .login_form {
    .empty_line {
      height: 1px;
      background: transparent;
    }
    .send_code_btn {
      display: block;
      font-size: 14px;
      background-color: #67c23a;
      color: #fff;
      text-align: center;
      border-radius: 0.3em;
    }
    .countdown {
      display: block;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background-color: #c8c8c8;
      border-radius: 0.3em;
    }
    .button_primary {
      width: 100%;
      margin-top: 30px;
    }
  }

  .login-content {
    padding: 0 40px;
    box-sizing: border-box;
    height: 343px;
    .login-qrcode {
      width: 100%;
      height: 100%;
      padding-top: 36px;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      .qrcode-image {
        width: 210px;
        height: 210px;
        border: 1px solid #ebebeb;
        margin: 0 auto;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .timeout-tips {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: -webkit-box;
          display: -moz-box;
          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          -moz-align-items: center;
          align-items: center;
          -webkit-justify-content: center;
          -moz-justify-content: center;
          -ms-justify-content: center;
          -o-justify-content: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.9);
          color: #36aeea;
          cursor: pointer;
        }
      }
      p {
        color: #909399;
        margin-top: 36px;
      }
      .qrcode-timeout {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.9);
        display: -webkit-box;
        display: -moz-box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        -o-justify-content: center;
        justify-content: center;
        color: #3f9eff;
        cursor: pointer;
        display: none;
      }
    }
  }
}
</style>
