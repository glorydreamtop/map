<template>
  <el-form ref="form1" class="form-title flex" :rules="rules" :model="form">
    <el-form-item label="选择地区">
      <el-cascader
        placeholder="选择地区"
        :options="options"
        :show-all-levels="false"
        @change="selectArea"
        ref="cascader"
        :value="area"
      ></el-cascader>
    </el-form-item>
    <el-form-item
      v-for="item in formProps"
      :key="item.value"
      :label="item.title"
      :prop="item.value"
    >
      <component
        :is="item.type"
        v-model="form[item.value]"
        placeholder="必填"
        v-bind="item.props"
      >
        <template v-if="item.unit" slot="append">{{ item.unit }}</template>
      </component>
    </el-form-item>
    <el-button class="btn1" size="mini" type="primary" plain @click="create">{{
      `立即${add ? "创建" : "更新"}`
    }}</el-button>
  </el-form>
</template>
<script>
import { AddNCZXSS_BASE, EditNCZXSS_BASE, GetEntitiesTree } from "@/api";
import { mapGetters } from "vuex";
import { deepClone } from "@/utils";
import selector from "@/components/rewrite-eleUI/selector";
export default {
  name: "formTitle",
  inject: ["KEYNO", "ADD", "TOPINDEX"],
  props: {
    currentType: String,
  },
  data() {
    return {
      comName: "elInput",
      area: "",
      form: {},
      formProps: [], // 表单内容
      rules: {}, // 表单验证规则
      options: [],
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
    },
  },
  watch: {
    topIndex: {
      async handler(newVal) {
        const { all } = await import("../json/formProps.js");
        this.formProps = all[newVal];
        this.formProps.forEach((item) => {
          item.task && item.task();
          item.type = item.type || "elInput";
          this.rules[item.value] = {
            required: item.required,
            message: `请填写${item.title}`,
          };
        });
      },
      immediate: true,
    },
  },
  components: { selector },
  mounted() {
    this.getArea();
    if (!this.add) {
      this.$nextTick(() => {
        const e = this.form;
        const cascader = this.$refs.cascader;
        cascader.presentText = e.VillageGroupDESC;
        this.area = e.VillageGroup;
        this.$store.commit("zxss/SET_TOWN", e.Town);
      });
    }
  },
  methods: {
    // 获取地区列表
    async getArea() {
      const res = await GetEntitiesTree({
        ProjectNo: this.projectNo,
      });
      const flat = (node) => {
        return node.map((item) => {
          return {
            label: item.desc,
            value: {
              id: item.no,
              name: item.desc,
            },
            children: item.children !== null ? flat(item.children) : null,
          };
        });
      };
      this.options = flat(res);
    },
    selectArea(e) {
      const len = e.length;
      const locations = {
        County: e[len-3].id,
        CountyDESC: e[len-3].name,
        Town: e[len-2].id,
        TownDESC: e[len-2].name,
        Village: e[len-1].id,
        VillageDESC: e[len-1].name,
        VillageGroup: e[len] ? e[len].id : undefined,
        VillageGroupDESC: e[len] ? e[len].name : undefined,
      };
      this.form = Object.assign(this.form, locations);
      console.log(e[1]);
      this.$store.commit("zxss/SET_TOWN", e[len-2].id);
    },
    // 创建基本信息
    create() {
      let form = deepClone(this.form);
      for (let key in form) {
        // 非数字、字符串类型转换
        if (form[key] instanceof Date) {
          form[key] = new Date(form[key]).toLocaleDateString();
        }
      }
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          try {
            if (this.add) {
              let res = await AddNCZXSS_BASE({
                ProjectNo: this.projectNo,
                TypeName: this.currentType,
                JsonStr: JSON.stringify(form),
              });
              let keyNo = res[0].Keyno;
              this.$emit("success", keyNo);
            } else {
              await EditNCZXSS_BASE({
                id: this.keyNo,
                JsonStr: JSON.stringify(form),
              });
              this.$emit("success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
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