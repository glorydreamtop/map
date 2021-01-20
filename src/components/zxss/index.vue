<template>
  <div class="justify-around">
    <div class="flex-col align-center item" @click="zxssTable(0)">
      <i class="al-icon-xiaoxingzhuanxiangjinongfuye text-light"></i>
      <span>小型专项及农副业</span>
    </div>
    <div class="flex-col align-center item" @click="zxssTable(1)">
      <i class="al-icon-getigongshanghu text-light"></i>
      <span>个体工商户</span>
    </div>
    <el-dialog
    custom-class="el-dialog"
      :title="dialogTitle"
      append-to-body
      :visible.sync="showFlag"
      v-if="showFlag"
    >
      <zx class="box" :dialog-type="dialogType"></zx>
    </el-dialog>
  </div>
</template>

<script>
import zx from './zx'
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
  components:{zx},
  methods: {
    zxssTable(e) {
      let map = [
        { title: "小型专项及农副业设施", name: "zx" },
        { title: "个体工商户", name: "gt" },
      ];
      this.dialogTitle = `建设征地农村${map[e].title}调查`;
      this.dialogType = map[e].name;
      this.showFlag = true;
    },
    showStudescode() {},
  },
};
</script>

<style lang="scss" scoped>
.box{
  min-height: 40vh;
}
.item {
  [class*="icon"] {
    font-size: 36px;
  }
}
</style>
