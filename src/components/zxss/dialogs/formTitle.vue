<template>
  <el-form ref="form1" class="form-title flex" :rules="rules" :model="form">
    <el-form-item label="选择地区">
      <el-cascader
        placeholder="选择地区"
        :show-all-levels="false"
        @change="selectArea"
        ref="cascader"
        :value="area"
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
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-for="item in formProps"
      :key="item.value"
      :label="item.title"
      :prop="item.value"
    >
      <component :is="item.type" v-model="form[item.value]" placeholder="必填">
        <template v-if="item.unit" slot="append">{{item.unit}}</template>
      </component>
    </el-form-item>
    <el-button class="btn1" size="mini" type="primary" plain @click="create">{{`立即${add?"创建":"更新"}`}}</el-button>
  </el-form>
</template>
<script>
import { AddNCZXSS_BASE, GetLocations, EditNCZXSS_BASE } from "@/api";
import { mapGetters } from "vuex";
import { deepClone } from "@/utils";
export default {
  name: "formTitle",
  inject: ["KEYNO", "ADD", "TOPINDEX"],
  data() {
    return {
      comName:"elInput",
      area: "",
      form: {},
      formProps: [], // 表单内容
      rules: {}, // 表单验证规则
      selectorList: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level } = node;
          if (node.value === undefined) {
            node.value = { id: 0 };
          }
          let nodes = (await this.getArea(node.value.id)).map(item => ({
            value: { id: item.o_locationno, name: item.o_locationdesc },
            label: item.o_locationdesc,
            leaf: level > 2
          }));
          resolve(nodes);
        }
      }
    };
  },
  computed: {
    ...mapGetters(["projectNo"]),
    keyNo() {
      return this.KEYNO();
    },
    add() {
      return this.ADD();
    },
    topIndex() {
      return this.TOPINDEX();
    }
  },
  watch: {
    topIndex: {
      handler(newVal) {
        const all = require("../json/formProps.json");
        this.formProps = all[newVal];
        this.formProps.forEach(item => {
          item.type = item.type || 'elInput'
          this.rules[item.value] = { required: !item.notRequired };
        });
      },
      immediate: true
    }
  },
  mounted() {
    if (!this.add) {
      this.$nextTick(() => {
        const e = this.form;
        this.area = [
          { name: e.CountyDESC, id: e.County },
          { name: e.TownDESC, id: e.Town },
          { name: e.VillageDESC, id: e.Village },
          { name: e.VillageGroupDESC, id: e.VillageGroup }
        ];
        const cascader = this.$refs.cascader;
        cascader.panel.activePath = [];
        cascader.panel.loadCount = 0;
        cascader.panel.lazyLoad();
      });
    }
  },
  methods: {
    // 获取地区列表
    async getArea(Locationno = 0) {
      return await GetLocations({
        ProjectNo: this.projectNo,
        Locationno
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
        VillageGroupDESC: e[3].name
      };
      this.form = Object.assign(this.form, locations);
    },
    // 创建基本信息
    create() {
      let form = deepClone(this.form);
      this.$refs.form1.validate(async valid => {
        if (valid) {
          try {
            if (this.add) {
              let res = await AddNCZXSS_BASE({
                ProjectNo: this.projectNo,
                TypeName: "农专项设施基础信息",
                JsonStr: JSON.stringify(form)
              });
              let keyNo = res[0].Keyno;
              this.$emit("success", keyNo);
            } else {
              await EditNCZXSS_BASE({
                id: this.keyNo,
                JsonStr: JSON.stringify(form)
              });
              this.$emit("success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-title {
  flex-wrap: wrap;
  position: relative;
  margin: 0 40px 40px;
  .el-form-item {
    width: 33%;
    display: flex;
    justify-content: flex-end;
    .el-input,
    .el-cascader,
    .el-select {
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