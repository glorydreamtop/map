<template>
  <el-dialog
    :visible.sync="visible"
    v-if="visible"
    fullscreen
    :close-on-press-escape="false"
    width="80vw"
    append-to-body
    title="统计信息"
    @close="$emit('update:showDialog', false)"
  >
    <div class="content flex">
      <chart id="chart1" :options="opt1" />
      <chart id="chart2" :options="opt2" />
      <chart id="chart3" :options="opt3" />
      <chart id="chart4" :options="opt4" />
    </div>
  </el-dialog>
</template>

<script>
import chart from "@/components/chart";
import mock from "./mock";
export default {
  name: "Tjxx",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      opt1: mock[0],
      opt2: mock[1],
      opt3: mock[2],
      opt4: mock[3]
    };
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
      },
      immediate: true,
    },
  },
  components: {
    chart,
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  height: 900px;
  overflow: auto;
}
</style>
