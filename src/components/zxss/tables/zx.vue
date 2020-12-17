<template>
  <div>
    <el-button icon="el-icon-plus" @click="postItem(true)"></el-button>
    <zx ref="zx" />
    <el-table class="margin-top-l" :data="tableData">
      <el-table-column
        v-for="item in tableProps"
        :key="item.value"
        :prop="item.value"
        :label="item.title"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="230"
        class="justify-between"
      >
        <template slot-scope="scope">
          <el-button
            title="更新"
            icon="el-icon-edit"
            type="warning"
            plain
            @click="postItem(false, scope.row)"
          ></el-button>
          <el-button
            title="删除"
            icon="el-icon-delete"
            type="danger"
            plain
            @click="delItem(scope.row.KeyNo)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margin-top-l"
      :total="total"
      small
      :page-size="5"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
import zx from "../dialogs/zx";
import { GetNCZXSS_BASE } from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "nczxTable",
  data() {
    return {
      tableData: [],
      total: 0,
      tableProps: [
        { title: "专项名称", value: "ZXMC" },
        { title: "项目名称", value: "XMMC" },
        { title: "权属单位", value: "QSDW" },
        { title: "建成年月", value: "JCNY" },
        { title: "规模", value: "GM" },
        { title: "年产值", value: "NCZ" },
        { title: "年利润", value: "NLR" },
        { title: "税金", value: "SJ" },
        { title: "高程分布", value: "GCFB" },
        { title: "固定资产投资", value: "GDZCTZ" },
        { title: "从业人员", value: "CYRY" },
        { title: "其他", value: "QT" },
      ], // 表格表头
    };
  },
  computed: {
    ...mapGetters(["projectNo"]),
  },
  components: {
    zx,
  },
  created() {
    this.getList();
  },
  methods: {
    async getList(page = 1) {
      const { total, list } = await GetNCZXSS_BASE({
        ProjectNo: this.projectNo,
        CurrentPage: page,
        PageSize: 5,
      });
      this.tableData = list;
      this.total = total;
    },
    pageChange(e) {
      this.getList(e);
    },
    // 增改
    postItem(add) {
      if(add){
        this.$refs.zx.dialogVisible = true;
      }
    },
    // 删除
    delItem() {},
  },
};
</script>

<style lang="scss" scoped>
</style>