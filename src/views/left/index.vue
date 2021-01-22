<template>
  <div class="wrapper bg-primary padding-top-l">
    <el-collapse v-model="activeName" class="bg-primary margin-lr-l" accordion>
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
    <div class="testBox">
      <el-input v-model="test.eventName" placeholder="事件名" />
      <el-input type="textarea" v-model="test.params" placeholder="参数内容" />
      <el-button @click="submit">测试通信</el-button>
    </div>
    <!-- <div v-if="dialogType == 'open_jbqkTbale1'||dialogType == 'open_jbqkTbale2'||dialogType == 'open_jbqkTbale3'||dialogType == 'open_jbqkTbale4'"> -->
  </div>
</template>

<script>
import jbqk from "@/components/leftjbqk";
import tdxx from "@/components/td";
import hxx from "@/components/hxx";
import zxss from "@/components/zxss";
import zxxm from "@/components/zxxm";
import gyqy from "@/components/gyqy";

export default {
  name: "Left",
  props: {},
  components: {
    jbqk,
    tdxx,
    hxx,
    zxss,
    zxxm,
    gyqy
  },
  data() {
    return {
      activeName:"",
      test:{
        eventName:'',
        params:""
      }
    };
  },

  created() {},
  mounted() {},
  methods: {
    submit() {
      console.log(this.test.params);
      console.log((typeof this.test.params));
      
      const test = {
         params: JSON.parse(this.test.params),
         eventName:this.test.eventName
      }
     
      this.$sendMessage(this.test)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 20vw;
}

.testBox{
  position: absolute;
  bottom: 120px;
  [class*="el-"]{
    margin-top: 20px;
  }
}

.el-collapse {
  border-top: none;
}
</style>
