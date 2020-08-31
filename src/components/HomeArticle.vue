<template>
  <div class="home_material_container">
    <div class="header_material">
      <div class="header_class">
        <div class="inner">
          <span class="tips">
            共有文章
            <b style="font-style: normal;margin: 0 4px;color: #00a0e9;">{{articleCount}}</b>篇
          </span>
        </div>
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
        <li v-for="item in articleList" :key="item.id" class="material_item">
          <div class="draft-list">
            <div class="cover">
              <img
                class="article_edit_content"
                :src="item.cover"
                :title="item.title"
                alt="item.title"
                style="height: 75px; width:120px;"
              />
            </div>
            <div class="info">
              <div class="article_title" :title="item.title">{{item.title}}</div>
              <div class="article_title2" :title="item.desc">{{item.desc}}</div>
              <div class="add_time">{{item.add_time}}</div>
            </div>
          </div>

          <div style="width: 100%;margin: 10px 0;">
            <span class="toolButton">
              <a title="编辑" href="javascript:;" class="edit-favsave" @click="editArticle(item.id)">
                <i class="fa fa-edit"></i>编辑
              </a>
            </span>
            <span class="toolButton">
              <a
                title="删除"
                href="javascript:;"
                class="edit-favsave"
                v-on:click.once="delArticle(item.id)"
              >
                <i class="fa fa-edit"></i>删除
              </a>
            </span>
            <span class="toolButton">
              <a title="预览" href="javascript:;" class="edit-favsave">
                <i class="fa fa-edit"></i>预览
              </a>
            </span>
            <span class="toolButton">
              <a title="历史" href="javascript:;" class="edit-favsave">
                <i class="fa fa-edit"></i>历史
              </a>
            </span>
            <span class="toolButton">
              <a title="分类" href="javascript:;" class="edit-favsave">
                <i class="fa fa-edit"></i>分类
              </a>
            </span>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { deleteArticle, getArticleList, getArticle } from "../api/home";
export default {
  name: "HomeArticle",
  data() {
    return {
      activeIndex: "1",
      categoryList: [],
      articleCount: 0,
      articleList: [],
      tmpArticleList: [],
      loading: false,
      currentDraftId: 0,
      noMore: false,
      page: 1,
      pageSize: 20,
      scrollImmediate: false
    };
  },
  created() {
    this._getArticleList();
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    loadMore() {
      this.loading = true;
      this._getArticleList();
    },
    /*编辑文章*/
    editArticle(id) {
      let params = {
        id: id
      };
      getArticle(params).then(res => {
        this._insertToEditor(res.data.data);
      });
    },
    /*删除文章*/
    delArticle(id) {
      this.$confirm("此操作将永久删除该文章内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: id
          };
          deleteArticle(params).then(res => {
            this.page = 1;
            this._getArticleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    /*文章列表*/
    _getArticleList() {
      if (!this.userId) {
      } else {
        let params = {
          mid: this.$store.state.userId,
          page: this.page,
          pagesize: this.pageSize
        };
        getArticleList(params).then(res => {
          this.loading = false;
          let list = res.data.data;
          if (this.page === 1 && list) {
            this.articleList = list;
          } else if (this.page > 1 && list) {
            this.articleList = this.articleList.concat(list);
          }
          this.articleCount = res.data.total;
          this.noMore = list && list.length < this.pageSize;
          this.page++;
        });
      }
    },
    _insertToEditor(obj) {
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }
      console.log(obj)
      this.$emit("insertToEditor", obj);
    }
  }
};
</script>

<style lang="less" scoped>
@import "@assets/common/option";
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
        &:hover {
          background-color: @active-bg;
          color: @active-color;
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
        border: 1px solid #e6e6e6;
        margin: 10px;

        > .inner {
          overflow: hidden;
        }
        &:hover > .inner {
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4);
        }
      }
    }
    > p {
      font-size: 14px;
      color: #666;
      text-align: center;
      padding: 1em 0;
    }
  }
}
.inner {
  padding: 0 20px;
  height: 52px;
  background: #fff;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  box-sizing: border-box;
}

.draft-list {
  .flex();

  .cover {
    flex: 3;
    .xcenter();
    .flex();
    .ycenter();
  }
  .info {
    flex: 4;
    .ellipsis();
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.2s;
    .article_title {
      padding: 10px 0 15px;
      .ellipsis();
    }
    .article_title2 {
      .ellipsis();
    }
    .add_time {
      padding-top: 40px;
      padding-bottom: 10px;
      cursor: default;
    }
  }
}

.title {
  width: 100%;
  color: #303133;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content {
  padding: 10px;
  min-height: 80px;
  box-sizing: border-box;
}
.delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  background-color: #909399;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 50%;
  /*opacity: 0;*/
  z-index: 9;
}
.toolButton {
  display: -moz-inline-box;
  display: inline-block;
  width: 20%;
  text-align: center;
}
</style>