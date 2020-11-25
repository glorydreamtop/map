<template>
  <el-dialog :visible.sync="show" width="20%" :show-close="false" center>
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
      <el-button class="margin-top-l text-light" size="mini" @click="login"
        >登录</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { login } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "Index",
  props: {},
  data() {
    return {
      show: true,
      loginForm: {
        user: "",
        pwd: "",
      },
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  created() {},
  mounted() {},
  methods: {
    hide(e) {
      e.stopPropagation();
      this.show = !this.show;
    },
    login() {
      const { user, pwd } = this.loginForm;
      login(user, pwd);
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
