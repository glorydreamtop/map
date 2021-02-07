<template>
  <div class="wrapper bg-primary padding-top-l">
        <el-collapse v-model="activeName" class="bg-primary margin-lr-l"   accordion>
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
    <!-- <div v-if="dialogType == 'open_jbqkTbale1'||dialogType == 'open_jbqkTbale2'||dialogType == 'open_jbqkTbale3'||dialogType == 'open_jbqkTbale4'"> -->
    </div>
  </div>
</template>

<script>
import jbqk from '@/components/rightDrawer/jbqk'
import tdxx from '@/components/rightDrawer/tdxx'
import hxx from '@/components/rightDrawer/hxx'
import zxss from '@/components/rightDrawer/zxss'
import zxxm from '@/components/rightDrawer/zxxm'
import gyqy from '@/components/rightDrawer/gyqy'

export default {
  name: "Left",
  props: {},
  components: {
    jbqk,tdxx,hxx,zxss,zxxm,gyqy
  },
  data() {
    return {
      activeTab: "second",
      activeName: ['2','3'],
      
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
  right: 0;
  top: 60px;
  bottom: 0;
  width:15vw;
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
