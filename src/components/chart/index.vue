<template>
  <div>
    <div style="width: 300px;height:300px;" :id="id"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  props: {
    id: {
      type: String,
      required: true,
      default: "chart1",
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
      this.chart = echarts.init(document.getElementById(this.id),'dark');
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
</style>
