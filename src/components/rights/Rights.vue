<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="navigation">
      <breadcrumb :breadcrumbItems="breadcrumbItems"></breadcrumb>
    </div>

    <!-- 卡片视图 -->
    <cardTable
      :cardTableOptions="cardTableOptions"
      v-if="this.cardTableOptions.dataList"
    ></cardTable>
  </div>
</template>

<script>
import breadcrumb from "../public/breadcrumb";
import cardTable from "../public/cardTable";
export default {
  data() {
    return {
      // 面包屑数据
      breadcrumbItems: [
        { name: "权限管理", path: "/" },
        { name: "权限列表", path: "/rights" }
      ],
      // 卡片数据
      cardTableOptions: {
        labelList: [         // labelList存放label显示的标题和prop对应列内容的字段名
          { label: "权限名称", prop: "authName" },
          { label: "路径", prop: "path" },
          { label: "权限等级", prop: "level" }
        ],
        dataList: "",
        tableWidth: '100', // 百分比
        width: '180',      // 像素
        border: true       // 边框
         
      }
    };
  },
  mounted() {
    this.getRightsDataList();
  },
  methods: {
    // 请求拿到rigths的数据列表
    async getRightsDataList() {
      const { data: res } = await this.$http.get("rights/" + "list");
      if (res.meta.status === 200) {
        this.cardTableOptions.dataList = res.data;
      }
    }
  },
  components: {
    breadcrumb,
    cardTable
  }
};
</script>

<style lang="less" scoped></style>
