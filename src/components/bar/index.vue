<template>
  <div ref="bar" class="wrapper" :class="`${position}wrapper`">
    <img :src="src" alt="" srcset="" @click="drawer">
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: ['position'],
  data() {
    return {
      show:false,
      src:require('@/assets/imgs/展开.png')
    }
  },
  mounted() {
  	console.log(this.position)
  },
  methods: {
    drawer(){
	  console.log('click',this.position)
      this.$emit('click')
      this.show = !this.show;
      this.src = require(`@/assets/imgs/${this.show?'收起':'展开'}.png`);
	  if(this.position=='left'){
		  console.log(this.position)
		  this.$el.style.transform = this.show?"translateX(20vw)":"translateX(0)";
	  }else if('right'){
		  this.$el.style.transform = this.show?"translateX(-15vw) rotate(180deg)":"translateX(0vw) rotate(180deg)";
	  }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.leftwrapper{
  img{
    width: 20px;
  }
  position: absolute;
  left: 0;
  z-index: 600;
  top: 45vh;
  transform: translateX(0);
  transition: transform 0.3s ease 1ms;
}

.rightwrapper {
	img{
	  width: 20px;
	}
	position: absolute;
	right: 0;
	z-index: 600;
	top: 45vh;
	transform: rotate(180deg);
	transition: transform 0.3s ease 1ms;
	// transform: stranslate(1000px,0); 
}
</style>
