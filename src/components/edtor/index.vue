<template>
  <div class="home">
    <div id="richText"></div>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from "wangeditor";
export default {
  name: "editor",
  props: {
    value: ""
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    const editor = new wangEditor(`#richText`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.$emit("input", newHtml);
    };
    editor.config.menus = [
      "undo",
      "redo",
      "bold",
      "head",
      "link",
      "italic",
      "underline",
      "indent",
      "foreColor",
      "backColor",
      "justify"
    ];
    editor.config.showFullScreen = false
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
::v-deep .w-e-toolbar {
  background: transparent !important;
}
::v-deep .w-e-toolbar .w-e-menu i {
  color: $light;
  font-size: 28px;
}
::v-deep .w-e-text-container {
  background-color: rgba($primary, 0.5);
}
</style>