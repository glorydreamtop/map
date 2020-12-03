<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      :show-close="false"
      width="60vw"
      title="资料管理"
      @close="$emit('update:zlglShow',false)"
      center
    >
      <div class="box">
        <el-tree class="tree" :data="folders" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <div class="datalist">
          <el-table :data="tableData">
            <el-table-column prop="no" label="文件编号"></el-table-column>
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="type" label="文件类型"></el-table-column>
          </el-table>
          <el-pagination
          class="margin-top-l"
            layout="prev, pager, next"
            :total="currentTotal"
            small
            @current-change="pageChange"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetFolders, GetDocsByFolderId } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "Zlgl",
  props: {
    zlglShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      folders: [],
      tableData: [],
      defaultProps: {
        children: "children",
        label: "desc"
      },
      currentNo: 0,
      currentTotal: 10
    };
  },
  computed: {
    ...mapGetters(["projectNo"])
  },
  watch: {
    zlglShow: {
      handler(newVal) {
        this.visible = newVal;
        if (newVal) {
          this.getFolders();
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getFolders() {
      this.folders = await GetFolders({ ProjectNo: this.projectNo });
    },
    async getList(currentPage = 1) {
      const {list,total} = await GetDocsByFolderId({
        folderid: this.currentNo,
        CurrentPage: currentPage,
        PageSize: 10
      });
      this.tableData = list;
      this.currentTotal = total;
    },
    handleNodeClick(e) {
      this.currentNo = e.no;
      this.getList(1);
    },
    pageChange(e) {
      this.getList(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 100%;
  min-height: 600px;
  justify-content: space-between;
  .tree {
    width: 380px;
    height: 550px;
    overflow: auto;
  }
  .datalist {
    width: 650px;
  }
}
</style>
