<template>
  <router-view />
</template>


<script lang="ts" setup>
import "./style/reset.less";
</script>

<!-- <style lang="less" src="./style/reset.less"></style> -->
<!-- <style lang="less" src="./style/mobile.less"></style> -->

<style lang="less">
@import url(./style/mobile.less) (max-width: 480px);

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('~@assets/lottery-bg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
