<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-press-escape="false"
    width="70vw"
    append-to-body
    v-loading="loading2"
    element-loading-text="文件转码中..."
    title="资料管理"
    @close="$emit('update:showDialog', false)"
  >
    <div class="box">
      <el-tree
        v-loading="loading1"
        element-loading-text="加载中..."
        class="tree"
        :data="folders"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <div class="datalist">
        <el-button
          title="上传"
          size="small"
          class="al-icon-tianjia margin-bottom-m"
          @click="addFile"
        />
        <upload ref="upload" :id="currentNo" @update="getList" />
        <el-table :data="tableData" v-loading="loading3">
          <el-table-column prop="no" label="文件编号"></el-table-column>
          <el-table-column prop="name" label="文件名"></el-table-column>
          <el-table-column prop="type" label="文件类型"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="230"
            class="justify-between"
          >
            <template slot-scope="scope">
              <el-button
                title="查看"
                icon="al-icon-yulan"
                type="primary"
                plain
                @click="lookClick(scope.row)"
              ></el-button>
              <el-button
                title="更新"
                icon="al-icon-xiugai"
                type="warning"
                plain
                @click="editClick(scope.row)"
              ></el-button>
              <el-button
                title="删除"
                icon="al-icon-shanchu"
                type="danger"
                plain
                @click="delClick(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="margin-top-l"
          :total="currentTotal"
          small
          :page-size="5"
          @current-change="pageChange"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  GetFolders,
  GetDocsByFolderId,
  GetDocumentByDocNo,
  GetWordOrExcelToPDF,
  DelDoc,
} from "@/api";
import { mapGetters } from "vuex";
import upload from "@/components/files/upload";
export default {
  name: "Zlgl",
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    upload,
  },
  data() {
    return {
      visible: false,
      folders: [], //树的数据
      tableData: [], //表格数据
      defaultProps: {
        children: "children",
        label: "desc",
      },
      currentNo: 0,
      currentTotal: 5,
      loading1: false,
      loading2: false,
      loading3: false,
    };
  },
  computed: {
    ...mapGetters(["projectNo"]),
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
        newVal && this.getFolders();
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async getFolders() {
      this.loading1 = true;
      this.folders = await GetFolders({
        ProjectNo: this.projectNo,
      });
      this.loading1 = false;
    },
    async getList(currentPage = 1) {
      this.loading3 = true;
      const { list, total } = await GetDocsByFolderId({
        folderid: this.currentNo,
        CurrentPage: currentPage,
        PageSize: 5,
      });
      this.tableData = list;
      this.currentTotal = total;
      this.loading3 = false;
    },
    handleNodeClick(e) {
      if (e.children.length > 0) return;
      this.currentNo = e.no;
      this.getList(1);
    },
    pageChange(e) {
      this.getList(e);
    },
    async lookClick(e) {
      this.loading2 = true;
      console.log(e.minetype);
      const minetype = e.minetype;
      const Type = minetype.includes("doc")
        ? "word"
        : minetype.includes("xls")
        ? "excel"
        : "img";
      try {
        const res1 = await GetDocumentByDocNo({
          docid: e.no,
        });
        if (Type !== "img") {
          const res2 = await GetWordOrExcelToPDF({
            Type,
            Path: res1[0].url,
          });
          window.open(`${appConfig.baseIp}/${res2[0].url}`);
        } else {
          window.open(`${appConfig.baseIp}/${res1[0].url}`);
        }
        this.loading2 = false;
      } catch (error) {
        this.loading2 = false;
        this.$message.error("文件转换失败");
      }
    },
    addFile() {
      this.$refs.upload.dialogVisible = true;
      this.$refs.upload.add = true;
    },
    editClick(e) {
      this.$refs.upload.dialogVisible = true;
      this.$refs.upload.docId = e.no;
      this.$refs.upload.add = false;
    },
    async delClick(e) {
      await DelDoc({
        docid: e.no,
      });
      this.$message.success("删除成功");
      this.getList(1);
    },
  },
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
    height: 600px;
    overflow: auto;
    border: 1px solid $white;
    background-color: rgba($primary, 0.5);
  }

  .datalist {
    height: 600px;
    padding: 20px;
    border: 1px solid $white;
    max-width: 950px;
    flex-grow: 1;
    margin-left: 20px;

    .el-pagination {
      margin: 20px auto;
    }
  }
}
</style>
