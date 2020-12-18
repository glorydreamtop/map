<template>
  <el-dialog
    title="建设征地农村小型专项和农副业设施调查表"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <el-collapse v-model="collapse" accordion>
      <el-collapse-item title="农村专项设施基础信息" name="1">
        <el-form
          ref="form1"
          class="form-title flex"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="选择地区">
            <el-cascader
              placeholder="选择地区"
              :show-all-levels="false"
              @change="selectArea"
              :props="selectorList"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="专项名称">
            <el-select v-model="form.ZXMC" placeholder="请选择">
              <el-option
                v-for="item in ['水库淹没区', '水库影响区', '枢纽工程建设区']"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="item in formProps"
            :key="item.value"
            :label="item.title"
            :prop="item.value"
          >
            <el-input v-model="form[item.value]" placeholder="必填"></el-input>
          </el-form-item>
          <el-button
            class="btn1"
            size="mini"
            type="primary"
            plain
            @click="create"
            >立即创建</el-button
          >
        </el-form>
      </el-collapse-item>
      <el-collapse-item> </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AddNCZXSS_BASE, GetQuotas } from "@/api";
import { mapGetters } from "vuex";
import { deepClone } from "@/utils";
export default {
  name: "nczxDialog",
  props: {},
  data() {
    return {
      collapse: "1",
      dialogVisible: false,
      form: {},
      keyNo: "",
      formProps: require("./tableProps.json"), // 表单内容
      rules: {}, // 表单验证规则
      selectorList: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level } = node;
          if (node.value === undefined) {
            node.value = { id: 0 };
          }
          let nodes = (await this.getArea(node.value.id)).map((item) => ({
            value: { id: item.o_locationno, name: item.o_locationdesc },
            label: item.o_locationdesc,
            leaf: level > 2,
          }));
          resolve(nodes);
        },
      },
    };
  },
  computed: {
    ...mapGetters(["projectNo"]),
  },
  created() {
    this.formProps.forEach((item) => {
      this.rules[item.value] = { required: true };
    });
    
  },
  methods: {
    handleClose(done) {
      done();
    },
    // 获取地区列表
    async getArea(Locationno = 0) {
      return await GetQuotas({
        ProjectNo: this.projectNo,
        Locationno,
      });
    },
    selectArea(e) {
      console.log(e);
      const locations = {
        County: e[0].id,
        CountyDESC: e[0].name,
        Town: e[1].id,
        TownDESC: e[1].name,
        Village: e[2].id,
        VillageDESC: e[2].name,
        VillageGroup: e[3].id,
        VillageGroupDESC: e[3].name,
      };
      this.form = Object.assign(this.form, locations);
    },
    // 创建基本信息
    create() {
      let form = deepClone(this.form);
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          try {
            let res = await AddNCZXSS_BASE({
              ProjectNo: this.projectNo,
              TypeName: "农专项设施基础信息",
              JsonStr: JSON.stringify(form),
            });
            this.keyNo = res[0].KeyNo;
            this.$refs.form1.resetField();
          } catch (error) {}
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-collapse {
  min-height: 50vh;
}
.form-title {
  flex-wrap: wrap;
  position: relative;
  margin: 0 40px 40px;
  .el-form-item {
    width: 33%;
    display: flex;
    justify-content: flex-end;
    .el-input,
    .el-cascader {
      width: 150px;
    }
  }
  .btn1 {
    width: auto;
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>