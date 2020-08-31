<template>
  <div class="home_material_container">
    <div class="header_material">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        class="header_nav"
      >
        <el-menu-item
          v-for="(item, index) in mainNavList"
          :index="item.id"
          :key="item.id"
          :disabled="item.disabled"
        >
          <h5>{{item.title}}</h5>
        </el-menu-item>
      </el-menu>
      <div class="header_class">
        <el-dropdown
          v-for="(item, index) in categoryList"
          :key="index"
          placement="bottom-start"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">{{item.name}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{pid: item.id}" :class="{'active': currentLevel === 1 && currentCateId === item.id}">全部</el-dropdown-item>
            <el-dropdown-item
              v-for="(cate, i) in item.son_category"
              :key="i"
              :command="cate"
              :class="{'active': currentLevel === 2 && currentCateId === cate.id}"
            >{{cate.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content_material">
      <ul
        class="material_list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="noMore"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="200"
      >
        <li v-for="(item, i) in templateList" :key="i" class="material_item" @click="_insertToEditor(item)">
          <div class="inner article_edit_content" v-html="item.content"></div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import { getTemplateCategory, getTemplate } from '@api/home'
  export default {
    name: "HomeMaterial",
    data() {
      return {
        activeIndex: '1',
        mainNavList: [
          {
            id: '1',
            title: '素材库'
          },
          {
            id: '2',
            title: '我的收藏',
            disabled: true
          }
        ],
        categoryList: [],
        templateList: [],
        tmpTemplateList: [],
        loading: false,
        currentLevel: 1,
        currentCateId: 1,
        noMore: false,
        page: 1,
        pageSize: 20,
        scrollImmediate: false
      }
    },
    created() {
      this._getTemplateCategory()
    },
    computed: {
      userId() {
        return this.$store.state.userId
      }
    },
    methods: {
      loadMore() {
        this.loading = true
        this._getTemplate()
      },
      handleCommand(command) {
        this.page = 1
        if(command['pid']) {
          this.currentLevel = 1
          this.currentCateId = command['pid']
        } else {
          this.currentLevel = 2
          this.currentCateId = command['id']
        }
        this._getTemplate()
      },
      _getTemplate() {
        let params = {
          level: this.currentLevel,
          csid: this.currentCateId,
          page: this.page,
          pagesize: this.pageSize
        }
        getTemplate(params).then(res => {
          this.loading = false
          let list = res.data.data
          if (this.page === 1 && list) {
            this.templateList = list
          } else if (this.page > 1 && list) {
            this.templateList = this.templateList.concat(list)
          }
          this.noMore = (list && list.length < this.pageSize)
          this.page++
        })
      },
      _getTemplateCategory() {
        getTemplateCategory().then(res => {
          this.categoryList = res.data.data
          this.currentLevel = 1
          this.currentCateId = this.categoryList[0]['id']
          this._getTemplate()
        })
      },
      _insertToEditor(obj) {
        if(!this.userId) {
          this.$util.ToastLogin()
          return false
        }
        this.$emit('insertToEditor', obj)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '@assets/common/option';
  .home_material_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header_material {
      background-color: #fff;
      padding-bottom: 20px;
      .header_nav {
        .el-menu-item {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 42px;
          line-height: 42px;
          cursor: pointer;
          h5 {
            font-size: 14px;
            color: @main-color;
          }
          &.is-active {
            h5 {
              color: @active-color;
            }
          }
        }
      }
      .header_class {
        width: 100%;
        box-sizing: border-box;
        padding-left: 10px;
        .el-dropdown {
          width: 67px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          font-size: 14px;
          color: @main-color;
          margin-right: 10px;
          margin-top: 10px;
          border-radius: 0.3em;
          cursor: pointer;
          &:hover {
            background-color: @active-bg;
            color: @active-color
          }
        }
      }
    }
    .content_material {
      width: 100%;
      height: calc(100% - 135px - 10px);
      margin-top: 10px;
      overflow-y: scroll;
      .material_list {
        width: 100%;
        .material_item {
          background-color: #fff;
          border-bottom: 1px dashed #e6e6e6;
          >.inner {
            overflow: hidden;
          }
          &:hover>.inner {
            box-shadow: inset 0 0 2px rgba(0,0,0,0.4);
          }
        }
      }
      >p {
        font-size: 14px;
        color: #666;
        text-align: center;
        padding: 1em 0;
      }
    }
  }
  .el-dropdown-menu.el-dropdown-menu--small {
    padding: 2px 0;
    /deep/.el-dropdown-menu__item {
      font-size: 14px;
      color: #999;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 0 10px;
      border-bottom: 1px solid #e6e6e6;
      &:hover {
        background-color: @active-bg;
        color: @active-color;
      }
      &.active {
        color: @active-color;
      }
    }
  }
</style>