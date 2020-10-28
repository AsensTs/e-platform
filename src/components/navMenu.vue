<template>
  <div>
    <div class="toggle-btn" @click="elisCollapse">|||</div>
    <el-menu
      background-color="#373a40"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <el-submenu
        v-for="item in menusList"
        :key="item.id"
        :index="item.id + ''"
      >
        <template slot="title">
          <i :class="menuIcons[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="'/' + item.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ child.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      menusList: [],
      menuIcons: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-opportunity",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-claim",
        "145": "el-icon-s-data"
      },
      isCollapse: false
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
    },
    elisCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("isCollapse", this.isCollapse);
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
