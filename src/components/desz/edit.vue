<template>
  <el-dialog
    title="添加"
    :visible.sync="dialogVisible"
    append-to-body
    width="20vw"
  >
    <el-form ref="form" label-position="right" :model="form" label-width="60px">
      <el-form-item label="名称">
        <el-input v-model="form.UNAME"></el-input>
      </el-form-item>
      <el-form-item label="条件">
        <el-input v-model="form.Ucondition"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model.number="form.UnitPrice"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.Unit"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.Remarks"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddQuotaItem, EditQuotaItem } from "@/api";
import { deepClone } from "@/utils";
export default {
  name: "deszAdd",
  data() {
    return {
      dialogVisible: false,
      add: true,
      form: {
        UNAME: "",
        Ucondition: "",
        UnitPrice: "",
        Unit: "",
        Remarks: "",
      },
    };
  },
  props: {
    currentType: {
      default: "",
      type: Number,
      required: true,
    },
  },
  methods: {
    async update() {
      const form = deepClone(this.form);
      delete form.KeyNo;
      try {
        if (this.add) {
          await AddQuotaItem({
            Virtualitemno: this.currentType,
            JsonStr: JSON.stringify(form),
          });
        } else {
          await EditQuotaItem({
            KeyNo: parseInt(this.form.KeyNo),
            JsonStr: JSON.stringify(form),
          });
        }
        this.$message.success(`${this.add ? "添加" : "修改"}成功`);
        this.$emit("update");
      } catch (error) {
        this.$message.error(error);
      }
      this.dialogVisible = false;
    },
  },
};
</script>