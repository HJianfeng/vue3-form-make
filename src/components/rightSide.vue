<template>
  <div class="form-right">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="字段属性" name="0"><widgetProps /></el-tab-pane>
      <el-tab-pane label="表单属性" name="1"><formProps /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import formProps from './props/formProps.vue';
import widgetProps from './props/widgetProps.vue';

export default {
  components: { widgetProps, formProps },
  setup() {
    const activeTab = ref('0');
    return {
      activeTab
    };
  }
};
</script>

<style lang="scss">
.form-right {
  padding: 0 5px;
  .el-tabs__item {
    height: 45px;
  }
}
</style>
