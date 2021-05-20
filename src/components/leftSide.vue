<template>
  <div class="components-list">
    <div class="widget-item">
      <div class="widget-cate">基础字段</div>
      <draggable
        tag="ul"
        :list="basicComponents"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false"
        ghost-class="ghost"
        :move="handleMove"
        item-key="name"
      >
        <template #item="{ element }">
          <li class="form-edit-widget-label">{{ element.name }}</li>
        </template>
      </draggable>
    </div>
    <div class="widget-item">
      <div class="widget-cate">高级字段</div>
      <draggable
        tag="ul"
        :list="advanceComponents"
        :group="{ name: 'people', pull: 'clone', put: true }"
        :sort="false"
        ghost-class="ghost"
        :move="handleMove"
        item-key="name"
      >
        <template #item="{ element }">
          <li class="form-edit-widget-label">{{ element.name }}</li>
        </template>
      </draggable>
    </div>
    <div class="widget-item">
      <div class="widget-cate">布局字段</div>
      <draggable
        tag="ul"
        :list="layoutComponents"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :sort="false"
        ghost-class="ghost"
        :move="handleMove"
        item-key="name"
      >
        <template #item="{ element }">
          <li class="form-edit-widget-label data-grid">{{ element.name }}</li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig';
import draggable from 'vuedraggable';
// import draggable from '~/node_modules/vuedraggable/src/vuedraggable';

export default {
  components: { draggable },
  setup() {
    const store = useStore();
    const handleMove = () => {
      return true;
    };
    const handleChange = (e: any) => {
      console.log(e);
    };
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      widgetDataList: store.state.widgetData,
      handleMove,
      handleChange
    };
  }
};
</script>

<style lang="scss" scoped>
.components-list {
  padding: 8px 0;
  width: 100%;
  height: 100%;

  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
  }

  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
  }

  .form-edit-widget-label {
    font-size: 12px;
    display: block;
    padding: 0 3px;
    width: 48%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;

    cursor: move;
    background: #f4f6fc;
    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }
  }
}
</style>
