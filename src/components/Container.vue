<template>
  <el-container>
    <el-header>
      <img class="logo-img" alt="Vue logo" src="../assets/images/logo.png" />
      <h3 class="title">电商后台管理系统</h3>
    </el-header>
    <el-container>
      <el-col class="col-aside" :xs="8" :sm="8" :md="6" :lg="4" :xl="3">
        <el-aside width="none">
          <navMenu />
        </el-aside>
      </el-col>
      <el-col :xs="16" :sm="16" :md="18" :lg="20" :xl="21">
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
  }
});
</script>

<style lang="scss">
.el-container {
  .el-header {
    display: flex;
    align-items: center;
    background-color: #2d2f34;
    .logo-img {
      height: 90%;
    }
    .title {
      color: #fff;
      font-size: 1.8rem;
      margin-left: 1.8rem;
    }
  }
  .col-aside {
    min-width: 20rem;
  }
}
</style>
