<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      v-if="visible"
      :close-on-press-escape="false"
      width="70vw"
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
      </div>
      <editor id="zceditor" v-model="form.ReportContent"/>
    </el-dialog>
  </div>
</template>

<script>
import { GetDict,AddReportManagement } from "@/api";
import { mapGetters } from "vuex";
import editor from "@/components/edtor"
export default {
  name: "Bggl",
  data() {
    return {
      visible: false,
      add:false,
      form:{
        TitleName:'',
        Importance:'',
        ReportContent:'',
        Customdate:''
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
  components:{editor},
  created() {
    this.GetDict();
  },
  methods: {
    async GetDict() {
      const list = await GetDict();
      this.options = list[0].children[7].children.map(item => {
        return {
          label: item.uname,
          value: item.ucode
        };
      });
    },
    async submit() {
      await AddReportManagement()
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
#zceditor{
  margin-top: 20px;
}
</style>
