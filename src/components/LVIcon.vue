<template>
  <i class="iconfont" :slot="slotName" :class="`${iconClass} ${className}`" :style="`font-size: ${iconSize}px`" @click="_iconClick"></i>
</template>

<script>
  export default {
    name: "LVIcon",
    props: {
      iconClass: {
        type: String,
        default: ''
      },
      slotName: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        iconOption: {
          'icon_lv_material': {
            size: '18'
          },
          'icon_lv_article': {
            size: '18'
          },
          'icon_lv_draft': {
            size: '18'
          },
          'icon_lv_picture': {
            size: '18'
          },
          'icon_lv_template': {
            size: '18'
          },
          'icon_lv_weixin': {
            size: '18'
          },
          'icon_lv_download': {
            size: '18'
          },
          'icon_lv_copy': {
            size: '18'
          },
          'icon_lv_delete': {
            size: '18'
          },
          'icon_lv_save': {
            size: '18'
          },
          'icon_lv_close': {
            size: '44'
          },
          'icon_lv_mobilephone': {
            size: '14'
          },
          'icon_lv_shield': {
            size: '14'
          }
        }
      }
    },
    computed: {
      iconSize() {
        return this.iconOption[this.iconClass]['size']
      }
    },
    methods: {
      _iconClick() {
        this.$emit('iconClick')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("//at.alicdn.com/t/font_1916170_ei8smo9f5xg.css");
  .lv_icon {
    display: inline-block;
  }
</style>