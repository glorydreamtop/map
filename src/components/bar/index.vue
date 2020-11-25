<template>
  <div ref="bar" class="wrapper">
    <img :src="src" alt="" srcset="" @click="drawer">
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {},
  data() {
    return {
      show:false,
      src:require('@/assets/imgs/展开.png')
    }
  },
  created() {},
  mounted() {},
  methods: {
    drawer(){
      this.$emit('click')
      this.show = !this.show;
      this.src = require(`@/assets/imgs/${this.show?'收起':'展开'}.png`)
      this.$el.style.transform = this.show?"translateX(25vw)":"translateX(0)";
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  img{
    width: 20px;
  }
  position: absolute;
  left: 0;
  top: 45vh;
  transform: translateX(0);
  transition: transform 0.3s ease 1ms;
}
</style>
