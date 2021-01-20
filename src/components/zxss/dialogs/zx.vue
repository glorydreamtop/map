<template>
  <el-dialog
    title="建设征地农村小型专项和农副业设施调查表"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
    v-if="dialogVisible"
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
       <el-collapse-item title="关联文档" :name="(types.length+2).toString()">
        <files :id="keyNo" :init="!add" />
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
</template>

<script>
import formTitle from "./formTitle";
import formMain from "./formMain";
import files from "@/components/files"
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
      currentType: "农专项设施基础信息",
      docId:0
    };
  },
  computed: {
    topIndex() {
      return this.TOPINDEX();
    }
  },
  components: { formTitle, formMain,files },
  watch: {
    topIndex: {
      async handler(newVal) {
        let {types} = await import("../json/formMain.js");
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
      this.collapse = "1"
      this.$emit("update")
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