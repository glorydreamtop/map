<template>
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
    <div class="content">
      <div class="flex">
        <el-input placeholder="标题" clearable v-model="pTitleName"></el-input>
        <el-select placeholder="请选择人员" v-model="pUserId" clearable>
          <el-option
            v-for="item in members"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select placeholder="请选择" clearable v-model="pImportance">
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
        <el-button @click="$refs.mbeditor.visible = true">模板管理</el-button>
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
          width="180px"
        >
        </el-table-column>
      </el-table>
      <el-pagination
            class="margin-top-l"
            :total="currentTotal"
            small
            @current-change="pageChange"
          ></el-pagination>
      <editor ref="editor" @update="getList" />
      <mbeditor ref="mbeditor" />
    </div>
  </el-dialog>
</template>

<script>
import { AllUsers, GetDictItemsByUcode, GetReportManagements } from "@/api";
import { mapGetters } from "vuex";
import editor from "./editor";
import mbeditor from "./mbeditor";
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
      pUserId: "",
      pImportance: "",
      currentFile: {},
      currentTotal: 5,
      currentPage: 1,
      dataList: [],
      loading: false,
      members: [],
      options: [],
      tableProps: [
        { name: "标题", value: "TitleName" },
        { name: "重要性", value: "Importance" },
        // { name: "内容", value: "ReportContent" },
        { name: "报告时间", value: "Customdate" },
        { name: "人员姓名", value: "UserName" },
        { name: "建立时间", value: "Createdate" },
        { name: "更改时间", value: "Updatedate" }
      ]
    };
  },
  components: { editor ,mbeditor},
  computed: {
    ...mapGetters(["projectNo"])
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
        newVal && this.getAllUsers() && this.getDict() && this.getList();
      },
      immediate: true
    }
  },
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
    async getDict() {
      const list = await GetDictItemsByUcode({ ucode: 10110001 });
      this.options = list.map(item => ({ value: item.uname }));
    },
    pageChange(e){
      this.currentChange = e;
      this.getList();
    },
    async getList() {
      const params = {
        ProjectNo: this.projectNo,
        pTitleName: this.pTitleName,
        pImportance: this.pImportance,
        pUserId: this.pUserId,
        CurrentPage: this.currentPage,
        PageSize: 8
      };
      const { total, list } = await GetReportManagements(params);
      this.dataList = list;
      this.currentTotal = total;
    },
    currentChange(e) {
      this.currentFile = e;
    },
    postItem(add) {
      this.$refs.editor.visible = true;
      this.$refs.editor.add = add;
      if (!add) {
        const currentFile = this.currentFile;
        this.$refs.editor.form = {
          TitleName: currentFile.TitleName,
          Importance: currentFile.Importance,
          ReportContent: currentFile.ReportContent,
          Customdate: currentFile.Customdate
        };
        this.$refs.editor.currentId = currentFile.KeyNo
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  max-height: 800px;
  min-height: 600px;
  overflow: auto;
  .el-table{
    max-height:600px;
  }
}
.el-input,
.el-select {
  width: 200px;
  margin-right: 20px;
}
</style>
