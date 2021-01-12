<template>
  <div>
    <iframe v-if="showMap" :src="`${src}/ceMap/index.html`" frameborder="0" width="100%" height="100%" id="map"></iframe>
    <!-- <iframe src="#" frameborder="0" width="100%" height="100%"></iframe> -->
    <!-- <div id="message">{{message}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "qwe",
      src:appConfig.mapIp,
      showMap:appConfig.showMap
    };
  },
  mounted() {
      this.getMessage()
      this.$eventBus.$on('testchild',(e)=>{
        console.log(e);
      })
  },
  destroyed(){
      window.removeEventListener("message");
  },
  methods: {
    getMessage() {
      const receive = e => {
        if (e.origin !== appConfig.mapIp) return;
        const params = e.data;
        this.message = JSON.stringify(params);
        this.$eventBus.$emit(params.eventName,params.params);
      };
      window.addEventListener("message", receive, false);
    },
    sendMessage(
      message = { eventName: "test", params: { name: "Alice", age: 21 } }
    ) {
      document
        .getElementById("map")
        .contentWindow.postMessage(message, appConfig.mapIp);
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
#message {
  position: absolute;
  top: 70px;
  left: 0;
  width: 200px;
  height: 200px;
  background: $primary;
  z-index: 22;
}
</style>
