<template>
  <div>
    <div class="justify-between">
    <div class="flex-col align-center item" @click="jbqkTable(1)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>农村</span>
    </div>
    <div class="flex-col align-center item" @click="jbqkTable(2)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>城市集镇</span>
    </div>
    <div class="flex-col align-center item" @click="jbqkTable(3)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>专业项目</span>
    </div>
    <div class="flex-col align-center item" @click="jbqkTable(4)">
      <i class="al-icon-xiangmuguanli text-light"></i>
      <span>企事业单位</span>
    </div>
  </div>
  <el-dialog
      :title="dialogTitle"
      :append-to-body="true"
      @close="closeDialog"
      :visible.sync="showFlag"
      v-model="showFlag"
      class="newStyleDialog"
      custom-class="jbqkTable_dialog"
    >
    <!-- 动态组件 -->
    <component
        :is="`jbqkTableHome${dialogType}`"
        :dialog-type="dialogType"
        v-on:showStudes="showStudescode"
        :dialog-form="dialogForm"
		v-if="showFlag"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import jbqkTableHome1 from "@/components/jbqkTablePage/jbqkTable_home1.vue"; //基本情况表农村-更多操作
import jbqkTableHome2 from "@/components/jbqkTablePage/jbqkTable_home2.vue"; //基本情况表城市-更多操作
import jbqkTableHome3 from "@/components/jbqkTablePage/jbqkTable_home3.vue"; //基本情况表专业项目-更多操作
import jbqkTableHome4 from "@/components/jbqkTablePage/jbqkTable_home4.vue"; //基本情况表企事业-更多操作
export default {
  name: "Leftjbqk",
  props: {},
  data() {
    return {
      dialogTitle: "", //弹出框标题
      dialogForm: "", //弹出框表单
      showFlag: false, //弹出框显隐状态
      dialogType: 1, //弹出框操作类型
    };
  },
  components: {
    jbqkTableHome1,
    jbqkTableHome2,
    jbqkTableHome3,
    jbqkTableHome4,
  },
  created() {},
  mounted() {},
  methods: {
    jbqkTable(dialogType) {
      //基本情况调查表
      const titleList = ["农村", "城市集镇", "专业项目", "企事业单位"];
      this.dialogTitle = `${titleList[dialogType - 1]}基本情况调查表`;
      this.showFlag = true;
      this.dialogForm = "";
      this.dialogType = dialogType;
    },
    closeDialog() {
      //关闭弹出框
    },
    showStudescode(data) {
      //监听弹出框是关还是闭
    },
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
