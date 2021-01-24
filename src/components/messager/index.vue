<template>
  <div class="testBox">
    <el-input v-model="test.eventName" placeholder="事件名" />
    <el-input type="textarea" v-model="test.params" placeholder="参数内容" />
    <el-button @click="submit">测试通信</el-button>
  </div>
</template>

<script>
export default {
  name: "Messager",
  props: {},
  data() {
    return {
      test: {
        eventName: "",
        params: ""
      }
    };
  },
  methods: {
    submit() {
      this.$sendMessage({
        params: JSON.parse(this.test.params),
        eventName: this.test.eventName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.testBox {
  position: absolute;
  bottom: 120px;
  padding: 20px;
  [class*="el-"] {
    margin-top: 20px;
  }
}
</style>
