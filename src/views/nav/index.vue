<template>
  <div>
    <img class="title" src="@/assets/imgs/title.png" alt="">
    <div
      class="flex justify-end nav bg-primary border-bottom padding-right-l padding-tb-l"
    >
      <div class="text-l">
        <i class="el-icon-notebook-1 text-light"></i>
        <span>选择阶段</span>
      </div>
      <div class="text-l">
        <i class="al-icon-ziliaoguanli text-light"></i>
          <span>资料管理</span>
      </div>
      <el-dropdown placement="bottom" class="text-l text-white">
        <div>
          <i class="al-icon-tiaochashuju text-light"></i>
          <span>调查数据</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="al-icon-dingeshezhi"></i>
            <span>定额设置</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-gongshiguanli"></i>
            <span>公示管理</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-baogaoguanli"></i>
            <span>报告管理</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-jinduguanli"></i>
            <span>进度管理</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="bottom" class="text-l text-white">
        <div>
          <i class="al-icon-anzhiguihua text-light"></i>
          <span>安置规划</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="al-icon-fenxijisuan"></i>
            <span>分析计算</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-anzhiquguihua"></i>
            <span>安置区规划</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="bottom" class="text-l text-white">
        <div>
          <i class="al-icon-xiaoshengongzuo text-light"></i>
          <span>校审工作</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="al-icon-daibanshixiang"></i>
            <span>待办事项</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-faqishixiang"></i>
            <span>发起事项</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-canyushixiang"></i>
            <span>参与事项</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown placement="bottom" class="text-l text-white">
        <div>
          <i class="al-icon-xitongshezhi text-light"></i>
          <span>系统设置</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="al-icon-zuzhirenyuan"></i>
            <span>组织人员</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="al-icon-quanxianguanli"></i>
            <span>权限管理</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="admin text-l border-left padding-left-l">
        <i class="al-icon-user1"></i>
        <span>admin</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {},
  data() {
    return {
      activeIndex: 1,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSelect() {},
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 525px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.nav {
  height: 60px;
  >.text-l{
    margin-right:15px;
  }
}
[class*="icon"] {
  margin-right: 5px;
  color: $light;
}
.el-dropdown-menu {
  top: 50px !important;
  width: 130px;
  border: none;
  background: rgba(1, 28, 45, 0.9);

  ::v-deep .el-dropdown-menu__item {
    color: $white;
    [class*="icon"] {
      margin-right: 2px;
      color: $light;
    }
  }
  ::v-deep .popper__arrow {
    display: none;
  }
  ::v-deep .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: $sub;
  }
}
</style>
