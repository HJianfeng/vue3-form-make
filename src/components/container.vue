<template>
  <el-header class="btn-bar" style="height: 45px">
    <el-button type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
    <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
    <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode"
      >生成代码</el-button
    >
  </el-header>
  <div style="height: 100%">
    <widgetContaner />
    <el-dialog v-model="dialogVisible" width="60%">
      <div v-if="dialogVisible" id="vuecodeeditor" style="height: 500px; width: 100%">
        {{ vueTemplate }}
      </div>
    </el-dialog>
    <previewContainer ref="previewContainerRef" />
  </div>
</template>

<script lang="ts">
import { ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import widgetContaner from '@/components/widget/widgetContaner.vue';
import { generateCode } from '../utils/index';
import previewContainer from './preview/index.vue';
export default {
  components: { widgetContaner, previewContainer },
  setup() {
    const previewContainerRef = ref();
    const dialogVisible = ref(false);
    const vueTemplate = ref('');
    const store = useStore();
    const handleClear = () => {
      store.commit('setWidgetList', []);
      store.commit('setSelectWidget', null);
    };
    const handlePreview = () => {
      previewContainerRef.value.openDialog();
    };
    const handleGenerateCode = () => {
      dialogVisible.value = true;
      const widgetData = store.state.widgetData;
      vueTemplate.value = generateCode(JSON.stringify(widgetData));
      nextTick(() => {
        const vueeditor = (window as any).ace.edit('vuecodeeditor');
        vueeditor.session.setMode('ace/mode/html');
      });
    };
    return {
      handleClear,
      handlePreview,
      handleGenerateCode,
      dialogVisible,
      previewContainerRef,
      vueTemplate
    };
  }
};
</script>

<style lang="scss" scoped>
.btn-bar {
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  border-bottom: 1px solid #e4e7ed;
  text-align: right;
}
</style>
