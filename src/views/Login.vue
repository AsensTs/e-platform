<template>
  <div class="login">
    <div class="login-box">
      <img class="login-logo" src="../assets/images/logo.png" />
      <el-form
        class="login-form"
        :model="loginForm"
        label-width="60px"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="账号" class="login-item" prop="username">
          <el-input
            class="login-input"
            type="text"
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" class="login-item" prop="password">
          <el-input
            class="login-input"
            type="password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-key"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-item">
          <el-button class="login-signIn" @click="login('loginForm')"
            >登录</el-button
          >
          <el-button class="login-signUp">注册</el-button>
          <el-button class="login-reset" @click="resetForm('loginForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../plugins/element";

export default Vue.extend({
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm(formName: string): void {
      const refs: any = this.$refs[formName];
      refs.resetFields();
    },
    login(formName: string): void {
      const refs: any = this.$refs[formName];
      console.log(refs, 1);
      /* 
        validate()  这是element的一个验证方法，对整个表单进行校验的方法，参数为一个回调函数。
        该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
        若不传入回调函数，则会返回一个 promise
      */
      refs.validate(async (valid: any) => {
        if (!valid) return;
        const { data } = await this.$http.post("login", this.loginForm);
        if (data.meta.status !== 200)
          return this.$message.error("登陆失败! 密码或账户名不正确");
        this.$message.success("登陆成功");
        // 登陆成功后操作
        /*
        1. 将登陆成功后的 token, 保存到客户端的 sessionStorage 中
          1.1 项目中除了登陆之外的其他API接口， 必须在登陆之后才能访问
          1.2 token 只应在当前网站打开期间有效， 所以将token保存在sessionStorage中、
        
        2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push({path: 'home';}});
        */
        window.sessionStorage.setItem("stoken", data.data.token);
        this.$router.push({ name: "Home" });
      });
    }
  }
});
</script>

<style lang="scss">
.login {
  background-color: #0f3057;
  position: absolute;
  width: 100%;
  height: 100%;
  .login-box {
    background-color: #fff;
    width: 500px;
    height: 0;
    padding-bottom: 320px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-logo {
      height: 50%;
      border: 1px solid #eee;
      border-radius: 50%;
      text-align: center;
      position: fixed;
      transform: translate(-50%, -50%);
      background-color: #fff;
      box-shadow: 0px 0px 10px #eee;
    }
    .login-form {
      margin-top: 20%;
      .login-item {
        width: 85%;
        margin: 0 auto 25px auto;
        .el-form-item__label {
          line-height: 50px;
        }
        .login-input {
          .el-input__inner {
            height: 3rem;
            line-height: 3rem;
          }
        }
      }
      .login-item:nth-child(3) {
        .el-form-item__content {
          margin: 0 !important;
        }
      }
    }
  }
}
</style>
