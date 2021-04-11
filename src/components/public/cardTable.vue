<template>
  <el-card>
    <el-table
      :data="dataList"
      :style="{ width: tableWidth + '%' }"
      :border="border"
      :row-class-name="this.cardTableOptions.tbrclass ? tableRowClassName : ''"
    >
      <el-table-column type="index" label="#" width="50px"></el-table-column>
      <el-table-column
        v-for="(item, i) in labelList"
        :key="i"
        :prop="item.prop"
        :label="item.label"
        :width="width"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    cardTableOptions: {
      labelList: {
        type: Array,
        default: []
      },
      dataList: {
        type: Array,
        default: []
      },
      tableWidth: String, // 百分比
      width: String, // 像素
      border: Boolean, // 边框
      tbrclass: {
        // 是否开启带状态表格(row-class-name), 默认关闭
        type: Boolean,
        default: false
      }
    }
  },
  data() {
    return {
      labelList: this.cardTableOptions.labelList,
      dataList: this.cardTableOptions.dataList,
      tableWidth: this.cardTableOptions.tableWidth,
      columnWidth: this.cardTableOptions.columnWidth,
      border: this.cardTableOptions.border
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // tbrclass为true时执行该函数

      if (this.tbrclass) {
        /*
         * 用$emit向父组件触发一个 tableRowClassName 事件
         * 1. this.$emit()
         * 2. this.$parent.event
         */
        // this.$emit("tableRowClassName", {row, rowIndex})

        this.$parent.tableRowClassName({ row, rowIndex });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
