<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="10">标题</el-col>
      <el-col :span="10">值</el-col>
    </el-row>
    <draggable
      v-model="selectWidget.options[prop.key]"
      item-key="value"
      v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
    >
      <template #item="{ element, index }">
        <el-row :gutter="5">
          <el-col :span="10">
            <el-input v-model="element.label" size="mini" />
          </el-col>
          <el-col :span="10">
            <el-input v-model="element.value" size="mini" />
          </el-col>
          <el-col :span="4">
            <i class="el-icon-rank drag-item" />
            <i
              class="el-icon-delete"
              @click="handleOptionsRemove(selectWidget.options[prop.key], index)"
            />
          </el-col>
        </el-row>
      </template>
    </draggable>
    <div>
      <el-button type="text" size="small" @click="addItem(selectWidget.options[prop.key])">
        <span style="font-size: 14px">添加</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import draggable from '~/node_modules/vuedraggable/src/vuedraggable';
export default {
  components: { draggable },
  props: {
    selectWidget: { type: Object },
    prop: { type: Object }
  },
  setup() {
    const handleOptionsRemove = (arr, index) => {
      arr.splice(index, 1);
    };
    const addItem = arr => {
      arr.push({
        value: `Option ${arr.length + 1}`,
        label: `Option ${arr.length + 1}`
      });
    };

    return {
      handleOptionsRemove,
      addItem
    };
  }
};
</script>

<style lang="scss" scoped>
.drag-item {
  cursor: move;
  font-size: 16px;
}
.el-icon-delete {
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
}
</style>
