<template>
  <el-select
    v-model="value1"
    :placeholder="placeholder"
    ref="select"
    @change="handleChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
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
      },
    },
    text:String,
    placeholder: {
      type: String,
      default: "请选择",
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      value1: "",
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.value1 = newVal;
      },
      immediate: true,
    },
    text:{
      handler(newVal){
        if(!newVal)return
        this.$nextTick(()=>{
          this.$refs.select.selectedLabel = newVal;
        })
      },
      immediate:true
    }
  },
  methods: {
    handleChange() {
      this.$emit("input", this.value1);
      this.$emit("change", this.value1);
    },
  },
};
</script>