<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      width="70vw"
      v-loading="loading2"
      element-loading-text="文件转码中..."
      title="定额设置"
      @close="$emit('update:showDialog', false)"
      center
    >
      <div class="box justify-between">
        <div class="box-left">
          <el-cascader class="margin-bottom-l" placeholder="选择地区" :props="selectorList"></el-cascader>
          <el-collapse v-model="classify" accordion>
            <el-collapse-item v-for="item in classifyNames" :title="item" :key="item" :name="item">
              <div
                :class="['typeList padding-left-l',currentType === item ?'active':'']"
                v-for="item in 16"
                :key="item"
              >土木房屋结构</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="datalist margin-left-l">
          <el-button
            title="上传"
            size="small"
            class="el-icon-plus margin-bottom-m"
            @click="$refs.upload.dialogVisible = true"
          />
          <el-table :data="tableData">
            <el-table-column prop="no" label="文件编号"></el-table-column>
            <el-table-column prop="name" label="文件名"></el-table-column>
            <el-table-column prop="type" label="文件类型"></el-table-column>
            <el-table-column fixed="right" label="操作" width="230" class="justify-between">
              <template slot-scope="scope">
                <el-button
                  title="查看"
                  icon="el-icon-view"
                  type="primary"
                  plain
                  @click="lookClick(scope.row)"
                ></el-button>
                <el-button
                  title="更新"
                  icon="el-icon-edit"
                  type="warning"
                  plain
                  @click="editClick(scope.row)"
                ></el-button>
                <el-button
                  title="删除"
                  icon="el-icon-delete"
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
            @current-change="pageChange"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetQuotas, GetQuotaClassifyList } from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "Desz",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      locationno: 0,
      visible: false,
      folders: [], //树的数据
      tableData: [], //表格数据
      selectorList: {
        lazy: true,
        async lazyload(node, resolve) {
          const nodes = await this.getArea();
          resolve(nodes);
        }
      },
      classify: "",
      classifyNames: [
        "土地补偿标准",
        "房屋补偿标准",
        "青苗补偿标准",
        "地面附着物拆迁标准",
        "专项设置标准",
        "相关政策文件及标准"
      ],
      currentType: "",
      currentTotal: 5,
      loading1: false,
      loading2: false,
      updateFileId: 0 // 待更新文件id
    };
  },
  computed: {
    ...mapGetters(["projectNo"])
  },
  watch: {
    showDialog: {
      handler(newVal) {
        this.visible = newVal;
        // newVal && this.getArea();
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getArea() {
      const res = await GetQuotas({
        ProjectNo: this.projectNo,
        Locationno: this.locationno
      });
      return res.map(item => ({
        value: item.o_locationno,
        label: item.o_locationdesc,
        leaf: !item.o_haschild
      }));
    },
    async getTypeList() {
      await GetQuotaClassifyList();
    },
    async getList(currentPage = 1) {
      const { list, total } = await GetDocsByFolderId({
        folderid: this.currentNo,
        CurrentPage: currentPage,
        PageSize: 5
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
    },
    async lookClick(e) {
      this.loading2 = true;
      const Type = e.minetype.includes("doc") ? "word" : "excel";
      const res1 = await GetDocumentByDocNo({ docid: e.no });
      try {
        const res2 = await GetWordOrExcelToPDF({ Type, Path: res1[0].url });
        this.loading2 = false;
        window.open(`http://aglostech1.yicp.io:9080/${res2[0].url}`);
      } catch (error) {
        this.loading2 = false;
        this.$message.error("文件转换失败");
      }
    },
    editClick(e) {
      this.updateFileId = e.no;
      this.$refs.upload.dialogVisible = true;
    },
    async delClick(e) {
      await DelDoc({ docid: e.no });
      this.$message.success("删除成功");
      this.getList(1);
    },
    updateTable() {
      // 释放“待更新文件”指针
      this.updateFileId = 0;
      this.getList(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 600px;
  .box-left {
    position: relative;
    background-color: rgba($primary, 0.5);
  }
  .box-left::after {
    content: "\e6dc";
    font-family: element-icons;
    position: absolute;
    top: 45%;
    right: -40px;
    font-size: 36px;
  }
  .el-cascader {
    width: 300px;
  }
  .el-collapse {
    width: 300px;
    height: 500px;
    overflow: auto;
    .typeList:hover,
    .typeList.active {
      background-color: $sub;
    }
  }
  .datalist {
    max-width: 950px;
    flex-grow: 1;
    .opreation {
    }
  }
}
</style>
