<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      v-if="visible"
      :close-on-press-escape="false"
      width="70vw"
      append-to-body
      v-loading="loading"
      element-loading-text="文件转码中..."
      title="报告管理"
      @close="$emit('update:showDialog', false)"
    >
      <div class="flex">
        <el-input placeholder="标题" v-model="pTitleName"></el-input>
        <el-select placeholder="请选择人员" v-model="pUserId">
          <el-option
            v-for="item in members"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select placeholder="请选择" v-model="pImportance">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button icon="el-icon-search" @click="getList"></el-button>
        <el-button icon="al-icon-tianjia" @click="postItem(true)"></el-button>
        <el-button icon="al-icon-xiugai" @click="postItem(false)"></el-button>
        <el-button icon="al-icon-xiazai" @click="downLoad"></el-button>
      </div>
      <el-table
        :data="dataList"
        class="margin-top-l"
        border
        highlight-current-row
        @current-change="currentChange"
      >
        <el-table-column
          v-for="item in tableProps"
          :key="item.value"
          :prop="item.value"
          :label="item.name"
        ></el-table-column>
      </el-table>
      <editor ref="editor" />
    </el-dialog>
  </div>
</template>

<script>
import { AllUsers, GetDict, GetReportManagements } from "@/api";
import { mapGetters } from "vuex";
import editor from "./editor";
export default {
  name: "Bggl",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      pTitleName: "",
      pUserId: 0,
      pImportance: "",
      currentId: "",
      currentTotal: 5,
      currentPage: 1,
      dataList: [],
      loading:false,
      members: [],
      options: [],
      tableProps: [
        { name: "标题", value: "TitleName" },
        { name: "重要性", value: "Importance" },
        { name: "内容", value: "ReportContent" },
        { name: "报告时间", value: "Customdate" },
        { name: "人员姓名", value: "UserName" },
        { name: "建立时间", value: "Createdate" },
        { name: "更改时间", value: "Updatedate" }
      ]
    };
  },
  components: { editor },
  computed: {
    ...mapGetters(["projectNo"])
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
        newVal && this.getAllUsers() && this.GetDict() && this.getList();
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getAllUsers() {
      const list = await AllUsers();
      this.members = list.map(item => {
        return {
          label: item.o_userdesc,
          value: item.o_userno
        };
      });
    },
    async GetDict() {
      const list = await GetDict();
      this.options = list[0].children[7].children.map(item => {
        return {
          label: item.uname,
          value: item.ucode
        };
      });
    },
    async getList() {
      const params = {
        ProjectNo: this.projectNo,
        pTitleName: this.pTitleName,
        pImportance: this.pImportance,
        pUserId: this.pUserId,
        CurrentPage: this.currentPage,
        PageSize: 5
      };
      const { total, list } = await GetReportManagements(params);
      this.dataList = list;
      this.currentTotal = total;
    },
    currentChange(e) {
      console.log(e);
    },
    postItem(add) {
      this.$refs.editor.visible = true;
      this.$refs.editor.add = add;
    },
    async downLoad() {
      this.loading = true;
      try {
        const res = await ReportManagementExport({ id: this.currentId });
        window.open(`${appConfig.baseIp}/${res[0].url}`);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 200px;
  margin-right: 20px;
}
</style>
