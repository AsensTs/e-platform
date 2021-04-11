<template>
  <!-- 分隔符：1. separator="/"  2.通过设置 separator-class 可使用相应的 iconfont 作为分隔符，注意这将使 separator 设置失效 -->
  <el-breadcrumb
    separator="/"
    :separator-class="separatorClass"
    class="breadcrumb"
  >
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="item in breadcrumbItems"
      :key="item.index"
      :to="{ path: item.path }"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    breadcrumbItems: {
      name: String,
      path: String
    }
  },
  data() {
    return {
      separatorClass: "el-icon-arrow-right" // 分隔符，
    };
  }
};
</script>

<style scoped lang="scss">
.breadcrumb {
  height: $h3;
  line-height: $h3;
}
</style>
