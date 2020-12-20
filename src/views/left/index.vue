<template>
  <div class="wrapper bg-primary padding-top-l">
    <el-tabs v-model="activeTab" @tab-click="check">
      <el-tab-pane label="统计信息" name="first"></el-tab-pane>
      <el-tab-pane label="详细信息" name="second">
        <el-collapse
          v-model="activeName"
          class="bg-primary margin-lr-l"
          accordion
        >
          <el-collapse-item title="基本情况调查表" name="1">
            <jbqk />
          </el-collapse-item>
          <el-collapse-item title="土地调查表" name="2">
            <tdxx />
          </el-collapse-item>
          <el-collapse-item title="户信息调查表" name="3">
            <hxx />
          </el-collapse-item>
          <el-collapse-item title="农村专项设施调查表" name="4">
          <zxss />
          </el-collapse-item>
          <el-collapse-item title="专项项目调查表" name="5">
            <zxxm />
          </el-collapse-item>
          <el-collapse-item title="工业企业调查表" name="6">
            <gyqy />
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <!-- <div v-if="dialogType == 'open_jbqkTbale1'||dialogType == 'open_jbqkTbale2'||dialogType == 'open_jbqkTbale3'||dialogType == 'open_jbqkTbale4'"> -->
    </div>
  </div>
</template>

<script>
import jbqk from '@/components/leftjbqk'
import tdxx from '@/components/td'
import hxx from '@/components/hxx'
import zxss from '@/components/zxss'
import zxxm from '@/components/zxxm'
import gyqy from '@/components/gyqy'

export default {
  name: "Left",
  props: {},
  components: {
    jbqk,tdxx,hxx,zxss,zxxm,gyqy
  },
  data() {
    return {
      activeTab: "second",
      activeName: "",
      
    };
  },

  created() {},
  mounted() {},
  methods: {
    check() {},
    
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 25vw;
}

::v-deep .el-tabs__item {
  width: 50%;
}

::v-deep .el-tabs__nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.el-collapse {
  border-top: none;
}
</style>
