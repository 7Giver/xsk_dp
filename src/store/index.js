import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router/index";
import createPersistedState from "vuex-persistedstate"
import { getDraftList } from "../api/home";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseFile: "http://h5.yingku866.com/Public/Qiniu",
    userId: null,
    userBrand: null,
    userBid: null,
    userSite: null,
    userName: null,
    userUpic: null,
    userTel: null,
    tmpArticle: null,
    isEditor: null,

    loading: false,//HomeDraft页面
    page: 1,
    draftList: [],
    draftCount: 0,
    noMore: false,
    pageSize:4
  },
  mutations: {
    logout(state) {
      state.userId = null
      state.userBid = null
      state.userBrand = null
      state.userSite = null
      state.userName = null
      state.userUpic = null
      state.userTel = null
      state.tmpArticle = null
      state.isEditor = null
      window.location.reload()
    },
    setBaseFile(state) {
      state.baseFile = process.env.BASE_File
      console.log('process.env.BASE_File :>> ', process.env.BASE_File);
    },
    setMemberData(state, data) {
      state.userId = data.userId ? data.userId : null
      state.userBid = data.userBid ? data.userBid : null
      state.userBrand = data.userBrand ? data.userBrand : null
      state.isEditor = data.isEditor ? data.isEditor : null
      state.userSite = data.userSite ? data.userSite : null
      state.userTel = data.userTel ? data.userTel : null
      state.userName = data.userName ? data.userName : '未登录'
      state.userUpic = data.userUpic ? data.userUpic : 'https://cdn.xhh1888.cn/upic/nopic.png'
    },
    updateMemberData(state, data) {
      state.userId = data.userId ? data.userId : state.userId
      state.userBid = data.userBid ? data.userBid : state.userBid
      state.userBrand = data.userBrand ? data.userBrand : state.userBrand
      state.isEditor = data.isEditor ? data.isEditor : state.isEditor
      state.userSite = data.userSite ? data.userSite : state.userSite
      state.userTel = data.userTel ? data.userTel : state.userTel
      state.userName = data.userName ? data.userName : state.userName
      state.upic = data.userUpic ? data.userUpic : state.userUpic
    },
    clearMemberData(state) {
      state.userId = null
      state.userBid = null
      state.userBrand = null
      state.isEditor = null
      state.userName = null
      state.userUpic = null
    },
    clearDoc(state) {
      state.tmpArticle = null
      router.push(`/home/material`)
      window.location.reload();
    },
    saveTmpArticle(state, data) {
      state.tmpArticle = data ? data : null
    },

   
  
   
   
    //清空草稿
    clearDraftList(state){
      state.draftList.splice(0,state.draftList.length);
      state.page = 1;
    },

    _loading(state,data){
      state.loading = data;
    },
    //草稿单个删除
    deleteOneDraft(state,data){
      state.draftList.splice(data,1);
      state.draftCount = state.draftCount - 1;
      state.noMore = state.draftList.length === state.draftCount; 
      
    },
    //草稿全部删除
    deleteAllDraft(state,data){
      state.draftList.splice(0,state.draftList.length);
      state.draftCount = 0
      state.noMore = true;
    },
    //新增之后，获取第一页数据
    
    getFirstPageData(state,data){
      // state.draftList.splice(0,state.draftList.length);
      // state.draftCount = 0
      // state.page = 1;
      // state.loading = false
      state.draftList.unshift(data.list[0]);
      
      state.draftCount = data.total;
    },
    //获取全部
    getDraftList(state,data){

      state.draftCount = 0
      state.loading = true;
      state.draftList = state.draftList.splice(0,state.draftList.length)
      for(var i = 0; i < data.arr.length; i++){
        state.draftList.push(data.arr[i])
      }
      state.draftCount = data.totalNum;
      
      state.noMore = state.draftList.length === data.totalNum;
      if(state.noMore){
        state.loading = false;
      }else{
        state.page++
      }
      
    }
  },
  actions: {
    //点击 保存草稿  按钮，获取第一页的数据
    getFirstPage(context,payload){
      getDraftList(payload.params).then(res => {
        let list = res.data.data;
        let total = res.data.total;
        if (list.length) {
          for (let i = 0; i < list.length; i++) {
            list[i].boDelete = false;
          }
        }
        let obj = {
          list: list,
          total: total
        }
        context.commit('getFirstPageData',obj)
      })
    },
    //获取全部草稿数据
    _getDraftList(context, payload){
      getDraftList(payload.params).then(res => {
        let list = res.data.data;
        let arr = [];
        var totalNum = res.data.total;
        if (list.length) {
          for (let i = 0; i < list.length; i++) {
            list[i].boDelete = false;
          }
        }
        if (payload.params.page === 1 && list.length) {
          arr = list;
        } else if (payload.params.page > 1 && list.length) {
          for(var i = 0; i < list.length; i++){
            arr.push(list[i])
          }
        }
        let obj = {
          arr: arr,
          totalNum: totalNum
        }
        context.commit('getDraftList',obj)
      })
    }
   
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
