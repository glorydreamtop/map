<template>
  <div class="justify-around">
    <div class="flex-col align-center item" @click="zxssTable(0)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>小型专项及农副业</span>
    </div>
    <div class="flex-col align-center item" @click="zxssTable(1)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>个体工商户</span>
    </div>
    <el-dialog
      :title="dialogTitle"
      append-to-body
      @close="closeDialog"
      :visible.sync="showFlag"
    >
      <!-- 动态组件 -->
      <component :is="dialogType" :dialog-type="dialogType"></component>
    </el-dialog>
  </div>
</template>

<script>
import zx from './tables/zx'
import gt from './tables/gt'
export default {
  name: "Zxss",
  props: {},
  data() {
    return {
      dialogTitle: "",
      showFlag: false,
      dialogType: "",
    };
  },
  components:{zx,gt},
  created() {},
  mounted() {},
  methods: {
    zxssTable(e) {
      let map = [
        { title: "小型专项及农副业设置", name: "zx" },
        { title: "个体工商户", name: "gt" },
      ];
      this.dialogTitle = `建设征地农村${map[e].title}调查`;
      this.dialogType = map[e].name;
      this.showFlag = true;
    },
    closeDialog() {
      this.showFlag = false;
    },
    showStudescode() {},
  },
};
</script>

<style lang="scss" scoped>
.item {
  [class*="icon"] {
    font-size: 36px;
  }
}
</style>
