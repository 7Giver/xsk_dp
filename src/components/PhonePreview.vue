<template>
  <div class="phone_preview_container" v-show="visible">
    <div class="phone_preview" :style="`background-image: url(${baseFile}/common/img/phone_preview.png)`">
      <div class="inner article_edit_content" v-html="tmpArticle"></div>
      <LVIcon :iconClass="'icon_lv_close'" @iconClick="closePop"></LVIcon>
    </div>
  </div>
</template>

<script>
  import LVIcon from '@components/LVIcon'
  export default {
    name: "PhonePreview",
    components: {
      LVIcon,
    },
    props: {
      value: {
        type: Boolean,
        value: false
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      closePop() {
        this.visible = false
      }
    },
    computed: {
      baseFile() {
        return this.$store.state.baseFile
      },
      tmpArticle() {
        return this.$store.state.tmpArticle
      }
    },
    watch: {
      visible(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.visible = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .phone_preview_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 3000;
    .phone_preview {
      width: 338px;
      height: 678px;
      margin: 15vh auto 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      padding: 77px 0 0 21px;
      position: relative;
      z-index: 1;
      .inner {
        width: 293px;
        height: 523px;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #fff;
        box-sizing: border-box;
        padding: 10px 5px;
      }
      i.icon_lv_close {
        position: absolute;
        right: -90px;
        top: 0;
        z-index: 9;
        color: #fff;
      }
    }
  }
</style>