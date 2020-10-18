<template>
  <div class="home">
    <navMenu />
    <img alt="Vue logo" src="../assets/images/logo.png" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import navMenu from "../components/navMenu.vue";
export default Vue.extend({
  data() {
    return {
      activeIndex: 1
    };
  },
  components: {
    navMenu
  }
});
</script>
