<template>
  <div id="app">
    <el-drawer
      size="20vw"
      :modal="false"
      title="左侧抽屉"
      ref="leftDrawer"
      :with-header="false"
      :visible.sync="leftDrawer"
      direction="ltr"
      custom-class="left"
      :wrapperClosable="false"
    >
      <left />
    </el-drawer>
    <bar @click="closeDrawer_left" position="left" />
    <el-drawer
      size="15vw"
      :modal="false"
      title="右侧抽屉"
      ref="rightDrawer"
      :with-header="false"
      :visible.sync="rightDrawer"
      direction="rtl"
      custom-class="right"
      :wrapperClosable="false"
    >
      <right></right>
    </el-drawer>
    <bar @click="closeDrawer_right" position="right" />

    <navigation></navigation>
    <!-- <ce-map></ce-map> -->
    <login></login>
    <!-- <dragableDialog /> -->
  </div>
</template>

<script>
import navigation from "@/views/nav";
import ceMap from "@/views/map";
import left from "@/views/left";
import right from "@/views/right";
import login from "@/views/login";
import bar from "@/components/bar";
export default {
  name: "app",
  data() {
    return {
      leftDrawer: false,
      rightDrawer: false
    };
  },
  components: {
    navigation,
    ceMap,
    left,
    right,
    login,
    bar
  },
  mounted(){
    // 缩小左右抽屉的渲染范围，防止彼此覆盖
    document.querySelector('.right').parentElement.parentElement.style.left = '85vw';
    document.querySelector('.left').parentElement.parentElement.style.right = '80vw';
  },
  methods: {
    closeDrawer_left() {
      this.leftDrawer = !this.leftDrawer;
    },
    closeDrawer_right() {
      this.rightDrawer = !this.rightDrawer;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/common";
@import "./assets/css/reset";
@import "./assets/css/publice_zyj.css";
@import "./assets/icon/iconfont.css";
.el-drawer {
  position: absolute;
  bottom: 0;
  z-index: 600;
}
</style>
