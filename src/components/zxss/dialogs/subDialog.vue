<template>
  <el-dialog :title="title" append-to-body :visible.sync="dialogVisible" :before-close="handlerClose">
    <el-form class="flex" ref="form" :rules="rules" :model="form">
      <el-form-item
        v-for="item in formProps"
        :key="item.value"
        :prop="item.value"
        :label="item.title"
      >
        <el-input
          v-model="form[item.value]"
          :placeholder="item.hide?'自动生成':'必填'"
          :disabled="item.hide"
          :type="item.textArea?'textarea':'input'"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="create">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddNCZXSS_SUB, EditNCZXSS_SUB } from "@/api";
import { deepClone } from "@/utils";
export default {
  inject: ["KEYNO"],
  props: {
    idx: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "农专项设施设备"
    }
  },
  data() {
    return {
      add:true,
      id:0, // 子项id
      dialogVisible: false,
      form: {},
      formProps: [],
      rules: {}
    };
  },
  computed:{
    keyNo(){
      return this.KEYNO()
    }
  },
  created() {
    const all = require("../json/subTableProps.json");
    this.formProps = all[this.idx];
    this.formProps.forEach(item => {
      if (!item.hide) {
        this.rules[item.value] = { required: true };
      }
    });
  },
  methods: {
    // 创建子项
    create() {
      let form = deepClone(this.form);
      if(form.KeyNo){
        delete form.KeyNo
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            if (this.add) {
              await AddNCZXSS_SUB({
                id: this.keyNo,
                TypeName: this.title,
                JsonStr: JSON.stringify(form)
              });
            }else{
              await EditNCZXSS_SUB({
                id: this.id,
                JsonStr: JSON.stringify(form)
              })
            }
            this.$emit("success");
            this.$refs.form.resetFields();
            this.dialogVisible = false;
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    handlerClose(done){
      this.$refs.form.resetFields();
      done()
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 40px;
  .el-form-item {
    width: 33%;
    display: flex;
    justify-content: flex-end;
    .el-input,
    .el-cascader,
    .el-select {
      width: 150px;
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