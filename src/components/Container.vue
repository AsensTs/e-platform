<template>
  <el-container>
    <el-header>
      <div class="logotitle">
        <img class="logo-img" alt="Vue logo" src="../assets/images/logo.png" />
        <h3 class="title">电商后台管理系统</h3>
      </div>
      <el-button size="small" @click="logout">退出</el-button>
    </el-header>
    <el-container class="co-container">
      <el-col class="col-aside" :xs="8" :sm="8" :md="6" :lg="3" :xl="3">
        <el-aside width="none">
          <navMenu />
        </el-aside>
      </el-col>
      <el-col :xs="16" :sm="16" :md="18" :lg="21" :xl="21">
        <el-main>Main</el-main>
      </el-col>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import navMenu from "./navMenu.vue";
export default Vue.extend({
  components: {
    navMenu
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push({ name: "Login" });
    }
  }
});
</script>

<style lang="scss">
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2d2f34;
    .logotitle {
      height: 90%;
      display: flex;
      align-items: center;
      .logo-img {
        height: 100%;
      }
      .title {
        color: #fff;
        font-size: 1.8rem;
        margin-left: 1.8rem;
      }
    }
  }
  .co-container {
    height: 100%;
    .col-aside {
      height: 100%;
      background-color: #373a40;
    }
  }
}
</style>
