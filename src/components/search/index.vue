<template>
  <div class="wrapper align-center margin-right-l bg-sub radius-l">
    <el-select v-model="type" placeholder="请选择">
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
    return {
      options:[{
        label:'基本情况',
        value:1
      },{
        label:'土地',
        value:2
      },{
        label:'户信息',
        value:3
      },{
        label:'农村专项设施',
        value:4
      },{
        label:'专项项目',
        value:5
      },{
        label:'工业企业',
        value:6
      }],
      type:1
    }
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
