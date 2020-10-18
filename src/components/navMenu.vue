<template>
  <div>
    <el-menu :default-active="this.$route.name" mode="horizontal">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">我的</template>
        <el-menu-item index="3-1">简介</el-menu-item>
        <el-menu-item index="3-2" @click="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      activeIndex: 1
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push({ path: "/login" });
    }
  }
});
</script>

<style lang="scss"></style>
