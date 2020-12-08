<template>
  <div>
    <img class="title" src="@/assets/imgs/title.png" alt />
    <div class="flex justify-end align-center nav bg-primary border-bottom padding-right-l">
      <search />
      <div class="text-l">
        <i class="el-icon-notebook-1 text-light"></i>
        <span @click="show('stageSelector')">选择阶段</span>
      </div>
      <div class="text-l">
        <i class="al-icon-ziliaoguanli text-light"></i>
        <span @click="show('zlgl')">资料管理</span>
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
            <span @click="show('desz')">定额设置</span>
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
		  <el-dropdown-item>
		    <i class="el-icon-s-management"></i>
		    <span @click="show('dictionary')">字典设置</span>
		  </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="admin text-l border-left padding-left-l">
        <i class="al-icon-user1"></i>
        <span>admin</span>
      </div>
    </div>
	
    <component :is="currentCompoent" :showDialog.sync="showDialog"></component>
  </div>
</template>

<script>
import search from "@/components/search";
import stageSelector from "@/components/stageSelector";
import dictionary from "@/components/dictionaryPage/dictionary_table";
import zlgl from "@/components/zlgl";
import desz from "@/components/desz";
import evnetBus from "@/utils/eventBus";

export default {
  name: "Nav",
  props: {},
  data() {
    return {
      currentCompoent: "",
      showDialog: false
    };
  },
  components: {
    search,
    stageSelector,
    zlgl,
    desz,
	dictionary
  },
  watch:{
    showDialog:{
      handler(newVal){
        if(newVal)return
        this.currentCompoent = ''
      }
    }
  },
  mounted() {
    evnetBus.$on("selectStage", () => {
      this.currentCompoent = 'stageSelector'
      this.showDialog = true;
    });
  },
  methods: {
    handleSelect() {},
    show(name) {
      this.currentCompoent = name;
      this.showDialog = true;
    }
  }
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
  > .text-l {
    margin-right: 15px;
    cursor: pointer;
  }
}
[class*="icon"] {
  margin-right: 5px;
  color: $light;
}
.el-icon-arrow-down {
  margin-right: 0;
}
.el-dropdown > div {
  cursor: pointer;
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