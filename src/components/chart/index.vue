<template>
  <div class="chart-bg">
    <div :style="{width: width,height:height}" :id="id"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
export default {
  name: "Chart",
  props: {
    id: {
      type: String,
      required: true,
      default: "chart1",
    },
    width:{
      type:String,
      default:'22vw'
    },
    height:{
      type:String,
      default:'30vh'
    },
    options:{
      type:Object,
      required:true,
      default(){
        return{}
      }
    }
  },
  data() {
    return {
      chart: "",
    };
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.id));
      const chart = this.chart;
      chart.setOption(this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
.cavanas{
  width: 200px;
  height: 200px;
}
.chart-bg{
  background-color: rgba($color: $primary, $alpha: 0.5);
}
</style>
