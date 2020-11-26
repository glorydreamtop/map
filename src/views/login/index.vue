<template>
  <el-dialog :visible.sync="show" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="20%" center>
    <template slot="title">
      <span class="text-light text-l">登录到系统</span>
    </template>
    <div
      class="box flex-col align-center justify-between margin-bottom"
      @click.stop=""
    >
      <el-input
        v-model="loginForm.user"
        class="margin-bottom-l"
        prefix-icon="al-icon-user"
        placeholder="请输入用户名"
      ></el-input>
      <el-input
        v-model="loginForm.pwd"
        prefix-icon="al-icon-lock"
        placeholder="请输入密码"
      ></el-input>
      <el-button class="margin-top-l text-light" :loading="loading" size="mini" @click="login"
        >登录</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Index",
  props: {},
  data() {
    return {
      show: true,
      loading:false,
      loginForm: {
        user: "",
        pwd: "",
      },
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  watch: {
    token: {
      handler(newVal) {
        this.show = !Boolean(newVal)
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    hide(e) {
      e.stopPropagation();
      this.show = !this.show;
    },
    async login() {
      this.loading = true;
      await this.$store.dispatch("user/login", this.loginForm);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  background-image: url("../../assets/imgs/subBg.png");
  background-size: 100% 100%;
  border-radius: 20px;
}
.box {
  width: 100%;
  height: 100%;
  .el-input {
    width: 60%;
  }
}
</style>
