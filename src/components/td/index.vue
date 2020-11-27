<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps" @node-click="choose"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'Td',
  props: {},
  data() {
    return {
      treeData:[],
      defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  created() {},
  mounted() {},
  methods: {
    choose(){
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
