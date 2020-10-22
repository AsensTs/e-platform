<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        background-color="#373a40"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group title="用户列表">
            <el-menu-item index="1-1">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-2">
            <template slot="title">选项4</template>
            <el-menu-item index="1-2-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group title="权限">
            <el-menu-item index="2-1">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-2">
            <template slot="title">选项4</template>
            <el-menu-item index="2-2-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group title="商品列表">
            <el-menu-item index="3-1">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-2">
            <template slot="title">选项4</template>
            <el-menu-item index="3-2-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group title="订单列表">
            <el-menu-item index="4-1">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="4-2">
            <template slot="title">选项4</template>
            <el-menu-item index="4-2-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item-group title="数据">
            <el-menu-item index="5-1">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="5-2">
            <template slot="title">选项4</template>
            <el-menu-item index="5-2-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="6">
          <i class="el-icon-s-tools"></i>
          <span slot="title">用户设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
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
