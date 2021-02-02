<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      width="70vw"
      :before-close="close"
      append-to-body
      title="报告模板编辑"
      @close="$emit('update:showDialog', false)"
    >
      <div class="flex">
        <el-select placeholder="请选择" v-model="form.Importance">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button class="save" @click="submit">保存</el-button>
      </div>
      <editor v-if="visible" ref="zceditor" id="zceditor" v-model="form.ReportContent" />
    </el-dialog>
  </div>
</template>

<script>
import {
  GetDictItemsByUcode,
  AddReportManagement,
  EditReportManagement,
  GetReportManagements
} from "@/api";
import { mapGetters } from "vuex";
import editor from "@/components/edtor";
import { deepClone } from "../../utils";
export default {
  name: "Bgglmb",
  data() {
    return {
      visible: false,
      add: false,
      currentId:'',
      form: {
        TitleName: "模板报告",
        Importance: "非常重要",
        ReportContent: "",
        Customdate: "2021/1/14 17:47:00"
      },
      options: []
    };
  },
  computed: {
    ...mapGetters(["projectNo"])
  },
  components: { editor },
  async created() {
    this.getDict();
    const params = {
        ProjectNo: this.projectNo,
        pTitleName: '模板报告',
        pImportance:'非常重要',
        pUserId:'',
        CurrentPage: 1,
        PageSize: 1
      };
    const {list ,total} = await GetReportManagements(params)
    this.form = list[0]
    this.currentId = list[0].KeyNo
  },
  methods: {
    async getDict() {
      const list = await GetDictItemsByUcode({ ucode: 10110001 });
      this.options = list.map(item => ({ value: item.uname }));
    },
    async submit() {
      const form = deepClone(this.form);
      delete form.KeyNo
      delete form.UserName
      delete form.Createdate
      delete form.Updatedate
      if (Object.values(form).includes("")) {
        this.$message.error("请检查必填项");
        return;
      }
      if (this.add) {
        this.currentId = (await AddReportManagement({
          ProjectNo: this.projectNo,
          JsonStr: JSON.stringify(form)
        }))[0].Keyno;
      } else {
        await EditReportManagement({ id:this.currentId, JsonStr: JSON.stringify(form) });
      }
      this.clear();
      this.visible = false;
    },
    clear(){   
      this.$emit("update");
    },
    close(done) {
      this.clear();
      done();
    }
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
