<template>
  <div class="home_material_container">
    <div class="header_material">
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
        <span style="display:-moz-inline-box; display:inline-block;width: 87px;text-align: center" @click="_getUserPicture()">
          我的图片
        </span>
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
        <li v-for="(item, i) in pictureList" :key="i" class="material_item" @click="_insertToImage(item)">
          <div>
            <img class="inner article_edit_content" :src="item.cover" :title="item.title" alt="item.title"/>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import {getPicture,getUserPicture,getPictureCategory} from "../api/home";
  export default {
    name: "HomePicture",
    data() {
      return {
        activeIndex: '1',
        categoryList: [],
        pictureList: [],
        tmpPictureList: [],
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
      this._getPictureCategory()
    },
    computed: {
      userId() {
        return this.$store.state.userId
      }
    },
    methods: {
      //获取用户图片
      _getUserPicture(){
        if(!this.userId) {
          this.$util.ToastLogin()
          return false
        }
        let params = {
          mid: this.$store.state.userId,
          page: 1,
          pagesize: this.pageSize
        }
        getUserPicture(params).then(res => {
          this.pictureList=[]
          this.loading = false
          let list = res.data.data
          if (this.page === 1 && list) {
            this.pictureList = list
          } else if (this.page > 1 && list) {
            this.pictureList = this.pictureList.concat(list)
          }
          this.noMore = (list && list.length < this.pageSize)
          this.page++
        })
      },
      loadMore() {
        this.loading = true
        this._getPicture()
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
        this._getPicture()
      },
      _getPicture() {
        let params = {
          level: this.currentLevel,
          csid: this.currentCateId,
          page: this.page,
          pagesize: this.pageSize
        }
        getPicture(params).then(res => {
          this.loading = false
          let list = res.data.data
          if (this.page === 1 && list) {
            this.pictureList = list
          } else if (this.page > 1 && list) {
            this.pictureList = this.pictureList.concat(list)
          }
          this.noMore = (list && list.length < this.pageSize)
          this.page++
        })
      },
      _getPictureCategory() {
        getPictureCategory().then(res => {
          this.categoryList = res.data.data
          this.currentLevel = 1
          this.currentCateId = this.categoryList[0]['id']
          this._getPicture()
        })
      },
      _insertToImage(obj) {
        if(!this.userId) {
          this.$util.ToastLogin()
          return false
        }
        this.$emit('insertToImage', obj)
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
          cursor: pointer;
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