<template>
  <el-dialog
    title="建设征地农村小型专项和农副业设施调查表"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <el-collapse ref="collapse" v-model="collapse" accordion>
      <el-collapse-item title="农村专项设施基础信息" name="1">
        <form-title @success="createTitle" />
      </el-collapse-item>
      <el-collapse-item
        v-for="(item,index) in types"
        :title="item"
        :key="item"
        :name="(index + 2).toString()"
      >
        <form-main :type="item" @success="createForm((index + 2).toString())" />
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import formTitle from "./formTitle";
import formMain from "./formMain";
export default {
  name: "nczxDialog",
  props: {},
  provide() {
    return {
      keyNo: this.keyNo
    };
  },
  data() {
    return {
      collapse: "1",
      dialogVisible: false,
      keyNo: 0,
      types: ["农专项设施设备"]
    };
  },
  components: { formTitle, formMain },
  created() {
    let types = [
      "农专项设施设备",
      "农村个体房屋及构筑物",
      "农村个体专用房屋及构筑物",
      "农村个体设施设备",
      "农村个体存货"
    ];
  },
  methods: {
    handleClose(done) {
      done();
    },
    createTitle(e) {
      this.keyNo = e;
      this.$refs.collapse.handleItemClick({ name: "1" });
    },
    createForm(name) {
      this.$refs.collapse.handleItemClick({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-collapse {
  min-height: 50vh;
}
</style>