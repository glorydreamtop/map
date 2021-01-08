<template>
  <div>
    <div class="flex margin-bottom-l">
      <el-button icon="al-icon-tianjia" @click="postItem(true)"></el-button>
      <el-button icon="al-icon-xiugai" @click="postItem(false)"></el-button>
      <el-button icon="al-icon-shanchu" @click="delItem()"></el-button>
    </div>
    <sub-dialog ref="sub" :idx="index" :title="type" @success="getList" />
    <el-table :data="tableData" border highlight-current-row @current-change="handleCurrentChange">
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
      @current-change="getList"
    ></el-pagination>
  </div>
</template>

<script>
import subDialog from "./subDialog";
import { GetNCZXSS_SUBS, DelNCZXSS_SUB } from "../../../api";
export default {
  inject: ["KEYNO"],
  props: {
    type: {
      type: String,
      default: "农专项设施设备"
    }
  },
  data() {
    return {
      tableData: [],
      tableProps: [],
      index: 0,
      currentTotal: 1,
      subId: 0, // 子项id
      subForm: {} // 子项表单
    };
  },
  computed: {
    keyNo() {
      return this.KEYNO();
    }
  },
  components: { subDialog },
  created() {
    const allTableProps = require("../json/subTableProps.json");
    let types = [
      "农专项设施设备",
      "农村个体房屋及构筑物",
      "农村个体专用房屋及构筑物",
      "农村个体设施设备",
      "农村个体存货"
    ];
    this.index = types.indexOf(this.type);
    this.tableProps = allTableProps[this.index];
    if (this.keyNo > 0) {
      this.getList(1);
    }
  },
  methods: {
    async getList(CurrentPage = 1) {
      const { list, total } = await GetNCZXSS_SUBS({
        CurrentPage,
        PageSize: 5,
        TypeName: this.type,
        id: this.keyNo
      });
      this.tableData = list;
      this.currentTotal = total;
    },
    handleCurrentChange(e) {
      this.subId = parseInt(e.KeyNo);
      this.subForm = e;
    },
    postItem(add) {
      this.$refs.sub.add = add;
      this.$refs.sub.dialogVisible = true;
      this.$refs.sub.id = this.subId;
      this.$refs.sub.form = this.subForm;
    },
    async delItem() {
      try {
        await DelNCZXSS_SUB({ id:this.subId });
        this.$message.success('删除成功');
        this.getList(1);
      } catch (error) {
        
      }
    }
  }
};
</script>

<style>
</style>