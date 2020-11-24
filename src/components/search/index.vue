<template>
  <div class="wrapper align-center margin-right-l bg-sub radius-l">
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <input type="text">
    <i class="text-l al-icon-sousuo margin-right-m"></i>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.wrapper{
  input{
    background-color: $sub;
    height: 30px;
    border-radius: 20px;
    border-style: none;
    margin: 0 10px;
    color: $white;
    font-size: 18px;
  }
  
}
</style>
