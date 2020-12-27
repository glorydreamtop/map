<template>
  <el-dialog
    title="建设征地农村小型专项和农副业设施调查表"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <el-collapse ref="collapse" v-model="collapse" accordion>
      <el-collapse-item :title="currentType" name="1">
        <form-title ref="formTitle" @success="createTitle" />
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
      KEYNO: () => this.keyNo,
      ADD: () => this.add
    };
  },
  inject: ["TOPINDEX"],
  data() {
    return {
      collapse: "1",
      dialogVisible: false,
      add: true,
      keyNo: 0,
      types: ["农专项设施设备"],
      currentType: "农专项设施基础信息"
    };
  },
  computed: {
    topIndex() {
      return this.TOPINDEX();
    }
  },
  components: { formTitle, formMain },
  watch: {
    topIndex: {
      handler(newVal) {
        let types = require("../json/formMain.json");
        this.types = types[newVal];
        this.currentType = ["农专项设施基础信息", "农村个体工商户调查基本信息"][
          newVal
        ];
      },
      immediate: true
    }
  },
  methods: {
    handleClose(done) {
      this.$refs.formTitle.$refs.form1.resetFields()
      done();
    },
    createTitle(e) {
      if (e) {
        this.keyNo = e;
      }
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