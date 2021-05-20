<template>
  <el-row
    v-if="elementParent && elementParent.key"
    :key="elementParent.key"
    class="widget-col widget-view"
    :class="{ active: selectWidget.key == elementParent.key }"
    :gutter="elementParent.options.gutter ? elementParent.options.gutter : 0"
    :justify="elementParent.options.justify"
    :align="elementParent.options.align"
    @click="handleSelectWidget(elementParent)"
  >
    <el-col
      v-for="(col, colIndex) in elementParent.columns"
      :key="colIndex"
      :span="col.span ? col.span : 0"
    >
      <draggable
        v-model="col.list"
        :component-data="{ class: 'widget-col-list' }"
        item-key="name"
        v-bind="{
          group: 'people',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-widget'
        }"
        @add="handleWidgetColAdd($event, elementParent, colIndex)"
      >
        <template #item="{ element, index }">
          <div>
            <WidgetFormItem
              :key="element.key"
              v-model:select="selectWidget"
              :element="element"
              :element-parent="col"
              :index="index"
            />
          </div>
        </template>
      </draggable>
    </el-col>
    <div v-if="selectWidget.key == elementParent.key" class="widget-view-action widget-col-action">
      <i class="el-icon-delete" @click.stop="handleWidgetDelete(pindex)" />
    </div>
    <div v-if="selectWidget.key == elementParent.key" class="widget-view-drag widget-col-drag">
      <i class="el-icon-rank drag-widget" />
    </div>
  </el-row>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import _ from 'lodash';
import WidgetFormItem from './widgetFormItem.vue';
import draggable from 'vuedraggable'; //由于vuedraggable的bug导致只能这样导入
// import draggable from '~/node_modules/vuedraggable/src/vuedraggable'; //由于vuedraggable的bug导致只能这样导入

export default {
  components: { draggable, WidgetFormItem },
  props: {
    elementParent: { type: Object },
    pindex: { type: Number }
  },
  setup() {
    const store = useStore();
    const selectWidget = computed(() => {
      return store.state.selectWidget;
    });
    // 选择组件
    const handleSelectWidget = (item: any) => {
      store.commit('setSelectWidget', item);
    };
    // 添加组件事件
    const handleWidgetColAdd = (evt: any, row: any, colIndex: any) => {
      const newIndex = evt.newIndex;
      if (!newIndex && newIndex !== 0) return;
      const widgetItem = extendsProps(row.columns[colIndex].list[newIndex]);

      row.columns[colIndex].list[newIndex] = widgetItem;
      store.commit('setSelectWidget', row.columns[colIndex].list[newIndex]);
    };
    // 附加属性
    const extendsProps = (item: any) => {
      //为拖拽到容器的元素添加唯一 key
      const key = new Date().valueOf() + '_' + Math.ceil(Math.random() * 99999);
      const cloneItem = _.cloneDeep(item);
      // 给新添加进来的组件，添加新的属性，但是为了不影响原数据，所以深拷贝
      cloneItem.key = key;
      cloneItem.options.remoteFunc = 'func_' + key;
      cloneItem.model = cloneItem.type + '_' + key;
      cloneItem.rules = [];
      return cloneItem;
    };

    const handleWidgetDelete = (index: number) => {
      store.dispatch('deleteWidgetList', index);
    };
    return {
      // data
      selectWidget,
      // methods
      handleWidgetColAdd,
      handleSelectWidget,
      handleWidgetDelete
    };
  }
};
</script>

<style lang="scss"></style>
