<template>
  <div id="app">
    <navigation></navigation>
    <ce-map></ce-map>
  </div>
</template>

<script>
import navigation from "@/views/nav";
import ceMap from '@/views/map'
export default {
  name: "app",
  components: {
    navigation,
    ceMap
  },
};
</script>

<style lang="scss">
@import "./assets/css/cesiumViewer";
@import "./assets/css/bimPage";
@import "./assets/css/common";
@import "./assets/css/reset";
@import "./assets/icon/iconfont.css"
</style>
