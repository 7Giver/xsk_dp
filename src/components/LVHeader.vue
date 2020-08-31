<template>
  <div class="header_inner">
    <div class="left">
      <!-- <img :src="`${baseFile}/common/img/logo.png`" alt="" class="logo"> -->
      <h3>文章管理后台</h3>
      <div class="header_nav_container">
        <ul class="header_nav_list">
          <router-link
            active-class="active"
            tag="li"
            v-for="(item, index) in headerNavList"
            :key="index"
            :to="item.path"
          >
            {{ item.title }}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="user_info_container">
        <el-popover
          placement="bottom"
          width="100"
          trigger="click"
          v-if="userId"
        >
          <div class="user_tools">
            <a href="javascript:;" class="logout_btn" @click="logOut"
              >退出登录</a
            >
            <!-- <a
              href="javascript:;"
              v-if="changeCount"
              @click="_switchAccounts"
              class="logout_btn"
              >切换账号</a
            > -->
          </div>
          <div class="login_box" slot="reference">
            <div class="upic_box">
              <img :src="userUpic" alt="" />
            </div>
            <h5 class="name">{{ userName }}</h5>
          </div>
        </el-popover>

        <div class="no_login_box" v-else>
          <a href="javascript:;" class="login_btn" @click="_login">登录/注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { switchAccount } from "@api/home.js";
export default {
  name: "LVHeader",
  data() {
    return {
      currentHeaderNavId: "article",
      headerNavList: [
        {
          id: "article",
          title: "文章发布",
          path: "/home/material",
        },
        {
          id: "work",
          title: "我的作品",
          path: "/home/work",
        },
        // {
        //   id: 'video',
        //   title: '视频',
        //   disable: true,
        // },
        // {
        //   id: 'radio',
        //   title: '课程',
        //   disable: true,
        // },
        // {
        //   id: 'activity',
        //   title: '活动',
        //   disable: true,
        // },
      ],
      changeCount: false, //账号切换是否显示
      countsData: [], //账号列表
    };
  },
  computed: {
    baseFile() {
      return this.$store.state.baseFile;
    },
    userName() {
      return this.$store.state.userName;
    },
    userUpic() {
      return this.$store.state.userUpic;
    },
    userId() {
      return this.$store.state.userId;
    },
  },
  mounted() {},
  methods: {
    getCountsData() {
      switchAccount({ mid: this.userId }).then((res) => {
        this.countsData = res.data.data;
        if (this.countsData.length > 1) {
          this.changeCount = true;
        }
      });
    },
    _switchAccounts() {
      let data = this.countsData;
      this.$emit("switchAccounts", data);
    },
    logOut() {
      this.$store.commit("logout");
    },
    _login() {
      this.$emit("login");
    },
  },
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
.header_nav_list {
  li {
    cursor: pointer;
  }
}
.header_inner {
  width: @container-width;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  .left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > img.logo {
      width: 123px;
      height: 29px;
    }
    .header_nav_container {
      width: 300px;
      height: 100%;
      > ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        padding: 0;
        margin-left: 21px;
        > li {
          width: 100px;
          height: 100%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          > a {
            font-size: 14px;
            color: @main-color;
          }
          &:hover,
          &.active {
            background-color: @active-bg;
            > a {
              color: @active-color;
            }
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
    }
  }
  .right {
    .user_info_container {
      > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .login_btn {
          font-size: 14px;
          color: @main-color;
          &:hover {
            color: @active-color;
          }
        }
      }
      .login_box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .upic_box {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          overflow: hidden;
          > img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        h5.name {
          font-size: 16px;
          color: @main-color;
          margin-left: 10px;
        }
      }
    }
  }
}
.user_tools {
  width: 100%;
  .logout_btn {
    display: block;
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: @active-bg;
      color: @active-color;
    }
  }
}
</style>
