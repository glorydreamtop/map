<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :close-on-press-escape="false"
      width="70vw"
      title="定额设置"
      @close="$emit('update:showDialog', false)"
    >
      <div class="box justify-between">
        <div class="box-left flex-col">
          <el-cascader
            class="margin-bottom-l"
            placeholder="选择地区"
            @change="selectArea"
            :props="selectorList"
          ></el-cascader>
          <div @click.stop="checkLocation">
            <el-collapse @change="getTypeList" v-model="classify" accordion>
              <el-collapse-item
                v-for="(item, index) in classifyNames"
                :title="item"
                :key="item"
                :name="item"
                :disabled="locationNo === 0"
              >
                <div class="margin-left-s">
                  <el-button type="text" icon="al-icon-tianjia" @click="postQuota(item, true)"></el-button>
                  <el-button type="text" icon="al-icon-xiugai" @click="postQuota(item, false)"></el-button>
                  <el-button type="text" icon="al-icon-shanchu" @click="delQuota(item)"></el-button>
                </div>
                <div class="flex-col" @click="setCurrentType">
                  <span
                    :class="[
                      'typeList pointer padding-left-l',
                      currentType === i.o_virtualitemno ? 'active' : '',
                    ]"
                    v-for="i in subList[index]"
                    :key="i.o_virtualitemno"
                    :data-no="i.o_virtualitemno"
                  >{{ i.o_virtualitemdesc }}</span>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="datalist margin-left-l">
          <el-button
            title="添加"
            size="small"
            class="al-icon-tianjia margin-bottom-m"
            @click="postItem(true)"
          />
          <desz-add ref="add" :currentType="currentType" @update="updateTable" />
          <el-table :data="tableData" border>
            <el-table-column
              v-for="item in tableProps"
              :key="item.value"
              :prop="item.value"
              :label="item.title"
            >
              <template slot-scope="scope">
                <more v-if="item.title==='备注'" :info="scope.row[item.value]" :title="item.title" />
                <span v-else>{{scope.row[item.value]}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="230" class="justify-between">
              <template slot-scope="scope">
                <el-button
                  title="更新"
                  icon="al-icon-xiugai"
                  type="warning"
                  plain
                  @click="postItem(false, scope.row)"
                ></el-button>
                <el-button
                  title="删除"
                  icon="al-icon-shanchu"
                  type="danger"
                  plain
                  @click="delItem(scope.row.KeyNo)"
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
import {
  GetQuotas,
  GetQuotaClassifyList,
  AddQuota,
  EditQuota,
  DeleteQuota,
  GetQuotaItemList,
  DeleteQuotaItem
} from "@/api";
import { mapGetters } from "vuex";
import deszAdd from "./edit";
export default {
  name: "Desz",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  components: { deszAdd },
  data() {
    return {
      locationNo: 0, // 地点ID
      visible: false,
      tableProps: [
        { title: "名称", value: "UNAME" },
        { title: "条件", value: "Ucondition" },
        { title: "单价", value: "UnitPrice" },
        { title: "单位", value: "Unit" },
        { title: "备注", value: "Remarks" }
      ], // 表格表头
      tableData: [], //表格数据
      selectorList: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level } = node;
          let nodes = (await this.getArea(node.value)).map(item => ({
            value: item.o_locationno,
            label: item.o_locationdesc,
            leaf: level > 1
          }));
          resolve(nodes);
        }
      },
      classify: "",
      classifyNames: [
        "土地补偿",
        "房屋及附属建筑物",
        "青苗补偿",
        "农村小型专项及农副业设施",
        "个体工商户",
        "文教卫设施",
        "宗教设施",
        "其他项目"
      ],
      subList: Array(8).fill([]), // 二级分类列表
      currentType: 0, // 当前选中二级分类id
      currentTotal: 0,
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
      },
      immediate: true
    },
    classify: {
      handler(newVal) {
        if (newVal) {
          this.tableData = [];
          this.currentTotal = 0;
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取地区列表
    async getArea(Locationno = 0) {
      const res = await GetQuotas({
        ProjectNo: this.projectNo,
        Locationno
      });
      return res;
    },
    // 判断是否选择地区了
    checkLocation(e) {
      if (this.locationNo === 0) {
        this.$message.error("请先选择地区");
        return false;
      }
    },
    // 获取二级分类列表
    async getTypeList(ClassifyName, force) {
      // force强制刷新
      console.log(ClassifyName);
      
      if(this.classify === "")return
      const index = this.classifyNames.indexOf(ClassifyName);
      if ((this.subList[index].length > 0 && !force) || ClassifyName === "")
        return;
      const { list } = await GetQuotaClassifyList({
        LocationId: this.locationNo,
        ClassifyName,
        CurrentPage: 1,
        PageSize: 200
      });
      this.$set(this.subList, index, list);
    },
    // 选择地区
    selectArea(node) {
      this.locationNo = node[node.length - 1];
    },
    // 新增或修改二级分类,add为true添加false修改
    async postQuota(ClassifyName, add) {
      try {
        const { value } = await this.$prompt(
          "请输入项目名称",
          add ? "新增" : "修改为",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        );
        add &&
          (await AddQuota({
            ClassifyName,
            LocationId: this.locationNo,
            Virtualitemdesc: value
          }));
        !add &&
          (await EditQuota({
            Virtualitemno: this.currentType,
            Virtualitemdesc: value
          }));
        this.$message.success(`${add ? "添加" : "修改"}成功`);
        this.getTypeList(ClassifyName, true);
      } catch (error) {
        if (error) {
          this.$message.error(error);
        }
      }
    },
    // 删除一个二级分类
    async delQuota(ClassifyName) {
      try {
        await this.$confirm("将删除条目及其下所有详细信息，确定继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        await DeleteQuota({ Virtualitemno: this.currentType });
        this.getTypeList(ClassifyName, true);
      } catch (error) {
        if (error) {
          this.$message.error(error);
        }
      }
    },
    // 选中一个二级分类
    async setCurrentType(e) {
      this.currentType = parseInt(e.target.dataset.no);
      this.updateTable(1);
    },
    // 添加还是修改
    async postItem(add, item) {
      if (this.currentType === 0) {
        this.$message.warning("请先选择一个具体的二级分类");
        return;
      }
      this.$refs.add.add = add;
      if (!add) {
        this.$refs.add.form = item;
      }
      this.$refs.add.dialogVisible = true;
    },
    pageChange(e) {
      this.updateTable(e);
    },
    async delItem(KeyNo) {
      await DeleteQuotaItem({ KeyNo });
      this.$message.success("删除成功");
      this.updateTable(1);
    },
    async updateTable(CurrentPage = 1) {
      const { list, total } = await GetQuotaItemList({
        Virtualitemno: this.currentType,
        CurrentPage,
        PageSize: 5
      });
      this.tableData = list;
      this.currentTotal = total;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  min-height: 600px;
  .box-left {
    border: 1px solid $white;
    padding: 20px;
    background-color: rgba($primary, 0.5);
  }
  .el-cascader {
    width: 300px;
  }
  .el-collapse {
    width: 300px;
    height: 540px;
    overflow: auto;
    .typeList:hover,
    .typeList.active {
      background-color: $sub;
    }
  }
  .datalist {
    height: 640px;
    padding: 20px;
    border: 1px solid $white;
    max-width: 950px;
    flex-grow: 1;
  }
}
</style>
