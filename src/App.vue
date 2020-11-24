<template>
  <div id="app">
    <navigation></navigation>
    <ce-map></ce-map>
    <left></left>
    <right></right>
  </div>
</template>

<script>
import navigation from "@/views/nav";
import ceMap from '@/views/map';
import left from '@/views/left'
export default {
  name: "app",
  components: {
    navigation,
    ceMap,
    left
  },
};
</script>

<style lang="scss">
@import "./assets/css/cesiumViewer";
@import "./assets/css/bimPage";
@import "./assets/css/common";
@import "./assets/css/reset";
@import "./assets/css/publice_zyj.css";
@import "./assets/icon/iconfont.css"
</style>
