<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="16">栅格值（span）</el-col>
    </el-row>
    <draggable
      v-model="selectWidget.columns"
      item-key="value"
      v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
    >
      <template #item="{ element, index }">
        <el-row :gutter="5">
          <el-col :span="16">
            <el-input
              v-model="element.span"
              type="number"
              oninput="if(value>24)value=24;if(value<1)value=1;"
              placeholder="栅格值"
              size="mini"
              @blur="blurEvent(element)"
            />
          </el-col>
          <el-col :span="4">
            <i class="el-icon-rank drag-item" />
            <i class="el-icon-delete" @click="handleOptionsRemove(selectWidget.columns, index)" />
          </el-col>
        </el-row>
      </template>
    </draggable>
    <div>
      <el-button type="text" size="small" @click="addItem(selectWidget.columns)">
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
        span: '',
        list: []
      });
    };
    const blurEvent = element => {
      element.span = Math.floor(Number(element.span));
    };
    return {
      handleOptionsRemove,
      addItem,
      blurEvent
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
