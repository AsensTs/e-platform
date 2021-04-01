<template>
  <el-form :ref="formOptions.ref" :model="formOptions.form" :label-width="formOptions.labelWidth">
    <el-form-item :label="this.options.labelName"></el-form-item>
  </el-form>
</template>

<script>
//  简单表单组件
export default {
  props: {
    options: {
      ref: String,
      model: String,
      labelWidth: String,
    },
    formItemList: {
      label: String
    }
  },
  data() {
    return {
      formOptions: this.options
        ? this.options 
        : { ref: "", model: "", labelWidth: "80px" }
    };
  }
};
</script>

<style scoped>
</style>