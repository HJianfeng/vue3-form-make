<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item :label="'标签对齐方式'">
        <el-radio-group v-model="widgetDataConfig.labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="'表单标签宽度'">
        <el-input-number
          v-model="widgetDataConfig.labelWidth"
          size="small"
          :min="0"
          :max="200"
          :step="10"
        />
      </el-form-item>

      <el-form-item :label="'组件尺寸'">
        <el-radio-group v-model="widgetDataConfig.size" size="small">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const widgetDataConfig = computed(() => {
      return store.state.widgetData.config;
    });
    return {
      widgetDataConfig
    };
  }
};
</script>

<style lang="scss" scoped></style>
