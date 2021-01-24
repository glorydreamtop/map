<template>
  <el-select v-model="value1" :placeholder="placeholder" @change="handleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "selector",
  props: {
    value: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      value1: ""
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.value1 = newVal;
      },
      immediate: true
    }
  },
  methods: {
    handleChange() {
      const v = this.options.find(item => {
        return item.value === this.value1;
      });
      const label = v.label||v.value;
      this.$emit("input", label);
      this.$emit("change", label);
    }
  }
};
</script>