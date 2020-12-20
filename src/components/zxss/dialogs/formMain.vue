<template>
  <div>
    <div class="flex margin-bottom-l">
      <el-button icon="el-icon-plus" @click="postItem(true)"></el-button>
      <el-button icon="el-icon-edit" @click="postItem(false)"></el-button>
      <el-button icon="el-icon-delete" @click="delItem"></el-button>
    </div>
    <sub-dialog ref="sub" :add="add" :idx="index" :title="type" />
    <el-table :data="tableData" border>
      <el-table-column
        v-for="item in tableProps"
        :prop="item.value"
        :label="item.title"
        :key="item.value"
      ></el-table-column>
    </el-table>
    <el-pagination
      class="margin-top-l"
      :total="currentTotal"
      small
      :page-size="5"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
import subDialog from "./subDialog";
import { GetNCZXSS_SUBS } from "../../../api";
export default {
  inject: ["keyNo"],
  props: {
    type: {
      type: String,
      default: "农专项设施设备"
    }
  },
  data() {
    return {
      add: false,
      tableData: [],
      tableProps: [],
      index: 0,
      currentTotal: 1
    };
  },
  components: { subDialog },
  created() {
    const allTableProps = require("./subTableProps.json");
    let types = [
      "农专项设施设备",
      "农村个体房屋及构筑物",
      "农村个体专用房屋及构筑物",
      "农村个体设施设备",
      "农村个体存货"
    ];
    this.index = types.indexOf(this.type);
    this.tableProps = allTableProps[this.index];
    this.getList(1)
  },
  methods: {
    async getList(CurrentPage = 1) {
      const {list,total} = await GetNCZXSS_SUBS({ CurrentPage, PageSize: 5, TypeName: this.type,id:this.keyNo });
      this.tableData = list;
      this.currentTotal = total;
    },
    postItem(add) {
      this.add = add;
      this.$refs.sub.dialogVisible = true;
    },
    delItem() {},
    pageChange(e) {
      this.getList(e);
    }
  }
};
</script>

<style>
</style>