<template>
  <div>
    <el-button icon="al-icon-tianjia" @click="postItem(true)"></el-button>
    <zx ref="zx" :currentType="currentType" @update="getList" />
    <el-table class="margin-top-l" :data="tableData" v-loading="loading">
      <el-table-column
        v-for="item in tableProps"
        :key="item.value"
        :prop="item.value"
        :label="item.title"
      >
        <template slot-scope="scope">
          <more v-if="item.value==='BZ'" :info="scope.row[item.value]" :title="item.title" />
          <span v-else>{{scope.row[item.value]}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230" class="justify-between">
        <template slot-scope="scope">
          <el-button
            title="更新"
            icon="al-icon-xiugai"
            type="warning"
            plain        @click="postItem(false, scope.row)"
          ></el-button>
          <el-button
            title="删除"
            icon="al-icon-shanchu"
            type="danger"
            plain        @click="delItem(scope.row.KeyNo)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="margin-top-l"
      :total="total"
      small
      :page-size="5"
      @current-change="getList"
    ></el-pagination>
  </div>
</template>

<script>
import zx from "./dialogs/zx";
import { GetNCZXSS_BASE, DelNCZXSS_BASE } from "@/api";
import { mapGetters } from "vuex";
import { deepClone } from "../../utils";

export default {
  name: "nczxTable",
  provide() {
    return {
      TOPINDEX: () => this.index
    };
  },
  props: {
    dialogType: {
      type: String,
      required: true,
      default: "zx"
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      index: 0,
      loading: false,
      currentType: "农专项设施基础信息",
      tableProps: [] // 表格表头
    };
  },
  computed: {
    ...mapGetters(["projectNo"])
  },
  components: {
    zx
  },
  watch: {
    dialogType: {
      async handler(newVal) {
        const map = { zx: 0, gt: 1 };
        const { all } = await import("./json/formProps.js");
        this.index = map[newVal];
        this.tableProps = all[this.index];
        this.currentType = ["农专项设施基础信息", "农村个体工商户调查基本信息"][
          this.index
        ];
        this.getList();
      },
      immediate: true
    }
  },
  methods: {
    async getList(page = 1) {
      this.loading = true;
      const { total, list } = await GetNCZXSS_BASE({
        ProjectNo: this.projectNo,
        CurrentPage: page,
        PageSize: 5,
        TypeName: this.currentType
      });
      this.tableData = list;
      this.total = total;
      this.loading = false;
    },
    // 增改
    postItem(add, e) {
      this.$refs.zx.dialogVisible = true;
      this.$refs.zx.add = add;
      if (e) {
        this.$refs.zx.keyNo = e.KeyNo;
        this.$nextTick(() => {
          this.$refs.zx.$refs.formTitle.form = deepClone(e);
        });
      }
    },
    // 删除
    async delItem(id) {
      try {
        await DelNCZXSS_BASE({ id });
        this.$message.success("删除成功");
        this.getList(1);
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
</style>