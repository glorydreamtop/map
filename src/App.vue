<template>
  <div id="app">
    <navigation></navigation>
    <ce-map></ce-map>
    <el-drawer
      :modal="false"
      title="左侧抽屉"
      ref="leftDrawer"
      :with-header="false"
      :visible.sync="leftDrawer"
      direction="ltr"
      :wrapperClosable="false"
      :append-to-body="true"
    >
      <left />
    </el-drawer>
    <bar @click="closeDrawer" />
    <right></right>
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
      leftDrawer: false
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
  mounted() {
    
  },
  methods: {
    closeDrawer() {
      this.leftDrawer = !this.leftDrawer;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/cesiumViewer";
@import "./assets/css/bimPage";
@import "./assets/css/common";
@import "./assets/css/reset";
@import "./assets/css/publice_zyj.css";
@import "./assets/icon/iconfont.css";
.el-drawer__wrapper {
  width: 25vw;
  right: 75vw;
  margin-right: 0;
}
.el-drawer.ltr {
  width: 25vw !important;
  overflow: visible !important;
}
</style>
