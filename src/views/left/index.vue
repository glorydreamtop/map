<template>
  <div class="wrapper bg-primary padding-top-l">
    <el-tabs v-model="activeTab" @tab-click="check">
      <el-tab-pane label="统计信息" name="first"></el-tab-pane>
      <el-tab-pane label="详细信息" name="second">
        <el-collapse
          v-model="activeName"
          class="bg-primary margin-lr-l"
          accordion
        >
          <el-collapse-item title="基本情况调查表" name="1">
            <template slot="title"> 基本情况调查表 </template>
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
          </el-collapse-item>
          <el-collapse-item title="土地调查表" name="2"> </el-collapse-item>
          <el-collapse-item title="户信息调查表" name="3"> </el-collapse-item>
          <el-collapse-item title="农村专项设施调查表" name="4"></el-collapse-item>
          <el-collapse-item title="专项项目调查表" name="5"> </el-collapse-item>
          <el-collapse-item title="工业企业调查表" name="6"> </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
        :title="dialogTitle"
        :append-to-body="true"
        @close="closeDialog"
        :visible.sync="showFlag"
        v-model="showFlag"
        class="newStyleDialog"
        custom-class="jbqkTable_dialog"
      >
        <jbqkTableHome
          :dialog-type="dialogType"
          v-on:showStudes="showStudescode"
          :dialog-form="dialogForm"
          v-if="showFlag"
        ></jbqkTableHome>
      </el-dialog>
  </div>
</template>

<script>
import jbqkTableHome from "@/components/jbqkTablePage/jbqkTable_home.vue"; //基本情况表-更多操作
export default {
  name: "Index",
  props: {},
  components: {
    jbqkTableHome,
  },
  data() {
    return {
      activeTab: "second",
      activeName: "",
      dialogTitle: "", //弹出框标题
      dialogForm: "", //弹出框表单
      showFlag: true, //弹出框显隐状态
      dialogType: "open_jbqkTbale", //弹出框操作类型
    };
  },

  created() {},
  mounted() {},
  methods: {
    check() {},
    jbqkTable(dialogType) {
	  //基本情况调查表
	  console.log(dialogType);
      this.dialogTitle = "基本情况调查表";
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
.wrapper {
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 25vw;
}

::v-deep .el-tabs__item {
  color: $white;
  text-align: center;
  width: 50%;
  padding: 0;
}

::v-deep .el-tabs__nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.el-collapse {
  border-top: none;
  .item {
    [class*="icon"] {
      font-size: 36px;
    }
  }
}

::v-deep .el-collapse-item__header {
  background-color: $primary;
  color: $white;
  border-bottom: 1px solid $sub;
}
::v-deep .el-collapse-item__wrap {
  background-color: $primary;
  .el-collapse-item__content {
    color: $white;
  }
}
</style>
