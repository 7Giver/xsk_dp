<template>
  <div class="home_material_container">
    <div class="header_material">
      <div class="header_class">
        <div class="inner">
          <span class="tips">
            共有草稿
            <b style="font-style: normal;margin: 0 4px;color: #00a0e9;">{{draftCount}}</b>篇
          </span>
          <button @click="_clearDraft">
            <i class="iconfont icon-shanchu"></i> 清空
          </button>
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
        <li
          v-for="(item, index) in draftList"
          :key="item.id"
          class="material_item"
          @mousemove="showDeleteBtn(index)"
          @mouseleave="hideDeleteBtn(index)"
        >
          <div class="draft-list">
            <div class="info" @click="_insertToEditor(item)">
              <div class="article_title" :title="item.title">{{item.title}}</div>
            </div>
            <div class="content" @click="_insertToEditor(item)">
              <div class="KolEditor" v-html="item.content"></div>
            </div>
          </div>
          <div v-show="item.boDelete" class="delete" @click="delDraft(item.id,index)">
            <i class="el-icon-delete"></i>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { deleteDraft, getDraftList, clearDraft } from "../api/home";
export default {
  name: "HomeDraft",
  data() {
    return {
      activeIndex: "1",
      categoryList: [],
      // draftCount: 0,
      // draftList: [],
      tmpDraftList: [],
      // loading: false,
      currentDraftId: 0,
      // noMore: false,
      // page: 1,
      // pageSize: 20,
      scrollImmediate: false
    };
  },
  created() {
    this.$store.commit('clearDraftList')
    // this._getDraftList();
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
    loading() {
      return this.$store.state.loading;
    },
    page() {
      return this.$store.state.page;
    },
    draftList() {
      return this.$store.state.draftList;
    },
    draftCount() {
      return this.$store.state.draftCount;
    },
    noMore() {
      return this.$store.state.noMore;
    },
    pageSize() {
      return this.$store.state.pageSize;
    }
  },
  methods: {
    showDeleteBtn(index) {
      this.draftList[index].boDelete = true;
    },
    hideDeleteBtn(index) {
      this.draftList[index].boDelete = false;
    },
    loadMore() {
      let bol = true;
      this.$store.commit("_loading", bol);

      // this._getDraftList()
    },
    delDraft(id, index) {
      this.$confirm("此操作将永久删除该草稿内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: id
          };
          deleteDraft(params).then(res => {
            this.$store.commit("deleteOneDraft", index);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    _clearDraft() {
      if (!this.$store.state.draftCount) return;
      this.$confirm("此操作将会清空所有草稿内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            mid: this.$store.state.userId
          };
          clearDraft(params).then(res => {
            this.$store.commit("deleteAllDraft");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    _getDraftList() {
      if (!this.userId) {
      } else {
        let params = {
          mid: this.$store.state.userId,
          page: this.$store.state.page,
          pagesize: this.$store.state.pageSize
        };

        this.$store.dispatch({
          type: "_getDraftList",
          params: params
        });
      }
    },

    _insertToEditor(obj) {
      if (!this.userId) {
        this.$util.ToastLogin();
        return false;
      }
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
        position: relative;
        background-color: #fff;
        border: 1px solid #e6e6e6;
        margin-bottom: 10px;

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
  position: relative;
  overflow: hidden;
  background: #fff;
  margin-bottom: 10px;
  transition: all, 0.3s, ease;
}
.info {
  background: #f8f9fb;
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  transition: all 0.2s;
  .cursor();
  &:hover {
    background-color: rgb(231, 241, 251);
  }
  .article_title {
    .ellipsis();
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
  max-height: 270px;
  box-sizing: border-box;
  .cursor();
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
  z-index: 9;
  .cursor();
}
</style>