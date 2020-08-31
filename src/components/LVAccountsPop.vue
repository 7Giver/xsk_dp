<template>
  <el-dialog
    custom-class="dialog-accounts"
    :visible.sync="visible"
    :modal="true"
    :center="true"
    :show-close="false"
    :hide-required-asterisk="true"
    :title="'选择登陆账号'"
    width="360px"
  >
    <div class="inner">
      <h5 class="title">当前手机号已关联{{linkAccountsNum}}个账号，请选择登陆账号</h5>
      <ul class="accounts_list">
        <li class="accounts_item" v-for="(item, index) in accountsData" :key="index" @click="chooseAccount(item)">
          <div class="upic_box">
            <img :src="item.upic" alt="">
          </div>
          <div class="user_info">
            <h5 class="name">{{item.name}}</h5>
            <div class="info">
              <span>ID: {{item.site}}</span>
              <span v-if="item.login_time>0">上次登录: {{$util.moment.unix(item.login_time).format('YYYY-MM-DD HH:mm')}}</span>
            </div>
          </div>
          <span class="tip" v-if="index === 0&& item.login_time >0">最近登录</span>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
  import { recordCurrentAccounts } from '@api/home.js'
  export default {
    name: "LVAccountsPop",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      accountsData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        visible: false
      }
    },
    computed: {
      linkAccountsNum() {
        return this.accountsData.length
      },
      userTel() {
        return this.$store.state.userTel
      }
    },
    methods: {
      close() {
        this.visible = false
      },
      chooseAccount(obj) {
        let userData = {
          userId: obj.mid,
          userName: obj.name,
          userUpic: obj.upic,
          userTel: this.userTel,
          userSite: obj.site
        }
        recordCurrentAccounts({mid: obj.mid})
        this.$store.commit('setMemberData', userData)
        window.location.reload();
        this.close()
      }
    },
    watch: {
      value(val) {
        this.visible = val
      },
      visible(val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="less">
  @import '@assets/common/option';
  .dialog-accounts {
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
    .inner {
      width: 100%;
      >h5.title {
        font-size: 14px;
        color: @sub-color;
        text-align: center;
      }
      .accounts_list {
        margin-top: 20px;
        width: 100%;
        .accounts_item {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e6e6e6;
          cursor: pointer;
          font-size: 14px;
          border-radius: 0.3em;
          position: relative;
          z-index: 1;
          .upic_box {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            overflow: hidden;
            >img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .user_info {
            width: 87.8%;
            box-sizing: border-box;
            padding-left: 10px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .name {
              font-size: 16px;
              color: @main-color;
            }
            .info {
              margin-top: 5px;
              font-size: 12px;
              color: @sub-color;
              >span {
                margin-right: 5px;
              }
            }
          }
          &:hover {
            border: 1px solid @active-color;
          }
          .tip {
            position: absolute;
            right: 0;
            top: 10px;
            z-index: 2;
            font-size: 12px;
            color: #E6A23C;
          }
        }
      }
    }
  }
</style>