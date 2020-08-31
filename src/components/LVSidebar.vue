<template>
  <div class="lv_sidebar_container">
    <el-menu
      :default-active="currentSideBarId"
      :router="false"
      class="lv_sidebar_list"
    >
      <el-menu-item
        class="sidebar_item"
        v-for="(item, index) in sideBarList"
        :index="item.url"
        :key="index"
        :disabled="item.disable"
        @click="linkClick(item)"
      >
        <LVIcon :iconClass="item.icon" v-if="item.icon"></LVIcon>
        <img :src="baseFile + item.iconUrl" alt="" v-if="item.iconUrl">
        <h5>{{item.title}}</h5>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import LVIcon from '@components/LVIcon'
  export default {
    name: "LVSidebar",
    components: {
      LVIcon
    },
    data() {
      return {
        currentSideBarId: '/home/material',
        sideBarList: [
          {
            id: '1',
            url: '/home/material',
            icon: 'icon_lv_material',
            title: '素材'
          },
          {
            id: '2',
            url: '/home/template',
            icon: 'icon_lv_template',
            title: '模板',
            disable: true
          },
          {
            id: '3',
            url: '/home/picture',
            icon: 'icon_lv_picture',
            title: '图片',
            // disable: true
          },
          {
            id: '4',
            url: '/home/draft',
            icon: 'icon_lv_draft',
            title: '草稿',
            // disable: true
          },
          {
            id: '5',
            url: '/home/article',
            icon: 'icon_lv_article',
            title: '我的文章',
            // disable: true
          },
          {
            id: '6',
            outUrl: 'https://www.gaoding.com/s/newmedia',
            iconUrl: '/common/img/side/icon_free_material.png',
            title: '免费素材'
          },
          {
            id: '7',
            outUrl: 'https://www.58pic.com/',
            iconUrl: '/common/img/side/icon_choiceness_free_picture.png',
            title: '精选免费图库'
          },
          {
            id: '8',
            outUrl: 'https://www.ooopic.com/home-35----.html',
            iconUrl: '/common/img/side/icon_free_template.png',
            title: '免费模板库'
          },
          {
            id: '9',
            outUrl: 'https://isheji5.com/pic/',
            iconUrl: '/common/img/side/icon_10w_cover.png',
            title: '10w+封面'
          },
          {
            id: '10',
            outUrl: 'http://699pic.com/',
            iconUrl: '/common/img/side/icon_free_picture.png',
            title: '免费图库'
          },
          {
            id: '11',
            outUrl: 'https://ibaotu.com/peitu/14-91717-0-0-3-1.html',
            iconUrl: '/common/img/side/icon_hot_free_template.png',
            title: '热门免费模板'
          },
        ]
      }
    },
    created() {
      const path = this.$router.currentRoute.path;
      this.currentSideBarId = path;
    },
    computed: {
      baseFile() {
        return this.$store.state.baseFile
      }
    },
    methods: {
      linkClick(obj) {
        if(obj.disable) {
          this.$util.ToastInfo('开发中，敬请期待')
          return false
        }
        if (obj.outUrl) {
          window.open(obj.outUrl)
          return false
        } else {
          this.currentSideBarId = obj.url;
          this.$router.push(obj.url)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "@assets/common/option";
  .lv_sidebar_container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    >ul.lv_sidebar_list {
      width: 100%;
      border: none;
      >li.sidebar_item.el-menu-item {
        width: 100%;
        height: 42px;
        line-height: 42px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px !important;
        color: #666;
        user-select: none;
        >i {
          color: #666;
        }
        >h5 {
          color: #666;
          font-size: 14px;
          margin-left: 10px;
        }
        >img {
          width: 18px;
          height: 18px;
        }
        &:hover, &.is-active {
          background-color: @active-bg;
          color: @active-color;
          >i, >h5 {
            color: @active-color;
          }
        }
        &.is-active {
          position: relative;
          z-index: 1;
          &:before {
            content: '';
            width: 2px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            background-color: @active-bg;
          }
        }
      }
    }
  }
</style>