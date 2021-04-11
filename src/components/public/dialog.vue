<template>
  <el-dialog
    :title="dialogOptions.title"
    :visible.sync="dialogOptions.visibleSync"
    :width="dialogOptions.width"
    @close="dialogCloseEvent"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    options: {
      title: String,
      visibleSync: Boolean,
      width: String
    }
  },
  data() {
    return {
      dialogOptions: this.options
        ? this.options
        : { title: "", visibleSync: false, width: "50%" },
    };
  },
  methods: {
    // Dialog 关闭的回调
    dialogCloseEvent() {
      if (this.dialogOptions.ref) {
        this.$emit("dialogClosed", this.dialogOptions.ref);
      }
    }
  }
};
</script>

<style scoped></style>
