<template>
  <div class="form-make">
    <div class="form-make-header">
      <div class="form-make-title">快速生成表单</div>
    </div>
    <div class="form-make-container"><router-view /></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
/*
第一步 npm init @vitejs/app 选择 vue， ts
第二步 安装 eslint prettierrc
第三步 安装 vuex 4.0.0 vue-router   yarn add vue-router@next vuex@next

*/
</script>

<style lang="scss">
.form-make-header {
  height: 50px;
  box-shadow: 0 10px 10px rgba(240, 242, 245, 0.8);
  padding: 0 10px;
  position: relative;
  background: #fff;
  .form-make-title {
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #333;
    font-size: 20px;
    font-weight: 500;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }
}
.form-make-container {
  height: calc(100vh - 50px);
}
</style>
