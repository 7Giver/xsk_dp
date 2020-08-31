<template>
  <div class="edui-faked-music">
    <i class="icon_qqmusic_switch"
       :style="`background:url(${baseFile}/UEditor/themes/default/images/icon_qqmusic_audio_default.png) no-repeat 0 0;`"></i>
    <div class="qqmusic_content">
      <strong class="qqmusic_title">{{title}}</strong>
      <p class="qqmusic_desc">{{desc}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QQmusic",
    data() {
      return {
        title: 'undefined',
        desc: 'undefined'
      }
    },
    created() {
      const frame = window.frameElement;
      this.title = frame.attributes.music_name.value;
      this.desc = frame.attributes.singername.value;
    },
    computed: {
      baseFile() {
        return this.$store.state.baseFile
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0
  }

  .edui-faked-music {
    margin: 0 auto;
    height: 65px;
    box-sizing: border-box;
    border: 1px solid #e7e7eb;
    padding: 9px 12px;
    overflow: hidden;
    background-color: #fff;
  }

  .icon_qqmusic_switch {
    float: right;
    margin-left: 1em;
    margin-top: .5em;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    display: inline-block;
  }

  .qqmusic_content {
    overflow: hidden;
  }

  .qqmusic_title, .qqmusic_desc {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-weight: normal;
  }

  .qqmusic_desc {
    color: #8d8d8d;
  }
</style>