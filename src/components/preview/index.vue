<template>
  <el-dialog v-model="dialogVisible" width="60%">
    <GenerateForm v-if="dialogVisible" ref="generateForm" />
    <template #footer>
      <el-button type="primary" @click="handleTest">获取数据</el-button>
      <el-button @click="handleReset">重置</el-button>
    </template>
  </el-dialog>
  <el-dialog v-model="dataDialog" width="60%">
    <div v-if="dataDialog" id="datacodeeditor" style="height: 200px; width: 100%">
      {{ dataStr }}
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { ref, nextTick } from 'vue';
import GenerateForm from './GenerateForm.vue';

export default {
  components: { GenerateForm },
  setup() {
    const dialogVisible = ref(false);
    const dataDialog = ref(false);
    const generateForm = ref();
    const dataStr = ref('');
    const openDialog = () => {
      dialogVisible.value = true;
    };
    const handleTest = () => {
      const data = generateForm.value.getData();
      dataStr.value = data;
      dataDialog.value = true;
      nextTick(() => {
        const vueeditor = (window as any).ace.edit('datacodeeditor');
        vueeditor.session.setMode('ace/mode/json');
      });
    };
    const handleReset = () => {
      generateForm.value.reset();
    };
    return {
      // data
      dialogVisible,
      dataDialog,
      dataStr,
      // ref
      generateForm,
      // methods
      openDialog,
      handleTest,
      handleReset
    };
  }
};
</script>

<style lang="scss"></style>
