<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        background-color="#373a40"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="(item, index) in menusList"
          :key="item.id"
          :index="index"
        >
          <template slot="title">
            <i :class="icons[index]"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            v-for="(child, index2) in item.children"
            :key="child.id"
            :index="index + '-' + index2"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ child.authName }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      menusList: [],
      icons: [
        "el-icon-user-solid",
        "el-icon-s-opportunity",
        "el-icon-s-goods",
        "el-icon-s-claim",
        "el-icon-s-data"
      ]
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      this.menusList = res.data;
    }
  }
});
</script>

<style lang="scss">
.el-menu {
  border: none !important;
  overflow: hidden;
}
</style>
