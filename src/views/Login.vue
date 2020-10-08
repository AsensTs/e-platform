<template>
  <div class="login-mod">
    <div class="login-box">
      <img class="login-logo" src="../assets/images/logo.png" />
      <div class="login-content">
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss">
.login-mod {
  background-color: #0f3057;
  position: absolute;
  width: 100%;
  height: 100%;
  .login-box {
    background-color: #fff;
    width: 30%;
    height: 40%;
    min-width: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-logo {
      height: 60%;
      border: 1px solid #eee;
      border-radius: 50%;
      text-align: center;
      position: fixed;
      transform: translate(-50%, -50%);
      background-color: #fff;
      box-shadow: 0px 0px 10px #eee;
    }
  }
}
</style>
