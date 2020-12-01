<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      :show-close="false"
      width="240px"
      title="资料管理"
      @close="$emit('update:zlglShow',false)"
      center
    >
      <el-tree :data="folders" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="no" label="文件编号" width="180"></el-table-column>
          <el-table-column prop="name" label="文件名" width="180"></el-table-column>
          <el-table-column prop="type" label="文件类型"></el-table-column>
        </el-table>
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
      currentNo: 0
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
    async handleNodeClick(e) {
      console.log(e.no);
      this.currentNo = e.no;
      this.tableData = await GetDocsByFolderId({ folderid: e.no });
    }
  }
};
</script>

<style lang="scss" scoped>
.box{
  
}
</style>
