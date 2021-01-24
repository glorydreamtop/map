<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      width="70vw"
      :before-close="close"
      append-to-body
      v-loading="loading2"
      element-loading-text="文件转码中..."
      title="报告编辑"
      @close="$emit('update:showDialog', false)"
    >
      <div class="flex">
        <el-input placeholder="标题" v-model="form.TitleName"></el-input>
        <el-date-picker v-model="form.Customdate" type="date" placeholder="选择日期"></el-date-picker>
        <el-select placeholder="请选择" v-model="form.Importance">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button class="save" @click="submit">保存</el-button>
        <el-button class="save" @click="submit">导出</el-button>
      </div>
      <editor v-if="visible" ref="zceditor" id="zceditor" v-model="form.ReportContent" />
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDictItemsByUcode,
  AddReportManagement,
  EditReportManagement
} from "@/api";
import { mapGetters } from "vuex";
import editor from "@/components/edtor";
import { deepClone } from "../../utils";
export default {
  name: "Bggl",
  data() {
    return {
      visible: false,
      add: false,
      form: {
        TitleName: "",
        Importance: "",
        ReportContent: "",
        Customdate: ""
      },
      loading1: false,
      loading2: false,
      loading3: false,
      options: []
    };
  },
  computed: {
    ...mapGetters(["projectNo"])
  },
  components: { editor },
  created() {
    this.getDict();
  },
  methods: {
    async getDict() {
      const list = await GetDictItemsByUcode({ ucode: 10110001 });
      this.options = list.map(item => ({ value: item.uname }));
    },
    async submit() {
      const form = deepClone(this.form);
      if (Object.values(form).includes("")) {
        this.$message.error("请检查必填项");
        return;
      }
      const id = form.id;
      delete form.id;
      if (this.add) {
        await AddReportManagement({
          ProjectNo: this.projectNo,
          JsonStr: JSON.stringify(form)
        });
      } else {
        await EditReportManagement({ id, JsonStr: JSON.stringify(form) });
      }
      this.clear();
      this.visible = false;
    },
    clear(){
      Object.keys(this.form).forEach(key => (this.form[key] = ""));   
      this.$emit("update");
    },
    close(done) {
      this.clear();
      done();
    },
    downLoad() {}
  }
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 300px;
  margin-right: 20px;
}
.save {
  margin-left: auto;
}
#zceditor {
  margin-top: 20px;
}
</style>
