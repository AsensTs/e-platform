<template>
  <el-container>
    <el-header>
      <div class="logotitle">
        <img class="logo-img" alt="Vue logo" src="../assets/images/logo.png" />
        <h3 class="title">电商后台管理系统</h3>
      </div>
      <el-button size="small" @click="logout" type="info" plain>退出</el-button>
    </el-header>
    <el-container class="co-container">
      <el-aside :width="isCollapseFlag ? '65px' : '200px'">
        <navMenu @isCollapse="isCollapse" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import navMenu from "./navMenu.vue";
export default Vue.extend({
  data() {
    return {
      isCollapseFlag: false
    };
  },
  components: {
    navMenu
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push({ name: "Login" });
    },
    isCollapse(data: any) {
      this.isCollapseFlag = data;
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
    .el-aside {
      background: #373a40;
    }
    .toggle-btn {
      background-color: #45484e;
      color: #fff;
      text-align: center;
      line-height: 3rem;
      cursor: pointer;
    }
    .el-main {
      background: #eee;
    }
  }
}
</style>
