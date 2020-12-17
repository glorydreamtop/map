<template>
  <el-dialog
    title="建设征地农村小型专项和农副业设施调查表"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <el-collapse v-model="collapse" accordion>
      <el-collapse-item title="农村专项设施基础信息" name="1">
        <el-form
          ref="form1"
          class="form-title flex"
          :rules="rules"
          :model="form"
          label-width="80px"
        >
          <el-form-item
            v-for="item in formProps"
            :key="item.value"
            :label="item.title"
            :prop="item.value"
          >
            <el-input v-model="form[item.value]" placeholder="必填"></el-input>
          </el-form-item>
          <el-button
            class="btn1"
            size="mini"
            type="primary"
            plain
            @click="create"
            >立即创建</el-button
          >
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddNCZXSS_BASE } from "@/api";
import { mapGetters } from "vuex";
import { deepClone } from "@/utils";
export default {
  name: "nczxDialog",
  props: {},
  data() {
    return {
      collapse: "1",
      dialogVisible: false,
      form: {},
      formProps: require("./tableProps.json"), // 表单内容
      rules: {}, // 表单验证规则
    };
  },
  computed: {
    ...mapGetters(["projectNo"]),
  },
  created() {
    this.formProps.forEach((item) => {
      this.rules[item.value] = { required: true };
    });
  },
  methods: {
    handleClose() {},
    create() {
      let form = deepClone(this.form);
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          let res = await AddNCZXSS_BASE({
            ProjectNo: this.projectNo,
            JsonStr: JSON.stringify(form),
          });
          console.log(res);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-title {
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 40px;
  .el-form-item {
    width: 33%;
    .el-input {
      width: 200px;
    }
  }
  .btn1 {
    width: auto;
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>